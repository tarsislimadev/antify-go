package main

import "os"
import "fmt"
import "log"
import "net"
import "flag"
import "bufio"
import "strings"
import http "github.com/brtmvdl/antify/http"
import actions "github.com/brtmvdl/antify/actions"

func main() {
	path := os.Getenv("ANTIFY_PATH")
	if (path == "") { path = *flag.String("path", "/data", "Antify data path") }

	port := os.Getenv("ANTIFY_PORT")
	if (port == "") { port = *flag.String("port", "80", "Antify HTTP port") }

	fmt.Println("Antify v0.1.0")
	fmt.Println("PATH: " + path + "; PORT: " + port + "; ")

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

	request := getRequest(conn)
	response := run(request)

	fmt.Fprintf(conn, response.ToString() + "\r\n")
}

func run(req http.Request) http.Response {
	fmt.Println("Run: ", req.Path) // FIXME

	res := http.Response{
		Status: "200",
		ContentType: "application/json",
	}

	switch req.Path {
		case "login": return actions.Login(req, res)
		case "createuser": return actions.CreateUser(req, res)
	}

	return res
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
		Method: getRequestMethod(lines),
		Path: getRequestPath(lines),
		// Query: getRequestQuery(lines),
		Headers: getRequestHeaders(lines),
		Body: "",
	}
}

func getRequestMethod(str []string) string {
	parts := strings.Split(str[0], " ")
	return parts[0]
}

func getRequestPath(str []string) string {
	parts := strings.Split(str[0], " ")
	pathAndQuery := strings.Split(parts[1], "?")

	return pathAndQuery[0][1:]
}

func getRequestQuery(request []string) map[string][]string {
	requestQuery := make(map[string][]string)

	if len(request) > 0 {
		parts := strings.Split(request[0], " ")
		pathAndQuery := strings.Split(parts[1], "?")
		splitedQueries := strings.Split(pathAndQuery[1], "&")

		for _, splitedQuery := range splitedQueries {
			pairQuery := strings.Split(splitedQuery, "=")
			requestQuery[pairQuery[0]] = []string{pairQuery[1]}
		}
	}

	return requestQuery
}

func getRequestHeaders(request []string) map[string]string {
	requestHeaders := make(map[string]string)

	for i, line := range request {
		if i == 0 {
			continue
		}

		if line == "" {
			break
		}

		pair := strings.Split(line, ": ")

		requestHeaders[pair[0]] = pair[1]
	}

	return requestHeaders
}
