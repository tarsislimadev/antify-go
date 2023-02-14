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

func NewResponse () Response {
	return Response{
		Status: "200",
		ContentType: "application/json",
	}
}

func (res Response) SetError(status string, message string) Response {
	return Response{
		Status: status,
		ContentType: res.ContentType,
		Headers: res.Headers,
		Body: ResponseBody{
			Status: "error",
			Message: message,
			Data: nil,
		},
	}
}

func (res Response) ToString() string {
	return strings.Join([]string{
		res.GetFirstLine(),
		res.GetContentType(),
		res.GetHeaders(),
		res.Body.ToString(),
	}, LINE_BREAK)
}

func GetStatusMessage(status string) string {
	switch status {
		case "200": return "OK";
		case "404": return "NOT FOUND";
	}

	return "ERROR";
}

func (res Response) GetFirstLine() string {
	status := res.Status
	message := GetStatusMessage(status)
	return strings.Join([]string{"HTTP/1.1", status, message}, BLANK)
}

func (res Response) GetContentType() string {
	return strings.Join([]string{CONTENT_TYPE, res.ContentType}, ": ")
}

func (res Response) GetHeaders() string {
	return strings.Join(res.Headers, LINE_BREAK)
}

func (res Response) SetJSON(json map[string]interface{}) Response {
	res.Status = "200"
	res.Body = ResponseBody{"ok", "", json}

	return res
}
