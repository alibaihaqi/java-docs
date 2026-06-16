---
title: Java Beginner — One Spring REST endpoint
tier: beginner
platform: java
---

# Java Beginner

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner

## What you'll build

A single HTTP endpoint at `GET /items` served by a Spring Boot application. It returns a fixed list of three items as JSON, runs locally on port 8080, and answers a `curl` from a second terminal. No database, no auth, no front end — just a JVM process, an embedded Tomcat, and one controller. Building this is the point of every page in this tier.

## The ladder

1. [01 Install JDK 21](./01-install-jdk.md) — get the JVM toolchain so every later page can run.
2. [02 Install Maven](./02-install-maven.md) — the build tool we use to compile and run the Spring app.
3. [03 Classes and primitives](./03-classes-and-primitives.md) — the minimum vocabulary to read Java code.
4. [04 Methods](./04-methods.md) — Java's reusable unit at this tier.
5. [05 Records](./05-records.md) — modern data classes that will become our response shape.
6. [06 Collections](./06-collections.md) — `List.of(...)` for the fixed data we return.
7. [07 What Spring Boot is](./07-what-is-spring-boot.md) — the framework that does the routing and the Tomcat plumbing.
8. [08 Create a Spring Boot project](./08-create-project.md) — generate the project on Spring Initializr.
9. [09 First controller](./09-first-controller.md) — wire one path to one method with `@RestController`.
10. [10 Returning JSON from a record list](./10-returning-json.md) — return a `List<Record>` and let Spring serialize it.
11. [11 GET /items](./11-items-endpoint.md) — the tier exit artifact.

**Start** → [01 Install JDK 21](./01-install-jdk.md)
