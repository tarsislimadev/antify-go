package antify

import "log"
import "strings"
import "encoding/json"

type ResponseBody struct {
	Status string `json:"status"`
	Message string `json:"message"`
	Data map[string]interface{} `json:"data"`
}

func (body ResponseBody) ToString() string {
	str, err := json.Marshal(body)

	if err != nil {
		log.Panic(err)
	}

	return string(str)
}

type Response struct {
	Status string
	ContentType string
	Headers []string
	Body ResponseBody
}

func (res *Response) AddHeader(key string, value string) error {
	res.Headers = append(res.Headers, key + ": " + value)

	return nil
} 

func (res Response) ToString() string {
	str := make([]string, 0)

	str = append(str, GetFirstLine(res.Status))

	str = append(str, GetContentType())

	if len(res.Headers) > 0 {
		str = append(str, strings.Join(res.Headers, LINE_BREAK))
	}

	str = append(str, "")

	str = append(str, res.Body.ToString())

	return strings.Join(str, LINE_BREAK)
}

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
