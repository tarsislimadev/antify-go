package main

import "os"
import "fmt"
import "log"
import "net"
import "flag"
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

	request := http.CreateRequest(conn) 
	response := run(request)

	fmt.Fprintf(conn, response.ToString() + "\r\n")
}

func run(req http.Request) http.Response {
	fmt.Println("Run: ", req.ToString())

	res := http.CreateResponse()

	switch req.Path {
		case "login": return actions.Login(req, res)
		case "createuser": return actions.CreateUser(req, res)
	}

	return res.SetError("404", "Not Found")
}

