package antify

import "strings"

type Request struct {
	Method string
	Path string
	Query map[string][]string
	Headers map[string]string
	Body string
}

func (r Request) ToString() string {
	return strings.Join([]string{
		r.Method,
		r.Path,
		// r.Query,
		// r.Headers,
		r.Body,
	}, LINE_BREAK)
}

func (r Request) GetQuery(q string) []string {
	return r.Query[q]
}

func (r Request) GetQueryFirst(q string) string {
	query := r.GetQuery(q)

	if (len(query) == 0) {
		return ""
	}

	return query[0]
}
