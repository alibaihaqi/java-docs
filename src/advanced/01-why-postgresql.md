---
title: Why PostgreSQL
tier: advanced
platform: java
position: 1
---

# Why PostgreSQL

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Why PostgreSQL

**Goal**

Understand why H2 is unsuitable for production and how to configure Spring Boot for PostgreSQL.

**Prerequisites**

- Intermediate tier (JPA CRUD with H2)

## H2 vs PostgreSQL

| Feature | H2 | PostgreSQL |
|---------|-----|-------------|
| Persistence | In-memory by default | Disk-backed, WAL |
| Concurrency | Single-connection | Multi-connection, MVCC |
| Data safety | Lost on restart | Durable (fsync, WAL) |
| Network access | Embedded only | TCP/IP, connection pooling |
| Production use | No | Yes |

Spring Data JPA abstracts the database vendor, so switching from H2 to PostgreSQL requires only a dependency change and new connection properties.

## Add PostgreSQL dependency

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## application-postgres.properties

Create `src/main/resources/application-postgres.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/itemsdb
spring.datasource.username=postgres
spring.datasource.password=secret
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

## Activate the profile

```bash
# Start a local Postgres:
docker run -d --name pg \
  -e POSTGRES_DB=itemsdb \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres:17-alpine

# Run with the postgres profile:
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

## Checkpoint

```bash
curl http://localhost:8080/items
# → []  (empty list, now backed by PostgreSQL)

docker stop pg && docker rm pg  # cleanup
```

**Next:** [Flyway migrations](./02-flyway-migrations.md) — versioned schema management.
