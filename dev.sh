#!/usr/bin/env bash

docker build -t flyover . && docker run --rm --name flyover --env-file .env -v ${PWD}/config/nginx.conf:/etc/nginx/nginx.conf -p 8085:80 flyover
