import type { ReactNode } from "react";

export default class Parser {
  private index: number = 0;
  constructor(private source: string) {}

  render(): ReactNode {
    const paragraphs: ReactNode[] = [];

    while (!this.eof()) {
      const paragraph = this.parseParagraph();
      if (paragraph) {
        paragraphs.push(paragraph);
      }
    }

    return (
      <div>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  /**
   * Parses a paragraph of text, handling bold and italic formatting, and links.
   * @param mode 0, 1, 2: 0 for normal text, 1 for bold, 2 for italic
   */
  private parseParagraph(mode: number = 0): ReactNode {
    const elements: ReactNode[] = [];
    let currentText = "";

    while (!this.eof()) {
      if (this.eatIf(/^\n/)) {
        if (this.eatIf(/^\n+/)) {
          // new paragraph
          if (currentText) {
            elements.push(currentText);
            currentText = "";
          }
          return elements.length ? elements : null;
        }
        if (currentText) {
          elements.push(currentText);
          currentText = "";
        }
        elements.push(<br key={elements.length} />);
        continue;
      }

      if (
        mode != 1 &&
        this.peekIf(/^\*[^\s]/) &&
        !this.alnum(this.charAt(this.index - 1) || "")
      ) {
        this.eatIf(/^\*/);
        if (currentText) {
          elements.push(currentText);
          currentText = "";
        }
        // eat until next asterisk or end of line. if no asterisk found, treat as normal text
        const boldText = this.parseUntilChar("*");
        if (boldText) {
          elements.push(
            <strong key={elements.length}>
              {new Parser(boldText).parseParagraph(1)}
            </strong>,
          );
        } else {
          currentText += "*";
        }
      } else if (
        mode != 2 &&
        this.peekIf(/^_[^\s]/) &&
        !this.alnum(this.charAt(this.index - 1) || "")
      ) {
        this.eatIf(/^_/);
        if (currentText) {
          elements.push(currentText);
          currentText = "";
        }
        // eat until next underscore or end of line. if no underscore found, treat as normal text
        const italicText = this.parseUntilChar("_");
        if (italicText) {
          elements.push(
            <em key={elements.length}>
              {new Parser(italicText).parseParagraph(2)}
            </em>,
          );
        } else {
          currentText += "_";
        }
      } else if (
        this.peekIf(/^(?:https?:\/\/)([\w.-]+\.[a-z]{2,}(?:\/[\w.-]*)*)/i)
      ) {
        if (currentText) {
          elements.push(currentText);
          currentText = "";
        }
        // eat until space or end of line
        const url = this.eatIf(
          /^(?:https?:\/\/)([\w.-]+\.[a-z]{2,}(?:\/[\w.-]*)*)/i,
        );
        if (url) {
          elements.push(
            <a key={elements.length} href={url} target="_blank">
              {url}
            </a>,
          );
        }
      } else {
        const char = this.eatChar();
        if (char === null) break; // End of input
        currentText += char;
      }
    }

    if (currentText) {
      elements.push(currentText);
    }

    return elements.length ? elements : null;
  }

  private eof(): boolean {
    return this.index >= this.source.length;
  }

  private eatChar(): string | null {
    if (this.eof()) return null;
    return this.source[this.index++];
  }

  private eatIf(regex: RegExp): string | null {
    if (this.eof()) return null;
    const match = this.source.slice(this.index).match(regex);
    if (match) {
      this.index += match[0].length;
      return match[0];
    }
    return null;
  }

  private peekIf(regex: RegExp): string | null {
    if (this.eof()) return null;
    const match = this.source.slice(this.index).match(regex);
    if (match) {
      return match[0];
    }
    return null;
  }

  private alnum(char: string) {
    return /^[a-zA-Z0-9]$/.test(char);
  }

  private charAt(index: number) {
    if (index < 0 || index >= this.source.length) return null;
    return this.source[index];
  }

  private parseUntilChar(char: string): string | null {
    const index = this.index;
    let text = this.eatChar();
    while (!this.eof()) {
      const nextChar = this.eatChar();

      if (nextChar === "\n" || nextChar === null) {
        // backtrack
        this.index = index;
        return null;
      }
      if (
        nextChar === char &&
        (this.peekIf(/^[^A-Za-z0-9]/) || this.eof()) &&
        !this.charAt(this.index - 2)?.match(/\s/)
      ) {
        return text;
      }
      text += nextChar;
    }
    // backtrack
    this.index = index;
    return null;
  }
}

/**
 * Renders a markdown string into React nodes.
 *
 * This function supports:
 * - Paragraphs separated by double newlines
 * - Bold text using `*text*`
 * - Italic text using `_text_`
 * - Links using `http://example.com` or `https://example.com`
 *
 * The react node returned will only contain the following elements:
 * `p`, `strong`, `em`, `a`, and `br`.
 *
 * @param source The markdown string to render.
 * @return A React node containing the rendered content.
 */
export function renderMarkdown(source: string) {
  const parser = new Parser(source);
  return parser.render();
}
