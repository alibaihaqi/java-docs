---
title: What Spring Boot is
tier: beginner
platform: java
position: 7
---

# What Spring Boot is

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › What Spring Boot is

**Goal**

Understand what Spring Boot adds on top of plain Java. After this page you will know what `@SpringBootApplication` and "embedded Tomcat" mean before you see them in code.

**Prerequisites**

- [Collections](./06-collections.md)

## The two parts: Spring and Spring Boot

*Spring* is a Java framework. It does dependency injection, web request routing, database access, and a long list of other things. A bare Spring application before 2014 required you to wire up a servlet container, write `web.xml`, configure a `DispatcherServlet`, and curate every dependency version yourself.

*Spring Boot* is a layer on top of Spring that removes that ceremony. It gives you three things:

1. **Auto-configuration.** It looks at the libraries on your classpath and configures sensible defaults. Add a web library — you get a web server. Add a database library — you get a connection pool.
2. **Starter dependencies.** Pre-curated dependency bundles. `spring-boot-starter-web` pulls in Spring MVC, Jackson (for JSON), and an embedded Tomcat in one line.
3. **Embedded Tomcat.** Your app *contains* the web server. You do not deploy a `.war` file into Tomcat — you run `java -jar app.jar` and your app listens on port 8080.

`@SpringBootApplication` is the single annotation that turns a plain class with a `main` method into a Spring Boot application. It tells Spring Boot: "scan this package for components, auto-configure everything, and start the embedded server."

For the framework's full reach, see the [Spring Boot reference](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/). For this tier we only use `@SpringBootApplication`, `@RestController`, and `@GetMapping`.

## What "auto-configuration" means in practice

When you add `spring-boot-starter-web` to your `pom.xml` and start the app, Spring Boot:

- Detects Tomcat on the classpath.
- Starts it on port 8080.
- Wires Spring MVC to dispatch HTTP requests to your `@RestController` classes.
- Wires Jackson to convert your return values to JSON.

You write zero configuration code for any of that. You write only the parts that are specific to your app — the controllers and the data.

We will see the controller on page 9, and Spring Boot will quietly handle every step above.

**Next** → [Create a Spring Boot project](./08-create-project.md)
