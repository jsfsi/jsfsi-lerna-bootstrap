FROM node:13.8.0-alpine

RUN apk add --no-cache bash git openssh-client
RUN npm install -g npm

RUN mkdir /workspace
WORKDIR /workspace
COPY . /workspace

RUN npm install
RUN npm run bootstrap
RUN npm run build

RUN npm run clean:production

FROM node:13.8.0-alpine
ARG APP_NAME

RUN apk add --no-cache bash git openssh-client

RUN mkdir /workspace
WORKDIR /workspace
COPY --from=0 /workspace .

RUN npm run setup:production

WORKDIR /workspace/packages/${APP_NAME}
CMD ["sh", "-c", "pwd && npm run start"]