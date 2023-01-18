FROM golang 

WORKDIR /usr/local/go/src/github.com/brtmvdl/antify

COPY app .

RUN /usr/local/go/bin/go mod init github.com/brtmvdl/antify

RUN /usr/local/go/bin/go mod tidy

RUN /usr/local/go/bin/go build
