#!/bin/sh
set -e

echo "Sleeping 10s to simulate init container..."
sleep 10

exec "$@"
