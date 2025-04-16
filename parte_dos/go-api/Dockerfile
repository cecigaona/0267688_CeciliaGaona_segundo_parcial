#imagen donde se construye todo
FROM golang:1.23.6-alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o server .

#jalar lo necesario del builder
FROM alpine:latest

WORKDIR /root/


COPY --from=builder /app/server .

EXPOSE 8080

COPY entrypoint.sh /root/entrypoint.sh
RUN chmod +x /root/entrypoint.sh
ENTRYPOINT ["/root/entrypoint.sh"]

CMD ["./server"]
