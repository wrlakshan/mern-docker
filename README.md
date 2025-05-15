docker compose up --build

 image: wrlakshan/server:latest
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: api_container


env filse

env_file:
   - ./server/dev.env
enviment
   - APP_VERSION=0.1.0
   - DB_PASSWORD
   - APP_TOKEN=${APP_TOKEN}


dev.env file
 DB_PASSWORD=12345


secret in docker


configuratuion in docker

volumes

