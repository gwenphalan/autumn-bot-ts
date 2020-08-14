FROM node:13.6.0-stretch-slim
LABEL maintainer="GwenBebe"
WORKDIR /src

COPY package.json /src/package.json
RUN npm install

COPY . /src

CMD npm start