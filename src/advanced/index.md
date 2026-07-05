---
title: Java Advanced — production Spring Boot with auth, Docker, and CI/CD
tier: advanced
platform: java
---

# Java Advanced

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced

## What you'll build

You upgrade the intermediate H2-backed CRUD API into a production-ready Spring Boot application with PostgreSQL, Spring Security JWT auth, Flyway migrations, Docker deployment, Testcontainers integration tests, OpenAPI docs, Redis caching, and GitHub Actions CI/CD.

## Prerequisites

- Complete the [Intermediate tier](../intermediate/) (JPA CRUD with H2)
- JDK 21+, Maven 3.9+
- Docker installed

## The ladder

1. [01 Why PostgreSQL](./01-why-postgresql.md) — from H2 to production database
2. [02 Flyway migrations](./02-flyway-migrations.md) — versioned schema management
3. [03 Spring Security JWT](./03-spring-security-jwt.md) — login endpoint, bearer token auth
4. [04 Profiles and configuration](./04-profiles-config.md) — dev vs prod with `.env`
5. [05 Docker and docker-compose](./05-docker-compose.md) — containerize with Postgres
6. [06 Integration tests with Testcontainers](./06-testcontainers.md) — real Postgres in tests
7. [07 OpenAPI documentation](./07-openapi-docs.md) — Swagger UI, API docs
8. [08 Redis caching](./08-redis-caching.md) — cache repository results
9. [09 Actuator and health](./09-actuator-health.md) — production monitoring endpoints
10. [10 CI/CD with GitHub Actions](./10-ci-cd-github-actions.md) — Maven build, test, deploy

**Start** → [01 Why PostgreSQL](./01-why-postgresql.md)
