#!/usr/bin/env bash
host="$1"
shift
port="$1"
shift

while ! nc -z "$host" "$port"; do
  sleep 1
done

exec "$@"
