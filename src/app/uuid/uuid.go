package antify

import "fmt"

import "math/rand"

func New() string {
	return fmt.Sprint(rand.Int())
}
