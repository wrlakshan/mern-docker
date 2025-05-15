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
```

## Docker Secrets
Docker secrets provide a secure way to store sensitive data. These are encrypted at rest and only accessible to services that need them.

## Docker Configuration
Docker configurations allow you to store non-sensitive configuration data and deploy it to containers.

## Docker Volumes
Volumes provide persistent storage for containers, allowing data to persist between container restarts.

## Common Commands

Build and start with default configuration:
```bash
docker-compose up --build
```

Build and start with specific configuration file:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

Check container health status:
```bash
docker inspect api_container | grep -A 10 Health
```

## Container Health Checks
Docker health checks monitor the status of your containers. They help detect if a service is running correctly and can trigger automatic restarts when issues occur.

The command `docker inspect api_container | grep -A 10 Health` displays the health check configuration and current status of the api_container. The `-A 10` flag shows 10 lines of context after any matching Health entries.

Example output:
```json
"Health": {
    "Status": "healthy",
    "FailingStreak": 0,
    "Log": [
        {
            "Start": "2023-08-15T12:00:01.123456789Z",
            "End": "2023-08-15T12:00:02.123456789Z",
            "ExitCode": 0,
            "Output": "HTTP/1.1 200 OK\r\n"
        }
    ]
}
```