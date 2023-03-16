FROM golang:1.18

ENV ANTIFY_PATH=/data

ENV ANTIFY_PORT=80

WORKDIR /usr/local/go/src/github.com/brtmvdl/antify

COPY . .

RUN /usr/local/go/bin/go mod init github.com/brtmvdl/antify

RUN /usr/local/go/bin/go mod tidy

RUN /usr/local/go/bin/go build

RUN find / -name antify

CMD ./antify -port=${ANTIFY_PORT} -path=${ANTIFY_PATH}
