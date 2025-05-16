# Dockerfile for the client
FROM node:24-alpine

WORKDIR /app

COPY package.json .

COPY ./package*.json ./

RUN npm install 

EXPOSE 8080

CMD ["npm","run" ,"dev"]

