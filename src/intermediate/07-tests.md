---
title: Tests
tier: intermediate
platform: java
position: 7
---

# Tests

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Tests

**Goal**

Write a repository slice test with `@DataJpaTest` and a web layer test with `@WebMvcTest`. After this page `./mvnw test` passes with both test classes green, and you have seen the two main Spring Boot test slices in action.

**Prerequisites**

- [Validation and errors](./06-validation-errors.md)

## Why two test slices

Spring Boot offers *test slices* — annotations that start only the part of the application context relevant to one layer:

| Slice | Starts | Does NOT start |
|-------|--------|----------------|
| `@DataJpaTest` | JPA, H2, repositories | Web layer, controllers |
| `@WebMvcTest` | MockMvc, controllers, advice | JPA, real service beans |

This keeps tests fast and focused. A `@DataJpaTest` confirms the repository query is correct without an HTTP request. A `@WebMvcTest` confirms the controller serializes correctly without a real database.

## Repository slice test

Create `src/test/java/com/example/itemsapi/ItemRepositoryTest.java`:

```java
package com.example.itemsapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ItemRepositoryTest {

    @Autowired
    ItemRepository repo;

    @Test
    void savesAndFinds() {
        Item it = new Item();
        it.setName("pen");
        Item saved = repo.save(it);
        assertThat(repo.findById(saved.getId())).isPresent();
    }
}
```

**What it does:**

- `@DataJpaTest` starts an embedded H2 instance and the JPA layer. Each test runs in a transaction that is rolled back at the end, so tests are isolated.
- `repo.save(it)` persists the item and returns it with the generated `id` populated.
- `assertThat(...).isPresent()` uses AssertJ (bundled with `spring-boot-starter-test`) to verify the saved item can be retrieved by its ID.

## Web layer test

Create `src/test/java/com/example/itemsapi/ItemControllerTest.java`:

```java
package com.example.itemsapi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ItemController.class)
class ItemControllerTest {

    @Autowired
    MockMvc mvc;

    @MockBean
    ItemService service;

    @Test
    void rejectsBlankName() throws Exception {
        mvc.perform(post("/items")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"\"}"))
           .andExpect(status().isBadRequest());
    }
}
```

**What it does:**

- `@WebMvcTest(ItemController.class)` starts MockMvc and the `ItemController`, `ApiExceptionHandler`, and the validation infrastructure — nothing else.
- `@MockBean ItemService service` — Spring replaces the real `ItemService` bean with a Mockito mock. The test does not reach the repository at all.
- `mvc.perform(post("/items")...)` — sends a fake HTTP `POST` with an empty `name` field.
- `.andExpect(status().isBadRequest())` — asserts the response is HTTP 400, which our `ApiExceptionHandler` sets when `MethodArgumentNotValidException` is thrown.

## Verify: tests pass

```bash
./mvnw test
```

Expected output (last lines):

```
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

If `ItemControllerTest` fails with a `NoSuchBeanDefinitionException` for `ItemService`, check that `@MockBean` is present — `@WebMvcTest` does not load service beans automatically.

## What you have built

At the end of this tier your project has:

- An `Item` entity mapped to an H2 table.
- An `ItemRepository` with zero SQL.
- An `ItemService` that encapsulates list, get-by-id, and create.
- An `ItemController` that exposes `GET /items`, `GET /items/{id}`, and `POST /items`.
- An `ApiExceptionHandler` that returns clean JSON for 404 and 400 errors.
- Two test slices that cover the repository and the web layer independently.

The next step is to swap H2 for a persistent database (PostgreSQL) and deploy the application — that is the Advanced tier.
