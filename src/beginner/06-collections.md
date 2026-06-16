---
title: Collections
tier: beginner
platform: java
position: 6
---

# Collections

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Collections

**Goal**

Build an immutable `List` of records with `List.of(...)` and iterate it. After this page you will have the exact data shape the exit endpoint returns.

**Prerequisites**

- [Records](./05-records.md)

## What a list is

A `List<T>` is an ordered collection of values of type `T`. The angle brackets are *generics* — they tell the compiler what the list holds. A `List<Item>` holds `Item` records and nothing else.

`List.of(a, b, c)` is the shortest way to build a list in modern Java. The list it returns is *immutable* — you cannot add to it, remove from it, or replace elements. For a fixed response payload that is what we want.

For mutable lists (where the contents change at runtime), Java uses `ArrayList`. We do not need it at this tier. For the full collections framework, see the [Java Collections overview](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/package-summary.html).

## Code

```java
import java.util.List;

public class ItemList {
    record Item(int id, String name) {}

    public static void main(String[] args) {
        List<Item> items = List.of(
            new Item(1, "notebook"),
            new Item(2, "pen"),
            new Item(3, "stapler")
        );

        for (var item : items) {
            System.out.println(item.id() + ": " + item.name());
        }
    }
}
```

Run it:

```bash
java ItemList.java
```

Output:

```
1: notebook
2: pen
3: stapler
```

What is new:

- `import java.util.List;` — pulls `List` into scope. Records and `var` are in the default scope, but `List` is not.
- `List<Item>` — a list whose elements are `Item` records.
- `for (var item : items)` — the *enhanced for loop*. It walks every element of the list in order.

This is the data the exit endpoint will return as JSON.

**Next** → [What Spring Boot is](./07-what-is-spring-boot.md)
