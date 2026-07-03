---
title: Add JPA and H2
tier: intermediate
platform: java
position: 2
---

# Add JPA and H2

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Add JPA and H2

**Goal**

Add the Spring Data JPA, H2, and Bean Validation dependencies to the beginner project and configure an in-memory datasource. After this page the project compiles with the new dependencies on the classpath.

**Prerequisites**

- [Why a database](./01-why-a-database.md)

## Add three dependencies to `pom.xml`

Open `pom.xml` in the beginner project and add the three blocks below inside the `<dependencies>` section (order inside the section does not matter):

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**What each one does:**

- `spring-boot-starter-data-jpa` — pulls in Hibernate (the JPA implementation), Spring Data JPA repository support, and Spring's transaction management.
- `h2` — the in-memory relational database; `runtime` scope means it is on the classpath at runtime but not needed to compile your own code.
- `spring-boot-starter-validation` — pulls in the Jakarta Bean Validation API and Hibernate Validator so you can use `@NotBlank`, `@Valid`, and related annotations.

All version numbers are managed by the Spring Boot parent POM you already have. You do not need to specify versions.

## Configure the datasource

Open `src/main/resources/application.properties` and add:

```properties
spring.datasource.url=jdbc:h2:mem:items
spring.jpa.hibernate.ddl-auto=update
```

**What each line does:**

- `spring.datasource.url=jdbc:h2:mem:items` — tells Spring Boot to connect to an in-memory H2 database named `items`. The data exists only while the JVM is running. No password or username is needed; H2 defaults to `sa` with no password for in-memory instances.
- `spring.jpa.hibernate.ddl-auto=update` — tells Hibernate to create or update the database schema automatically from your `@Entity` classes on startup. In production you would use `validate` or manage schema separately with a migration tool like Flyway.

## Verify: project compiles

Run:

```bash
./mvnw compile
```

Expected output (last lines):

```
BUILD SUCCESS
```

Maven downloads the new dependencies on the first run. Subsequent runs are fast.

If you see `BUILD FAILURE`, check that you placed the `<dependency>` blocks inside `<dependencies>` and not inside `<dependencyManagement>`.

**Next** → [Entity and repository](./03-entity-repository.md)
