// Duplicity offline launcher (Windows portable exe).
//
// The whole editor (one HTML file) is embedded in this exe. When started, it
// serves the editor on 127.0.0.1 only (never reachable from the network or
// internet) and opens it in the default browser. Close the window to quit.
package main

import (
	_ "embed"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"time"
)

//go:embed app.html
var appHTML []byte

// Set at build time with -ldflags "-X main.version=...".
var version = "dev"

func openBrowser(url string) error {
	switch runtime.GOOS {
	case "windows":
		return exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		return exec.Command("open", url).Start()
	default:
		return exec.Command("xdg-open", url).Start()
	}
}

func waitAndExit(code int) {
	fmt.Println()
	fmt.Println("Press Enter to close.")
	fmt.Scanln()
	os.Exit(code)
}

func main() {
	fmt.Printf("Duplicity %s - Oxygen Not Included save editor (offline)\n", version)
	fmt.Println("https://github.com/tosjkg-max/oni-duplicity-copy")
	fmt.Println()

	// Port 0 = let the OS pick a free port. Bound to loopback only.
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Println("ERROR: could not start local server:", err)
		waitAndExit(1)
	}
	url := fmt.Sprintf("http://%s/", ln.Addr().String())

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" && r.URL.Path != "/index.html" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		w.Write(appHTML)
	})

	go func() {
		time.Sleep(300 * time.Millisecond)
		if err := openBrowser(url); err != nil {
			fmt.Println("Could not open the browser automatically.")
		}
	}()

	fmt.Println("Editor is running at:", url)
	fmt.Println("If the browser did not open, copy that address into your browser.")
	fmt.Println()
	fmt.Println("REMEMBER: back up your save file before editing.")
	fmt.Println("Keep this window open while using the editor. Close it to quit.")

	if err := http.Serve(ln, mux); err != nil {
		fmt.Println("ERROR:", err)
		waitAndExit(1)
	}
}
