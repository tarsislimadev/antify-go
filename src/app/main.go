package main

import "io"
import "os"
import "fmt"
import "log"
import "net"
import "flag"
import "bufio"
import "strings"
import "encoding/json"
import http "github.com/brtmvdl/antify/http"

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

func printResponse(w io.Writer, str string) {
	fmt.Fprintf(w, str + "\r\n")
}

func handle(conn net.Conn) {
	defer conn.Close()

	request := getRequest(conn)
	response := run(request, http.Response{})

	res, err := json.Marshal(response)
	logPanic(err)

	printResponse(conn, http.GetFirstLine("200"))
	printResponse(conn, http.GetContentType())
	printResponse(conn, "")
	printResponse(conn, string(res))
}

func run(req http.Request, res http.Response) http.Response {
	return http.Response{}
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
		Query: getRequestQuery(lines),
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
	parts := strings.Split(request[0], " ")
	pathAndQuery := strings.Split(parts[1], "?")
	splitedQueries := strings.Split(pathAndQuery[1], "&")
	requestQuery := make(map[string][]string)

	for _, splitedQuery := range splitedQueries {
		pairQuery := strings.Split(splitedQuery, "=")
		requestQuery[pairQuery[0]] = []string{pairQuery[1]}
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
