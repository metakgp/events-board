package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/chromedp/chromedp"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Error: Please provide an Instagram URL as an argument")
	}
	igURL := os.Args[1]

	fmt.Println("Spinning up headless Chrome for URL:", igURL)

	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	var imageURL string
	var captionText string
	var buf []byte

	// XPath just to look for the word 'Venue:'
	captionXPath := `//span[contains(., 'Venue:')]`

	err := chromedp.Run(ctx,
		chromedp.Navigate(igURL),

		chromedp.WaitVisible(`svg[aria-label="Close"]`, chromedp.ByQuery),
		chromedp.ActionFunc(func(ctx context.Context) error {
			fmt.Println("Found the Close button. Clicking it now")
			return nil
		}),
		chromedp.Click(`svg[aria-label="Close"]`, chromedp.ByQuery),

		chromedp.Sleep(2 * time.Second), // give it an extra second to settle

		// take a screenshot 
		chromedp.ActionFunc(func(ctx context.Context) error {
			fmt.Println("Taking a screenshot of the browser's current view...")
			return nil
		}),
		chromedp.CaptureScreenshot(&buf),
		
		chromedp.ActionFunc(func(ctx context.Context) error {
			// save the screenshot to your folder
			if err := os.WriteFile("debug_vision.png", buf, 0644); err != nil {
				log.Fatal(err)
			}
			fmt.Println("Saved")
			return nil
		}),

		// extracting the image  
		chromedp.WaitVisible(`img[crossorigin="anonymous"]`, chromedp.ByQuery),
		chromedp.AttributeValue(`img[crossorigin="anonymous"]`, "src", &imageURL, nil, chromedp.ByQuery),

		// extract text  
		chromedp.ActionFunc(func(ctx context.Context) error {
			fmt.Println("getting the event details block")
			return nil
		}),
		
		// WaitReady so it doesn't care if the text is hidden behind "more"
		chromedp.WaitReady(captionXPath, chromedp.BySearch),
		chromedp.Text(captionXPath, &captionText, chromedp.BySearch),
	)

	if err != nil {
		log.Fatalf("\nBrowser automation failed , check debug_vision to see whats wrong with the post ", err)
	}


	result := map[string]string{
		"imageUrl": imageURL,
		"text":     captionText,
	}
	
	jsonResult, err := json.Marshal(result)
	if err != nil {
		log.Fatalf("Failed to marshal JSON: %v", err)
	}

	// print the separator and the JSON payload
	fmt.Println("===RESULT===")
	fmt.Println(string(jsonResult))
}