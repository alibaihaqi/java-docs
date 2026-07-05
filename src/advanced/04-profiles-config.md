---
title: Profiles and configuration
tier: advanced
platform: java
position: 4
---

# Profiles and configuration

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Profiles and configuration

**Goal**

Structure Spring Boot configuration for multiple environments using profiles, `.env` files, and `@ConfigurationProperties`.

**Prerequisites**

- [Spring Security JWT](./03-spring-security-jwt.md)

## Profile-specific files

```
src/main/resources/
  application.properties          # shared defaults
  application-dev.properties      # dev overrides
  application-prod.properties     # prod overrides
```

`application.properties`:

```properties
spring.application.name=items-api
server.port=8080
jwt.secret=dev-secret-change-in-prod
```

`application-dev.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/itemsdb
spring.datasource.password=secret
spring.jpa.show-sql=true
```

`application-prod.properties`:

```properties
spring.datasource.url=jdbc:postgresql://prod-db:5432/itemsdb
spring.datasource.password=${DB_PASSWORD}
spring.jpa.show-sql=false
jwt.secret=${JWT_SECRET}
```

## Type-safe configuration

```java
@ConfigurationProperties(prefix = "jwt")
@Component
public class JwtProperties {
    private String secret;
    private long expirationMs = 3600_000;
    // getters and setters
}
```

Enable in a `@Configuration` class:

```java
@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class AppConfig {}
```

## Using .env with Dotenv

For local development, use a `.env` file (never committed):

```properties
DB_PASSWORD=local-secret
JWT_SECRET=local-jwt-secret
```

Spring Boot does not load `.env` by default. Add `me.paulschwarz:spring-dotenv`:

```xml
<dependency>
    <groupId>me.paulschwarz</groupId>
    <artifactId>spring-dotenv</artifactId>
    <version>4.0.0</version>
</dependency>
```

Or set environment variables in your shell/IDE run config.

## Activate a profile

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
# or
export SPRING_PROFILES_ACTIVE=prod
./mvnw spring-boot:run
```

## Checkpoint

```bash
SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
# → "The following profiles are active: dev"
# → connects to localhost PostgreSQL
```

**Next:** [Docker and docker-compose](./05-docker-compose.md) — containerize the Spring Boot app.
