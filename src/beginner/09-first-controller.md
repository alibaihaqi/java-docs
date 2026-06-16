---
title: First controller
tier: beginner
platform: java
position: 9
---

# First controller

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › First controller

**Goal**

Add a single `@RestController` that answers `GET /hello` with a plain string. After this page you will know how to wire one HTTP path to one Java method.

**Prerequisites**

- [Create a Spring Boot project](./08-create-project.md)
- [Methods](./04-methods.md)

## What a controller is

A *controller* in Spring is a class whose methods handle HTTP requests. You mark the class with `@RestController` and each method with a *mapping annotation* (`@GetMapping`, `@PostMapping`, and so on). The annotation tells Spring: when a request comes in for this path and method, call this Java method and send its return value back.

`@RestController` is short for "controller that returns the response body directly." The return value of each method is serialized straight to the response. For text it is sent as plain text; for objects it is sent as JSON (we will see that on the next page).

`@GetMapping("/hello")` binds the method to `GET /hello`. Use `@PostMapping`, `@PutMapping`, `@DeleteMapping` for the other verbs.

For the full set of mapping options, see the [Spring MVC controller reference](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html).

## Code

In the project from the previous page, create a new file:

`src/main/java/com/example/itemsapi/HelloController.java`

```java
package com.example.itemsapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "hello from Spring Boot";
    }
}
```

Two things to notice:

- The package declaration matches the directory: `com.example.itemsapi`. Spring Boot's auto-scan only picks up classes under the package of the main `@SpringBootApplication` class. Putting `HelloController` in a different package would leave it invisible.
- No `main` method here. The `main` lives in `ItemsApiApplication.java` (Initializr generated it). Spring Boot starts the app from there, then finds your `@RestController` classes by scanning.

Run the app:

```bash
./mvnw spring-boot:run
```

In a second terminal:

```bash
curl http://localhost:8080/hello
```

Output:

```
hello from Spring Boot
```

Stop the server with `Ctrl-C`.

**For frontend developers**

`@RestController` plus `@GetMapping("/hello")` is the same pattern as an Express handler `app.get('/hello', (req, res) => res.send('...'))`. The annotation is the registration; the method body is the handler.

**Next** → [Returning JSON from a record list](./10-returning-json.md)
