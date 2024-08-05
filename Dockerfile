FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache \
    git \
    bash

COPY *.json yarn.lock ./
RUN yarn install

COPY /src /app/src
COPY /public /app/public

EXPOSE 3000

CMD ["yarn", "start"]
