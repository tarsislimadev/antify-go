package antify

import http "github.com/brtmvdl/antify/http"

func CreateUser (req http.Request, res http.Response) http.Response {
	user := GetDatabase().In("users").New()

	data := make(map[string]interface{})

	data["Id"] = user.Id

	res.Body = http.ResponseBody{
		Status: "ok",
		Message: "",
		Data: data,
	}

	return res
}
