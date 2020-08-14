FROM node:alpine
LABEL maintainer="GwenBebe"
WORKDIR /src

RUN apk update && apk add build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev  && apk clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8125

COPY package.json /src/package.json
RUN npm install

COPY . /src

CMD npm start