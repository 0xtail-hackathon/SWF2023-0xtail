#!/bin/bash
VERSION=`node -e "console.log(require('./package.json').version)"`
docker build -t petere123123/root-swf2023-backend:v${VERSION} --platform linux/amd64 .

docker push petere123123/root-swf2023-backend:v${VERSION}