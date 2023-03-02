package antify

import http "github.com/brtmvdl/antify/http"

func Login (req http.Request, res http.Response) http.Response {
	login, err := GetDatabase().In("logins").New()

	if (err != nil) {
		return res.SetError("500", "Error on login creation.")
	}

	username := http.GetQueryFirst(req, "username")
	password := http.GetQueryFirst(req, "password")

	login.WriteMany(map[string][]byte{
		"username": []byte(username),
		"password": []byte(password),
	})

	json := make(map[string]interface{})

	json["id"] = login.Id

	return res.SetJSON(json)
}
