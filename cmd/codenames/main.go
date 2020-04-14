package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/katorek/codenames-pictures"
	"gopkg.in/yaml.v3"
)

type Yml struct {
	Port      string `yaml:"port"`
	AssetPath string `yaml:"assetPath"`
}

func DefaultSettings() Yml {
	return Yml{
		Port:      "9000",
		AssetPath: "assets",
	}
}

func main() {
	if len(os.Args) > 2 {
		fmt.Fprintf(os.Stderr, "Too many arguments\n")
		os.Exit(1)
	}

	yml := DefaultSettings()

	if len(os.Args) == 2 {
		properties := os.Args[1]
		info, err := os.Stat(properties)
		if !os.IsNotExist(err) && !info.IsDir() {
			file, err := os.Open(properties)
			data, err := ioutil.ReadAll(file)
			err = yaml.Unmarshal([]byte(data), &yml)
			if err != nil {
				log.Fatalf("Error unmarshalling yaml file: %v", err)
			}
			fmt.Println("Properties file loaded:")
			fmt.Println(yml)
		}
	} else {
		fmt.Println("Properties file not specified\nSetting defaults:\n")
		fmt.Println(yml)
	}

	//info, err := os.Stat(PROPERTIES)
	//if os.IsExist(err) && !info.IsDir() {
	//	file, err := os.Open(PROPERTIES)
	//	data, err := ioutil.ReadAll(file)
	//	err = yaml.Unmarshal([]byte(data), &yml)
	//	if err != nil {
	//		log.Fatalf("Error unmarshalling yaml file: %v", err)
	//	}
	//	fmt.Println("Proeprteis file loaded\nProperties:\n")
	//	fmt.Println(yml)
	//} else {
	//	fmt.Println("No properties file in path\nSetting defaults:\n")
	//	fmt.Println(yml)
	//}

	//var port string
	//var path string
	//if len(os.Args) == 3 {
	//	port = os.Args[1]
	//	path = os.Args[2]
	//} else {
	//	port = DEFAULT_PORT
	//	path = DEFAULT_PATH
	//}

	rand.Seed(time.Now().UnixNano())

	server := &codenames.Server{
		Server: http.Server{
			Addr: ":" + yml.Port,
		},
		AssetsPath: yml.AssetPath,
	}

	if err := server.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "error: %s\n", err)
	}
}
