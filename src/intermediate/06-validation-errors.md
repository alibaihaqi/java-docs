---
title: Validation and errors
tier: intermediate
platform: java
position: 6
---

# Validation and errors

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Validation and errors

**Goal**

Add an exception handler that maps `ItemNotFoundException` to HTTP 404 and `MethodArgumentNotValidException` to HTTP 400, both with a consistent JSON body. After this page your API returns clean error responses instead of Spring's default HTML error page.

**Prerequisites**

- [Controller CRUD](./05-controller-crud.md)

## Why a dedicated exception handler

When `@Valid` rejects a request body, Spring throws `MethodArgumentNotValidException`. When `ItemService.get` does not find a record, it throws `ItemNotFoundException`. Without a handler, both exceptions bubble up to Spring's default `/error` endpoint, which returns a verbose JSON blob (or HTML, depending on the `Accept` header).

A `@RestControllerAdvice` class intercepts exceptions before they reach the default handler, letting you return exactly the error shape you want.

## `ApiExceptionHandler`

Create `src/main/java/com/example/itemsapi/ApiExceptionHandler.java`:

```java
package com.example.itemsapi;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> notFound(ItemNotFoundException e) {
        return Map.of("error", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> invalid(MethodArgumentNotValidException e) {
        return Map.of("error", "name is required");
    }
}
```

**Key points:**

- `@RestControllerAdvice` — combines `@ControllerAdvice` (applies globally to all controllers) with `@ResponseBody` (return value is serialized to JSON). Spring picks it up automatically because it is a component in the same package.
- `@ExceptionHandler(ItemNotFoundException.class)` — declares that this method handles `ItemNotFoundException`. Spring calls it whenever that exception propagates out of a controller method.
- `@ResponseStatus(HttpStatus.NOT_FOUND)` — sets the HTTP status to 404.
- `Map.of("error", e.getMessage())` — returns `{"error":"item 42 not found"}`. `Map.of` is immutable and Jackson serializes it to JSON automatically.
- The `invalid` handler keeps the error message generic. You could inspect `e.getBindingResult()` to build field-level messages, but a single message is enough for this tier.

## Verify: error responses

Start the app and test both error paths:

```bash
./mvnw spring-boot:run
```

In a second terminal:

```bash
# POST with blank name — expect 400
curl -i -X POST http://localhost:8080/items \
  -H 'Content-Type: application/json' \
  -d '{"name":""}'
```

Expected response:

```
HTTP/1.1 400
{"error":"name is required"}
```

```bash
# GET non-existent id — expect 404
curl -i http://localhost:8080/items/999
```

Expected response:

```
HTTP/1.1 404
{"error":"item 999 not found"}
```

Stop the server with `Ctrl-C`.

**Next** → [Tests](./07-tests.md)
