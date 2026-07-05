---
title: OpenAPI documentation
tier: advanced
platform: java
position: 7
---

# OpenAPI documentation

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › OpenAPI documentation

**Goal**

Add springdoc-openapi to auto-generate OpenAPI 3.0 spec from annotations and serve Swagger UI.

**Prerequisites**

- [Integration tests with Testcontainers](./06-testcontainers.md)

## Dependency

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.5</version>
</dependency>
```

No extra configuration required — springdoc auto-detects all `@RestController` endpoints and generates the spec.

## Customize with annotations

```java
@RestController
@RequestMapping("/items")
@Tag(name = "Items", description = "CRUD operations for items")
public class ItemController {

    @GetMapping
    @Operation(summary = "List all items")
    public List<Item> list() { /* ... */ }

    @GetMapping("/{id}")
    @Operation(summary = "Get item by ID")
    public ResponseEntity<Item> get(@PathVariable Long id) { /* ... */ }

    @PostMapping
    @Operation(summary = "Create a new item")
    public Item create(@Valid @RequestBody Item item) { /* ... */ }
}
```

## Security scheme for JWT

```java
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info().title("Items API").version("1.0"))
            .addSecurityItem(new SecurityRequirement().addList("bearer"))
            .components(new Components()
                .addSecuritySchemes("bearer",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}
```

## Access

| Endpoint | Description |
|----------|-------------|
| `http://localhost:8080/swagger-ui.html` | Interactive Swagger UI |
| `http://localhost:8080/v3/api-docs` | Raw OpenAPI JSON |
| `http://localhost:8080/v3/api-docs.yaml` | Raw OpenAPI YAML |

## Test from Swagger UI

1. Open `http://localhost:8080/swagger-ui.html`
2. `POST /auth/login` → get a token
3. Click **Authorize** → paste `Bearer <token>`
4. Try `GET /items` — returns 200 with data

## Checkpoint

```bash
curl http://localhost:8080/v3/api-docs | jq '.info.title'
# "Items API"

curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/swagger-ui.html
# 200  (HTML page with Swagger UI)
```

**Next:** [Redis caching](./08-redis-caching.md) — cache repository results with Redis.
