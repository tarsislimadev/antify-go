package antify

import "encoding/json"
import "strings"
import "log"

const BLANK = " "
const LINE_BREAK = "\r\n"
const CONTENT_TYPE = "Content-Type"

func GetStatusMessage(status string) string {
	switch status {
		case "200": return "OK";
		case "404": return "NOT FOUND";
	}

	return "ERROR";
}

func GetFirstLine(status string) string {
	message := GetStatusMessage(status)
	return strings.Join([]string{"HTTP/1.1", status, message}, BLANK)
}

func GetContentType() string {
	return strings.Join([]string{CONTENT_TYPE, "application/json"}, ": ")
}

func GetJSONString(obejct any) string {
	bytes, err := json.Marshal(obejct)
	log.Panic(err)
	return string(bytes)
}

type Request struct {
	First string
	Headers []string
	Body string
}

func (r Request) ToString() string {
	strArr := make([]string, 0)

	strArr = append(strArr, r.First)

	strArr = append(strArr, r.Headers...)

	strArr = append(strArr, r.Body)

	return strings.Join(strArr, LINE_BREAK)
}
