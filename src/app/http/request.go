package antify

import "net"
import "bufio"
import "strings"

type Request struct {
	Conn net.Conn
	Lines []string
	Method string
	Path string
	Query map[string][]string
	Headers map[string]string
	Body string
}

func CreateRequest(conn net.Conn) Request {
	lines := GetLines(conn)

	return Request{
		Conn: conn,
		Lines: lines,
		Method: GetMethod(lines),
		Path: GetPath(lines),
		Query: GetQueries(lines),
		Headers: GetHeaders(lines),
		Body: GetBody(conn),
	}
}

func GetLines(conn net.Conn) []string {
	scanner := bufio.NewScanner(bufio.NewReader(conn))

	lines := make([]string, 0)

	for scanner.Scan() {
		line := scanner.Text()

		if line == "" {
			return lines
		}

		lines = append(lines, line)
	}

	return make([]string, 0)
}

func GetQueries(lines []string) map[string][]string {
	query := make(map[string][]string)

	if len(lines) == 0 {
		return query
	}

	parts := strings.Split(lines[0], " ")
	pathAndQuery := strings.Split(parts[1], "?")

	if len(pathAndQuery) != 2 {
		return query
	}

	splitedQueries := strings.Split(pathAndQuery[1], "&")

	for _, splitedQuery := range splitedQueries {
		if pairQuery := strings.Split(splitedQuery, "="); len(pairQuery) == 2 {
			query[pairQuery[0]] = []string{pairQuery[1]}
		}
	}

	return query
}

func (req Request) GetQuery(q string) []string {
	queries := GetQueries(req.Lines)

	return queries[q]
}

func GetQueryFirst(req Request, q string) string {
	query := req.GetQuery(q)

	if (len(query) == 0) {
		return ""
	}

	return query[0]
}

func GetMethod(lines []string) string {
	parts := strings.Split(lines[0], " ")

	return parts[0]
}

func GetPath(lines []string) string {
	if (len(lines) == 0) {
		return ""
	}

	parts := strings.Split(lines[0], " ")
	pathAndQuery := strings.Split(parts[1], "?")

	return pathAndQuery[0][1:]
}

func GetHeaders(lines []string) map[string]string {
	headers := make(map[string]string)

	for i, line := range lines {
		if i == 0 {
			continue
		}

		if line == "" {
			break
		}

		pair := strings.Split(line, ": ")

		headers[pair[0]] = pair[1]
	}

	return headers
}

func GetBody(conn net.Conn) string {
	scanner := bufio.NewScanner(bufio.NewReader(conn))

	for scanner.Scan() && scanner.Text() != "" {}

	return scanner.Text()
}

func (req Request) ToString() string {
	return strings.Join(req.Lines, LINE_BREAK) 
}
