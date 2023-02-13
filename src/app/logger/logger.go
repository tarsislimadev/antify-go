package antify

import "log"

func Log(strings ...string) {
	for _, str := range strings {
		log.Println(str)
	}
}
