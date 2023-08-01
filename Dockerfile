FROM node:18

RUN mkdir -p /data/app/node_modules
WORKDIR /data/app

COPY dist/src /data/app/
COPY node_modules/ /data/app/node_modules

WORKDIR /data

ENV PORT 10080
CMD ["node", "/data/app/main"]
