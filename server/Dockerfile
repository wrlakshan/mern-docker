# Dockerfile for the API service
FROM node:24-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./package*.json ./

RUN npm install

EXPOSE 5000

CMD ["npm","run" ,"dev"]

