---
title: Records
tier: beginner
platform: java
position: 5
---

# Records

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Records

**Goal**

Declare a Java *record* and instantiate it. After this page you will know how to define the response shape our controller will return.

**Prerequisites**

- [Methods](./04-methods.md)

## What a record is

A *record* is a class whose only job is to hold a fixed set of fields. You declare the fields once in the header and Java generates the constructor, the field accessors, `equals`, `hashCode`, and `toString` for you.

Before records (Java 14 and earlier), the same data class required a constructor, two getters, an `equals`, a `hashCode`, and a `toString` — often 40+ lines for a 2-field class. A record collapses that to one line.

We use records here because the JSON we return on the exit page maps directly to record fields: one record, one JSON object, no boilerplate.

For the full feature spec, see the [JEP 395 — Records](https://openjdk.org/jeps/395). For this tier we only need the single-line form below.

## Code

```java
public class Items {
    record Item(int id, String name) {}

    public static void main(String[] args) {
        var first = new Item(1, "notebook");
        System.out.println(first);
        System.out.println("id=" + first.id() + " name=" + first.name());
    }
}
```

Run it:

```bash
java Items.java
```

Output:

```
Item[id=1, name=notebook]
id=1 name=notebook
```

What to notice:

- The record header `Item(int id, String name)` declares two fields. That is the whole class body — the `{}` is empty.
- `new Item(1, "notebook")` calls the auto-generated constructor.
- `first.id()` and `first.name()` are the auto-generated accessors. They are *not* `getId()` and `getName()` — records drop the `get` prefix.
- The auto-generated `toString` prints `Item[id=1, name=notebook]`.

**For frontend developers**

A record is the Java equivalent of a TypeScript `type Item = { id: number; name: string }` plus a constructor — a data shape with no behavior. You will use it the same way: to describe what a function returns.

**Next** → [Collections](./06-collections.md)
