# Use official Golang image as a build stage
FROM golang:1.23.6-alpine AS builder

# Set environment variables
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Create working directory
WORKDIR /app

# Copy go mod files first (for layer caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application
COPY . .

# Build the Go app
RUN go build -o server .

# Final minimal image
FROM alpine:latest

WORKDIR /root/

# Copy binary from build stage
COPY --from=builder /app/server .

# Expose port
EXPOSE 8080

# Command to run
CMD ["./server"]
