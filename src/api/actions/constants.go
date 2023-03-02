package antify

import "os"
import "fmt"
import database "github.com/brtmvdl/antify/database"

const BLANK = " "
const LINE_BREAK = "\r\n"
const CONTENT_TYPE = "Content-Type"

func GetDataPath() string {
	return fmt.Sprint(os.Getenv("ANTIFY_PATH"))
}

func GetDatabase() database.Database {
	return database.Database{GetDataPath()}
}
