FROM node:13.6.0-stretch-slim
LABEL maintainer="GwenBebe"
WORKDIR /src

RUN apt-get update && apt-get install -y --no-install-recommends build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev  && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8125

COPY package.json /src/package.json
RUN npm install

COPY . /src

CMD npm start