package antify

import http "github.com/brtmvdl/antify/http"

func CreateUser (req http.Request, res http.Response) http.Response {
	user, err := GetDatabase().In("users").New()

	if (err != nil) {
		return res.SetError("500", "Error on user creation.")
	}

	json := make(map[string]interface{})

	json["Id"] = user.Id

	return res.SetJSON(json)
}
