---
title: Returning JSON from a record list
tier: beginner
platform: java
position: 10
---

# Returning JSON from a record list

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Returning JSON from a record list

**Goal**

Change the controller's return type from `String` to `List<Item>` and watch Spring Boot serialize it to JSON. After this page you will understand how the exit endpoint produces its response body.

**Prerequisites**

- [Records](./05-records.md)
- [Collections](./06-collections.md)
- [First controller](./09-first-controller.md)

## How Spring Boot serializes JSON

When a `@RestController` method returns an object (anything other than a `String`), Spring Boot hands the object to *Jackson* — the JSON library bundled with `spring-boot-starter-web`. Jackson reflects over the object's fields and writes them as a JSON document.

For a record, Jackson uses the record's accessors. `Item(int id, String name)` serializes to `{"id": 1, "name": "notebook"}` with no extra annotations or configuration.

A `List<Item>` serializes to a JSON array of those objects.

You do not write the serializer. You do not register a converter. You return the object; Jackson writes JSON.

For the full Jackson configuration surface, see the [Spring Boot JSON section](https://docs.spring.io/spring-boot/reference/features/json.html).

## Code

Replace the contents of `HelloController.java` with this version (we will rename it on the next page; for now it stays as `HelloController`):

```java
package com.example.itemsapi;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    record Item(int id, String name) {}

    @GetMapping("/hello")
    public List<Item> hello() {
        return List.of(
            new Item(1, "notebook"),
            new Item(2, "pen"),
            new Item(3, "stapler")
        );
    }
}
```

Restart the app:

```bash
./mvnw spring-boot:run
```

In a second terminal:

```bash
curl http://localhost:8080/hello
```

Output:

```
[{"id":1,"name":"notebook"},{"id":2,"name":"pen"},{"id":3,"name":"stapler"}]
```

Add `-i` to inspect the headers:

```bash
curl -i http://localhost:8080/hello
```

```
HTTP/1.1 200
Content-Type: application/json
...

[{"id":1,"name":"notebook"},{"id":2,"name":"pen"},{"id":3,"name":"stapler"}]
```

`Content-Type: application/json` is set automatically because the return type is not a `String`.

Stop the server with `Ctrl-C`.

**Next** → [GET /items](./11-items-endpoint.md)
