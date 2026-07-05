---
title: Integration tests with Testcontainers
tier: advanced
platform: java
position: 6
---

# Integration tests with Testcontainers

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › Integration tests with Testcontainers

**Goal**

Write integration tests using Testcontainers to spin up a real PostgreSQL container, run Flyway migrations, then execute repository and controller tests against it.

**Prerequisites**

- [Docker and docker-compose](./05-docker-compose.md)

## Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-testcontainers</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

## Test configuration

Create `src/test/resources/application-test.properties`:

```properties
spring.datasource.url=jdbc:tc:postgresql:17-alpine:///itemsdb
spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver
spring.flyway.enabled=true
spring.jpa.hibernate.ddl-auto=validate
```

The `tc:` prefix in the URL tells Testcontainers to automatically start a PostgreSQL container.

## Repository integration test

```java
@SpringBootTest
@Testcontainers
class ItemRepositoryTest {

    @Autowired
    private ItemRepository repository;

    @Test
    void shouldSaveAndFind() {
        var item = new Item(null, "test", "description", false);
        var saved = repository.save(item);

        var found = repository.findById(saved.getId());
        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("test");
    }
}
```

## Controller integration test

```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Testcontainers
class ItemControllerTest {

    @Autowired
    private TestRestTemplate rest;

    @Test
    void shouldListItems() {
        var response = rest.exchange(
            "/items", GET, null,
            new ParameterizedTypeReference<List<Item>>() {}
        );
        assertThat(response.getStatusCode()).isEqualTo(200);
    }
}
```

## Run

```bash
./mvnw verify
# Testcontainers starts Postgres, runs Flyway migrat, executes tests, stops container
# All tests pass against real PostgreSQL
```

## Checkpoint

```bash
./mvnw test
# Tests: 3, Passed: 3
# Testcontainers output: Container postgres:17-alpine started in 3.2s
```

**Next:** [OpenAPI documentation](./07-openapi-docs.md) — Swagger UI, API docs with springdoc.
