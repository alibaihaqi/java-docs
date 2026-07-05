---
title: Flyway migrations
tier: advanced
platform: java
position: 2
---

# Flyway migrations

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Flyway migrations

**Goal**

Replace Hibernate's `ddl-auto=update` with Flyway versioned migrations for safe, repeatable schema management.

**Prerequisites**

- [Why PostgreSQL](./01-why-postgresql.md)

## Why not ddl-auto

`spring.jpa.hibernate.ddl-auto=update` auto-creates tables based on entities. In production this is dangerous:
- It can drop columns or tables if you rename a field
- No audit trail of schema changes
- Can't roll back

Flyway uses SQL scripts with version numbers. Each script runs exactly once.

## Add Flyway

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-postgresql</artifactId>
</dependency>
```

## Disable ddl-auto

In `application-postgres.properties`:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

Flyway creates the schema; Hibernate validates that entities match.

## First migration

Create `src/main/resources/db/migration/V1__create_items_table.sql`:

```sql
CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    detail TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Second migration

`V2__add_favorite_column.sql`:

```sql
ALTER TABLE items ADD COLUMN is_favorite BOOLEAN NOT NULL DEFAULT FALSE;
```

## Run

```bash
docker run -d --name pg \
  -e POSTGRES_DB=itemsdb \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres:17-alpine

./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

Spring Boot detects Flyway on the classpath and runs pending migrations automatically.

## Checkpoint

```bash
# Check migration history
curl http://localhost:8080/actuator/flyway  # if Actuator is enabled
# Or check the flyway_schema_history table:
docker exec pg psql -U postgres -d itemsdb -c "SELECT version, success FROM flyway_schema_history;"
# version | success
# 1       | t
# 2       | t
```

**Next:** [Spring Security JWT](./03-spring-security-jwt.md) — login endpoint, bearer token auth.
