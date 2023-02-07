package antify

import http "github.com/brtmvdl/antify/http"

func Login (req http.Request, res http.Response) http.Response {
	res.AddHeader("Method", "Login")
	return res
}
