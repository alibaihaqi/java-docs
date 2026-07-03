---
title: Controller CRUD
tier: intermediate
platform: java
position: 5
---

# Controller CRUD

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Controller CRUD

**Goal**

Replace the beginner `ItemController` with a new one that delegates to `ItemService` and exposes three endpoints: `GET /items`, `GET /items/{id}`, and `POST /items`. After this page you can exercise all three with `curl`.

**Prerequisites**

- [Service layer](./04-service-layer.md)

## Replace `ItemController`

Open `src/main/java/com/example/itemsapi/ItemController.java` and replace its contents:

```java
package com.example.itemsapi;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<Item> list() {
        return service.list();
    }

    @GetMapping("/{id}")
    public Item get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Item create(@Valid @RequestBody Item item) {
        return service.create(item);
    }
}
```

**Annotation breakdown:**

| Annotation | Effect |
|-----------|--------|
| `@RequestMapping("/items")` | All methods in this class share the `/items` prefix |
| `@GetMapping` | Handles `GET /items` |
| `@GetMapping("/{id}")` | Handles `GET /items/{id}`; `{id}` is bound to the `id` parameter |
| `@PathVariable Long id` | Extracts the `{id}` segment and converts it to a `Long` |
| `@PostMapping` | Handles `POST /items` |
| `@ResponseStatus(HttpStatus.CREATED)` | Returns HTTP 201 on success instead of the default 200 |
| `@RequestBody Item item` | Deserializes the JSON request body into an `Item` object |
| `@Valid` | Triggers Bean Validation on the `item` before the method body runs |

## Verify: run and test

Start the app:

```bash
./mvnw spring-boot:run
```

In a second terminal, exercise all three endpoints:

```bash
# GET /items — empty list on a fresh start
curl http://localhost:8080/items
```

```
[]
```

```bash
# POST /items — create an item
curl -X POST http://localhost:8080/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"pen"}'
```

```json
{"id":1,"name":"pen"}
```

```bash
# GET /items — list now includes the item
curl http://localhost:8080/items
```

```json
[{"id":1,"name":"pen"}]
```

```bash
# GET /items/1 — retrieve by id
curl http://localhost:8080/items/1
```

```json
{"id":1,"name":"pen"}
```

Stop the server with `Ctrl-C`.

At this point blank-name `POST` requests and requests for non-existent IDs return Spring's default error body. Page 06 replaces that with clean JSON error responses.

**Next** → [Validation and errors](./06-validation-errors.md)
