---
title: Methods
tier: beginner
platform: java
position: 4
---

# Methods

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Methods

**Goal**

Write a Java method that takes parameters and returns a value. After this page you will be able to read the controller methods on later pages.

**Prerequisites**

- [Classes and primitives](./03-classes-and-primitives.md)

## What a method looks like

A *method* is a named block of code that takes zero or more inputs and returns one value (or nothing, written as `void`). It always lives inside a class.

The shape of a method declaration:

```
<visibility> <return-type> <name>(<parameter list>) { ... }
```

- *Visibility* is `public`, `private`, or omitted. `public` means any other class can call it.
- *Return type* is the type of the value the method gives back. Use `void` if it gives nothing back.
- *Parameter list* is zero or more `Type name` pairs, separated by commas.

The `return` keyword exits the method and hands a value back to the caller. If the return type is `void`, omit the value.

## Code

```java
public class Greeter {
    public static String greet(String name, int year) {
        return "hello " + name + ", year " + year;
    }

    public static void main(String[] args) {
        var message = greet("Aarav", 2026);
        System.out.println(message);
    }
}
```

Run it:

```bash
java Greeter.java
```

Output:

```
hello Aarav, year 2026
```

What changed from the previous page:

- `greet` is a method that takes two parameters and returns a `String`.
- `main` calls `greet` and stores the result in `message`.
- `static` on both methods means they belong to the class itself, not to an instance. That is what lets `main` call `greet` without first creating a `Greeter` object.

**Next** → [Records](./05-records.md)
