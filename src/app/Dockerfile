FROM golang:1.18-alpine

ENV PATH=/data

ENV PORT=80

WORKDIR /usr/local/go/src/github.com/brtmvdl/antify

COPY . .

RUN /usr/local/go/bin/go mod init github.com/brtmvdl/antify

RUN /usr/local/go/bin/go mod tidy

RUN /usr/local/go/bin/go build

CMD ./antify -port=${PORT} -path=${PATH}
