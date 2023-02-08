package antify

import "time"

func New() string {
	then := time.Date(2023, 02, 8, 18, 00, 00, 0, time.UTC)

	return string(time.Now().Sub(then).Nanoseconds())
}
