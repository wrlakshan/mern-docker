# Docker MERN Stack Configuration Guide

## Quick Start

Build and start all containers:
```bash
docker compose up --build
```

Access your application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## Container Configuration

### Server Container
```yaml
image: wrlakshan/server:latest
build:
    context: ./server
    dockerfile: Dockerfile
container_name: api_container
ports:
    - "5000:5000"
```

### Client Container
```yaml
image: wrlakshan/client:latest
build:
    context: ./client
    dockerfile: Dockerfile
container_name: react_container
ports:
    - "3000:3000"
```

### MongoDB Container
```yaml
image: mongo:latest
container_name: mongodb_container
volumes:
    - mongo_data:/data/db
ports:
    - "27017:27017"
```

## Environment Variables

### Using env_file
Load all environment variables from a file:
```yaml
env_file:
    - ./server/dev.env
```

### Inline Environment Variables
Define environment variables directly in docker-compose:
```yaml
environment:
    - APP_VERSION=0.1.0
    - DB_PASSWORD        # Uses value from host environment
    - APP_TOKEN=${APP_TOKEN}  # Uses variable from host with substitution
```

### Sample dev.env File
```
DB_PASSWORD=12345
MONGO_URI=mongodb://mongodb_container:27017/myapp
JWT_SECRET=mysecrettoken
NODE_ENV=development
```

## Docker Secrets
Docker secrets provide a secure way to store sensitive data. These are encrypted at rest and only accessible to services that need them.

```yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt

services:
  api:
    secrets:
      - db_password
```

## Docker Configuration
Docker configurations allow you to store non-sensitive configuration data and deploy it to containers.

```yaml
configs:
  api_config:
    file: ./configs/api_config.json
    
services:
  api:
    configs:
      - source: api_config
        target: /app/config.json
```

## Docker Volumes
Volumes provide persistent storage for containers, allowing data to persist between container restarts.

```yaml
volumes:
  mongo_data:
    driver: local
  node_modules:
    driver: local
```

## Common Commands

Build and start with default configuration:
```bash
docker compose up --build
```

Build and start with specific configuration file:
```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop all containers:
```bash
docker compose down
```

View container logs:
```bash
docker compose logs -f [service_name]
```