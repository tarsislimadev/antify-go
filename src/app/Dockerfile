FROM golang:1.18-alpine

ENV PATH=/data

ENV PORT=80

WORKDIR /usr/local/go/src/app

COPY . .

CMD /usr/local/go/bin/go run main.go
