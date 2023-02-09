package antify

import "os"
import "fmt"

import http "github.com/brtmvdl/antify/http"
import database "github.com/brtmvdl/antify/database"

func Login (req http.Request, res http.Response) http.Response {
	db := database.Database{os.Getenv("ANTIFY_PATH")}
	login := db.In("logins").New()

	login.WriteMany(map[string][]byte{
		"username": []byte(req.GetQueryFirst("username")),
		"password": []byte(req.GetQueryFirst("password")),
	})

	json := make(map[string]interface{})

	json["id"] = login.Id

	return res.SetJSON(json)
}
