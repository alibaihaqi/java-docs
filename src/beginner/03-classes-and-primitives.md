---
title: Classes and primitives
tier: beginner
platform: java
position: 3
---

# Classes and primitives

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Classes and primitives

**Goal**

Read and run a tiny Java program that uses both a primitive type and an object type. After this page you will know the minimum vocabulary needed to read the code on later pages.

**Prerequisites**

- [JDK 21 installed](./01-install-jdk.md)

## The pieces

A *class* is Java's basic container for code. Every program lives inside at least one class. A class with a `main` method is something you can run.

Java has two kinds of values:

- *Primitives* — `int`, `long`, `double`, `boolean`, `char`. They hold the value directly and have no methods.
- *Objects* — instances of a class. `String` is the one you will use most. Objects have methods you call with a dot: `name.length()`.

`var` is a Java keyword that lets the compiler figure out the type for a local variable. `var name = "Mei";` is the same as `String name = "Mei";`. Use it when the type is obvious from the right-hand side.

For the full language spec, see the [Java 21 tutorial](https://docs.oracle.com/javase/tutorial/java/index.html). We only need the four lines below right now.

## Code

Create a file called `Hello.java`:

```java
public class Hello {
    public static void main(String[] args) {
        int year = 2026;
        var greeting = "hello from Java " + year;
        System.out.println(greeting);
    }
}
```

Run it (JDK 21 lets you run a single `.java` file with no compile step):

```bash
java Hello.java
```

Output:

```
hello from Java 2026
```

What each line does:

- `int year = 2026;` — a primitive integer.
- `var greeting = ...` — the compiler infers `String` because the right-hand side is a string concatenation.
- `System.out.println(...)` — call the `println` method on the `out` field of the `System` class.

**For frontend developers**

`var` here is the *opposite* of JavaScript's `var`: in Java it is a compile-time inference, not a runtime mutable binding. Think TypeScript's local type inference (`let x = 1` infers `number`), not JavaScript's pre-`let` `var`.

**Next** → [Methods](./04-methods.md)
