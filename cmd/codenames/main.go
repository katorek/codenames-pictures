package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/katorek/codenames-pictures"
)

const DEFAULT_PORT = "9001"
const DEFAULT_PATH = "assets_codenames"


func main() {
	if len(os.Args) > 3 {
		fmt.Fprintf(os.Stderr, "Too many arguments\n")
		os.Exit(1)
	}

	var port string
	var path string
	if len(os.Args) == 3 {
		port = os.Args[1]
		path = os.Args[2]
	} else {
		port = DEFAULT_PORT
		path = DEFAULT_PATH
	}


	rand.Seed(time.Now().UnixNano())

	server := &codenames.Server{
		Server: http.Server{
			Addr: ":" + port,
		},
		AssetsPath: path,
	}
	fmt.Printf("Starting server on port %s...\nAssets path: %s\n", port, path)
	if err := server.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "error: %s\n", err)
	}
}
