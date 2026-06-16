---
title: GET /items
tier: beginner
platform: java
position: 11
---

# GET /items

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › GET /items

**Goal**

Ship the tier exit artifact: a Spring Boot app with `GET /items` that returns three items as JSON. After this page you will have a buildable, runnable Maven project that answers a `curl` from a second terminal.

**Prerequisites**

- [Returning JSON from a record list](./10-returning-json.md)

## What "done" looks like

A reader on another machine clones the project, runs one command, and `curl http://localhost:8080/items` returns three items as JSON. That is the bar.

We will:

1. Rename `HelloController` to `ItemController` and change the path to `/items`.
2. Move the `Item` record into its own file so the controller is small.
3. Run the build, then run the app, then `curl` it.

## Code

Delete `src/main/java/com/example/itemsapi/HelloController.java`.

Create `src/main/java/com/example/itemsapi/Item.java`:

```java
package com.example.itemsapi;

public record Item(int id, String name) {}
```

Create `src/main/java/com/example/itemsapi/ItemController.java`:

```java
package com.example.itemsapi;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemController {

    @GetMapping("/items")
    public List<Item> items() {
        return List.of(
            new Item(1, "notebook"),
            new Item(2, "pen"),
            new Item(3, "stapler")
        );
    }
}
```

Leave `ItemsApiApplication.java` and `pom.xml` exactly as Spring Initializr generated them.

## Build

From the project root:

```bash
./mvnw clean package
```

Maven downloads dependencies on first run, then compiles, runs the generated test, and packages the app into `target/items-api-0.0.1-SNAPSHOT.jar`. Expected tail:

```
[INFO] BUILD SUCCESS
```

## Run

Two ways. Either works.

The Maven plugin:

```bash
./mvnw spring-boot:run
```

Or the packaged jar:

```bash
java -jar target/items-api-0.0.1-SNAPSHOT.jar
```

Either prints the Spring banner and ends with:

```
Tomcat started on port 8080
Started ItemsApiApplication in 1.234 seconds
```

## Verify

In a second terminal:

```bash
curl http://localhost:8080/items
```

Output:

```
[{"id":1,"name":"notebook"},{"id":2,"name":"pen"},{"id":3,"name":"stapler"}]
```

With headers:

```bash
curl -i http://localhost:8080/items
```

```
HTTP/1.1 200
Content-Type: application/json
...

[{"id":1,"name":"notebook"},{"id":2,"name":"pen"},{"id":3,"name":"stapler"}]
```

Stop the server with `Ctrl-C`. That is the exit artifact.

---

## You finished a beginner tier. What's next?

Two paths from here.

1. **Go deeper on the same platform.** The intermediate tier on this same site teaches you to ship a thing that persists, tests itself, and talks to the world. If you liked beginner, that's the natural next step.
2. **Pick up an adjacent platform.** The table below routes you across platforms based on what you actually want to build.

| You just finished | Natural next platform | Why |
|---|---|---|
| iOS beginner | iOS intermediate, then Android beginner | Stay native, then learn the other mobile platform with a head start on the Compose/SwiftUI mental model. |
| Android beginner | Android intermediate, then Golang beginner | Backend-for-frontend pairs naturally with a mobile client. |
| Golang beginner | AWS beginner, then Golang intermediate | Deploy your endpoint before adding persistence/tests. |
| Java beginner | Java intermediate, then AWS beginner | JVM persistence + validation first, then deploy. |
| AWS beginner | Golang beginner | Have a backend to deploy. AWS without a service to host is reference, not curriculum. |

Or jump back to the [Hub](https://alibaihaqi.github.io/learning-docs/) and pick a different goal.
