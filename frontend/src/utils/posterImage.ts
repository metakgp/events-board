const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export function posterImage(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return `${BACKEND_URL}${pathOrUrl}`;
}
