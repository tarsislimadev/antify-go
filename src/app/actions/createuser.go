package antify

import http "github.com/brtmvdl/antify/http"

func CreateUser (req http.Request, res http.Response) http.Response {
	res.AddHeader("Method", "CreateUser")
	return res
}
