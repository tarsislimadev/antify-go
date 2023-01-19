package main

import "os"
import "fmt"
import "log"
import "net"
import "flag"
import "bufio"
import http "github.com/brtmvdl/antify/http"

func main() {
	path := os.Getenv("ANTIFY_PATH")
	if (path == "") { path = *flag.String("path", "/data", "Antify data path") }

	port := os.Getenv("ANTIFY_PORT")
	if (port == "") { port = *flag.String("port", "80", "Antify HTTP port") }

	fmt.Println("Antify v0.1.0")
	fmt.Println("PATH: " + path + "; PORT: " + port + "; ")

	dial(port)

	ln, err := net.Listen("tcp", ":" + port)
	logPanic(err)
	defer ln.Close()

	for {
		conn, err := ln.Accept()
		logPanic(err)
		go handle(conn)
	}
}

func logPanic(err error) {
	if (err != nil) {
		log.Panic(err)
	}
}

func dial(port string) {
	_, err := net.Dial("tcp", ":" + port)
	if err != nil {
		panic("Can not listen at port " + port)
	}
}

func handle(conn net.Conn) {
	defer conn.Close()

	fmt.Println(getRequest(conn).ToString())

	fmt.Fprintf(conn, http.GetFirstLine("200"))
	fmt.Fprintf(conn, http.GetContentType())
	fmt.Fprintf(conn, "")
	fmt.Fprintf(conn, http.GetJSONString(http.Response{
		Status: "ok",
		Message: "",
		Data: nil,
	}))
}

func getRequest(conn net.Conn) http.Request {
	scanner := bufio.NewScanner(bufio.NewReader(conn))

	lines := make([]string, 0)

	for scanner.Scan() {
		line := ""

		if line = scanner.Text(); line == "" {
			break
		}

		lines = append(lines, line)
	}

	return http.Request{
		First: lines[0],
		Headers: lines[1:],
		Body: "",
	}
}
