---
title: Service layer
tier: intermediate
platform: java
position: 4
---

# Service layer

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Service layer

**Goal**

Introduce a service class between the controller and the repository so that business logic is not mixed into HTTP-handling code. After this page `ItemService` wraps the three operations the controller will expose, and `ItemNotFoundException` provides a typed signal for missing records.

**Prerequisites**

- [Entity and repository](./03-entity-repository.md)

## Why a service layer

Putting repository calls directly in the controller works for small examples, but it conflates two concerns:

- **HTTP concern** — what status code to return, how to read the request body, what to write to the response.
- **Business concern** — what it means to create an item, what happens when an item is not found.

A service class holds the second concern. The controller delegates to it. This makes both classes easier to test in isolation: page 07 shows how to test the controller without a real database and how to test the repository without an HTTP layer.

## `ItemNotFoundException`

Create `src/main/java/com/example/itemsapi/ItemNotFoundException.java`:

```java
package com.example.itemsapi;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(Long id) {
        super("item " + id + " not found");
    }
}
```

This is a plain `RuntimeException` subclass. Spring does not know about it yet — the exception handler on page 06 will map it to an HTTP 404 response.

## `ItemService`

Create `src/main/java/com/example/itemsapi/ItemService.java`:

```java
package com.example.itemsapi;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository repo;

    public ItemService(ItemRepository repo) {
        this.repo = repo;
    }

    public List<Item> list() {
        return repo.findAll();
    }

    public Item get(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new ItemNotFoundException(id));
    }

    public Item create(Item item) {
        return repo.save(item);
    }
}
```

**Key points:**

- `@Service` registers the class as a Spring component. Spring will inject it wherever `ItemService` is declared as a constructor parameter.
- Constructor injection — `public ItemService(ItemRepository repo)` — is the preferred style in Spring Boot 3.x. No `@Autowired` annotation is needed when there is exactly one constructor.
- `get(Long id)` uses `Optional.orElseThrow` to convert an absent value into the typed exception. The controller does not need an `if`-check.
- `create(Item item)` calls `repo.save(item)` and returns the saved entity, which now has the database-generated `id` populated.

## Verify: project compiles

```bash
./mvnw compile
```

Expected output:

```
BUILD SUCCESS
```

**Next** → [Controller CRUD](./05-controller-crud.md)
