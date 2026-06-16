---
title: Install JDK 21
tier: beginner
platform: java
position: 1
---

# Install JDK 21

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Install JDK 21

**Goal**

Install the Java Development Kit version 21. After this page you will have a working `java` and `javac` on your `PATH`.

**Prerequisites**

- None. This is the first page of the Beginner tier.

## What the JDK is

The *JDK* (Java Development Kit) is two things in one: the *JVM* (Java Virtual Machine — the runtime that executes Java programs) and the *compiler* (`javac`, which turns `.java` source files into `.class` bytecode).

We pin to JDK 21 because it is the current long-term support release. Spring Boot 3.4 supports it cleanly. Older JDKs still work but the language features in this tier (records, `var`) need at least 17.

There are several distributions of the JDK. They are all the same Java — different packagers. Pick one:

- **Temurin** from Eclipse Adoptium — the default for most developers.
- **Microsoft Build of OpenJDK** — if you live in the Microsoft ecosystem.
- **Amazon Corretto** — if you deploy on AWS.

For everything else about distributions, see the [Adoptium FAQ](https://adoptium.net/docs/faq/).

## Install

On macOS with Homebrew:

```bash
brew install --cask temurin@21
```

On Ubuntu / Debian:

```bash
sudo apt update
sudo apt install -y temurin-21-jdk
```

If `apt` does not know about `temurin-21-jdk`, follow the [Adoptium apt instructions](https://adoptium.net/installation/linux/) to add their repo first.

On Windows, download the MSI installer from [adoptium.net](https://adoptium.net/temurin/releases/?version=21) and run it.

## Verify

```bash
java -version
```

Expected output (vendor string may differ):

```
openjdk version "21.0.5" 2024-10-15 LTS
OpenJDK Runtime Environment Temurin-21.0.5+11 (build 21.0.5+11-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.5+11 (build 21.0.5+11-LTS, mixed mode, sharing)
```

The first line must say `21`. If it says `17`, `11`, or `1.8`, an older JDK is shadowing 21 on your `PATH` — fix that before moving on.

```bash
javac -version
```

```
javac 21.0.5
```

**Next** → [Install Maven](./02-install-maven.md)
