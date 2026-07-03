---
title: Why a database
tier: intermediate
platform: java
position: 1
---

# Why a database

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Intermediate › Why a database

**Goal**

Understand why the fixed list from the beginner tier is not enough and why Spring Data JPA with an in-memory H2 database is the right next step.

**Prerequisites**

- [Beginner tier — GET /items](../beginner/11-items-endpoint.md)

## The problem with a fixed list

In the beginner tier, `GET /items` returns a hardcoded `List.of(...)`. That works for demonstrating routing and JSON serialization, but it has three hard limits:

1. **No persistence.** Every time the server restarts, the data resets. There is no way to add items that survive a restart.
2. **No mutation.** You cannot add, update, or delete items at runtime. The list is compile-time constant.
3. **No identity.** Items have no stable ID. A `GET /items/{id}` endpoint cannot exist without a way to look up a specific record.

A real API replaces the fixed list with a database. Every item gets a generated primary key, and the four CRUD operations (`POST`, `GET all`, `GET one`, `DELETE`) become natural.

## Why JPA and H2 for this tier

*Spring Data JPA* is Spring's abstraction over the Java Persistence API (JPA), which is itself the standard Java interface to relational databases. It gives you:

- An `@Entity` class that maps directly to a database table.
- A repository interface (`JpaRepository`) that provides `save`, `findAll`, `findById`, `delete`, and more — with no SQL required.
- Automatic schema creation from your entity classes in development mode.

*H2* is a relational database written in Java that runs in the same JVM process as your application. It requires no external installation, no Docker container, and no credentials file. Because it lives in memory (`jdbc:h2:mem:items`), the database starts fresh on every run — which is exactly what you want for learning and for tests.

For production you would swap H2 for PostgreSQL or MySQL by changing a single dependency and a few properties lines. The rest of the code stays the same because the JPA abstraction hides the difference.

## What you will build

Over the next six pages you will add the following to the beginner project:

| Page | What it adds |
|------|-------------|
| 02 | JPA, H2, and Validation dependencies |
| 03 | `Item` entity + `ItemRepository` |
| 04 | `ItemService` + `ItemNotFoundException` |
| 05 | Updated `ItemController` with `GET /items/{id}` and `POST /items` |
| 06 | `ApiExceptionHandler` for 404 and 400 responses |
| 07 | Repository and web layer tests |

The artifact at the end is a running Spring Boot application that persists items in H2 and exposes a validated CRUD API.

**Next** → [Add JPA and H2](./02-add-jpa-h2.md)
