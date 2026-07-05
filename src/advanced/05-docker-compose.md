---
title: Docker and docker-compose
tier: advanced
platform: java
position: 5
---

# Docker and docker-compose

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Docker and docker-compose

**Goal**

Containerize the Spring Boot app with a multistage Dockerfile and run it alongside PostgreSQL with docker-compose.

**Prerequisites**

- [Profiles and configuration](./04-profiles-config.md)
- Docker installed

## Multistage Dockerfile

```dockerfile
# Stage 1: build with Maven
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## .dockerignore

```
target/
*.md
.env
```

## docker-compose.yml

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_PASSWORD=compose-pass
      - JWT_SECRET=compose-secret
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: itemsdb
      POSTGRES_PASSWORD: compose-pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 3s
      retries: 5
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

For the prod profile, ensure `application-prod.properties` uses the Docker service name `db` as the host:

```properties
spring.datasource.url=jdbc:postgresql://db:5432/itemsdb
```

## Build and run

```bash
docker compose up --build

# In another terminal:
curl http://localhost:8080/items
# → []  (connected to Postgres in Docker)
```

## Checkpoint

```bash
docker compose up --build -d
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/items
# 200
docker compose down -v
```

**Next:** [Integration tests with Testcontainers](./06-testcontainers.md) — real Postgres in tests.
