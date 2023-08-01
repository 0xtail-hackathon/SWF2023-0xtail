#!/bin/bash
VERSION=`node -e "console.log(require('./package.json').version)"`

npm run build
docker build -t petere123123/root-swf2023-backend:latest --platform linux/amd64 .

docker push petere123123/root-swf2023-backend:latest