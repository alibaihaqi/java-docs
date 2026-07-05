---
title: Actuator and health
tier: advanced
platform: java
position: 9
---

# Actuator and health

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Actuator and health

**Goal**

Enable Spring Boot Actuator for production monitoring — health checks, metrics, and custom readiness probes.

**Prerequisites**

- [Redis caching](./08-redis-caching.md)

## Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## Configuration

`application-prod.properties`:

```properties
# Expose health and info endpoints
management.endpoints.web.exposure.include=health,info,metrics,flyway,env

# Show health details (don't show in production without auth)
management.endpoint.health.show-details=always

# Custom info
info.app.name=Items API
info.app.version=1.0.0
```

## Health indicators

Spring Boot auto-configures health indicators for:
- PostgreSQL (via `DataSourceHealthIndicator`)
- Redis (via `RedisHealthIndicator`)
- Disk space (via `DiskSpaceHealthIndicator`)

## Kubernetes readiness probe

A custom readiness indicator prevents traffic if the database is down:

```java
@Component
public class DatabaseReadinessIndicator implements HealthIndicator {
    @Autowired private DataSource dataSource;

    @Override
    public Health health() {
        try (var conn = dataSource.getConnection()) {
            return conn.isValid(2)
                ? Health.up().build()
                : Health.down().withDetail("database", "not reachable").build();
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}
```

## Docker health check

Update the Dockerfile to use the Actuator health endpoint:

```dockerfile
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1
```

## Check endpoints

```bash
# Health check
curl http://localhost:8080/actuator/health | jq
# {
#   "status": "UP",
#   "components": {
#     "db": { "status": "UP" },
#     "redis": { "status": "UP" },
#     "diskSpace": { "status": "UP" }
#   }
# }

# Metrics
curl http://localhost:8080/actuator/metrics
# Lists available metrics (jvm.memory.used, http.server.requests, etc.)

# Flyway migrations
curl http://localhost:8080/actuator/flyway
# Lists all applied migrations
```

## Checkpoint

```bash
curl http://localhost:8080/actuator/health | jq '.status'
# "UP"

# Stop Postgres:
docker stop learning-docs-db-1

curl http://localhost:8080/actuator/health | jq '.components.db.status'
# "DOWN"

docker start learning-docs-db-1
```

**Next:** [CI/CD with GitHub Actions](./10-ci-cd-github-actions.md) — Maven build, test, deploy.
