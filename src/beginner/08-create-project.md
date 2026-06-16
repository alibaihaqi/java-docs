---
title: Create a Spring Boot project
tier: beginner
platform: java
position: 8
---

# Create a Spring Boot project

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Create a Spring Boot project

**Goal**

Generate a Spring Boot project with Spring Initializr and run it once before adding any code. After this page you will have a working `items-api` directory you can start the app from.

**Prerequisites**

- [JDK 21 installed](./01-install-jdk.md)
- [Maven installed](./02-install-maven.md)
- [What Spring Boot is](./07-what-is-spring-boot.md)

## Use Spring Initializr

*Spring Initializr* is a web form at [start.spring.io](https://start.spring.io/) that hands you a zipped, ready-to-build Spring Boot project. We could generate the same `pom.xml` by hand, but Initializr is the source of truth — use it.

Open [start.spring.io](https://start.spring.io/) and set:

- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.4.x (the highest 3.4 release shown — do not pick a `SNAPSHOT`; those are unreleased builds)
- **Group**: `com.example`
- **Artifact**: `items-api`
- **Name**: `items-api`
- **Package name**: `com.example.itemsapi`
- **Packaging**: Jar
- **Java**: 21
- **Dependencies**: click `ADD DEPENDENCIES` and add **Spring Web**

Click `GENERATE`. A file called `items-api.zip` downloads.

## Unzip and run

```bash
unzip items-api.zip
cd items-api
```

The structure Maven expects:

```
items-api/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── src/
    ├── main/
    │   ├── java/com/example/itemsapi/ItemsApiApplication.java
    │   └── resources/application.properties
    └── test/
        └── java/com/example/itemsapi/ItemsApiApplicationTests.java
```

`mvnw` is the *Maven wrapper* — a script that downloads the right Maven version for this project on first run. Use it instead of the system `mvn` so the build is reproducible.

Start the app:

```bash
./mvnw spring-boot:run
```

Expected output (trimmed):

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.4.0)

... Tomcat started on port 8080 (http) with context path '/'
... Started ItemsApiApplication in 1.234 seconds
```

In a second terminal, confirm the server is up:

```bash
curl -i http://localhost:8080/
```

```
HTTP/1.1 404
```

A 404 is the right answer here — the app is running, but you have not registered any handlers yet. That is the next page.

Stop the server with `Ctrl-C`.

**Next** → [First controller](./09-first-controller.md)
