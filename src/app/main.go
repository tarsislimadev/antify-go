package main

import (
	"os"
	"fmt"
	"log"
	"net"
	"bufio"
	"encoding/json"
)

type Response struct {
	Status string `json:"status"`
	Message string `json:"message"`
	Data map[string]interface{} `json:"data"`
}

func main() {
	path := os.Getenv("PATH")
	port := os.Getenv("PORT")

	log.Println("Antify v0.1.0")
	log.Println("PATH: " + path + "; PORT: " + port + "; ")

	ln, err := net.Listen("tcp", ":" + port)
	logPanic(err)

	for {
		conn, err := ln.Accept()
		logPanic(err)
		go handle(conn)
	}
}

func logPanic(err error) {
	if err != nil {
		log.Panic(err)
	}
}

func handle(conn net.Conn) {
	defer conn.Close()

	scanner := bufio.NewScanner(bufio.NewReader(conn))

	for scanner.Scan() {
		line := ""

		if line = scanner.Text(); line == "" {
			break
		}

		log.Println(line)
	}

	fmt.Fprintf(conn, getFirstLine("200"))
	fmt.Fprintf(conn, getContentType())
	fmt.Fprintf(conn, getString(""))
	fmt.Fprintf(conn, getJSONString(Response{
		Status: "ok",
		Message: "",
		Data: nil,
	}))
}

func getStatusMessage(status string) string {
	switch status {
		case "200": return "OK";
		case "404": return "NOT FOUND";
	}

	return "ERROR";
}

func getFirstLine(status string) string {
	message := getStatusMessage(status)
	return getString("HTTP/1.1 " + status + " " + message)
}

func getContentType() string {
	return getString("Content-Type: application/json")
}

func getString(str string) string {
	return str + "\r\n"
}

func getJSONString(obejct any) string {
	bytes, err := json.Marshal(obejct)
	logPanic(err)
	return string(bytes)
}
