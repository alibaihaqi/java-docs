---
title: Entity and repository
tier: intermediate
platform: java
position: 3
---

# Entity and repository

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Entity and repository

**Goal**

Create the `Item` JPA entity and the `ItemRepository` interface. After this page Hibernate will create an `item` table in H2 on startup and the repository gives you full CRUD access to it.

**Prerequisites**

- [Add JPA and H2](./02-add-jpa-h2.md)

## The `Item` entity

Create `src/main/java/com/example/itemsapi/Item.java`:

```java
package com.example.itemsapi;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

**Key annotations:**

- `@Entity` — tells JPA that this class maps to a database table. Hibernate derives the table name from the class name: `item`.
- `@Id` — marks the primary key field.
- `@GeneratedValue(strategy = GenerationType.IDENTITY)` — tells the database to auto-increment the `id` column. H2 supports this natively.
- `@NotBlank` — a Bean Validation constraint. It rejects `null`, empty strings, and strings that contain only whitespace. Validation is triggered by `@Valid` in the controller (page 05).

We use a plain class with getters and setters rather than a record because JPA requires a no-argument constructor and mutable fields. Spring Boot 3.x uses Jakarta imports (not `javax.persistence`).

## The `ItemRepository` interface

Create `src/main/java/com/example/itemsapi/ItemRepository.java`:

```java
package com.example.itemsapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> { }
```

`JpaRepository<Item, Long>` provides:

| Method | What it does |
|--------|-------------|
| `save(item)` | Insert or update |
| `findAll()` | Return all rows |
| `findById(id)` | Return `Optional<Item>` |
| `deleteById(id)` | Delete by primary key |

You write zero implementation code. Spring Data generates a proxy at startup that implements the interface against your H2 datasource.

## Verify: project compiles

```bash
./mvnw compile
```

Expected output:

```
BUILD SUCCESS
```

Hibernate also logs the DDL it generates at startup (visible with `spring-boot:run`). You will see a `create table item` statement when the app starts — confirming the entity is wired up.

**Next** → [Service layer](./04-service-layer.md)
