package antify

import "os"
import http "github.com/brtmvdl/antify/http"
import database "github.com/brtmvdl/antify/database"

func Login (req http.Request, res http.Response) http.Response {
	db := database.Database{os.Getenv("ANTIFY_PATH")}
	login := db.In("logins").New()

	login.WriteMany(map[string][]byte{
		"username": []byte(req.Query["username"]),
		"password": []byte(req.Query["password"]),
	})

	res.Body = http.ResponseBody{"ok", "", map[string]interface{}}

	return res
}
