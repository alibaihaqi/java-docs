---
title: Install Maven
tier: beginner
platform: java
position: 2
---

# Install Maven

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Beginner › Install Maven

**Goal**

Install Apache Maven and verify it can find your JDK. After this page you will be able to run `mvn -v` and see Maven 3.9 plus your JDK 21.

**Prerequisites**

- [JDK 21 installed](./01-install-jdk.md)

## What Maven is

*Maven* is Java's standard build tool. It does three jobs:

1. Downloads the libraries your project depends on (it calls them *dependencies*).
2. Compiles your `.java` files into `.class` files.
3. Packages the result into a runnable artifact (a `.jar`).

A Maven project is defined by one file at its root: `pom.xml`. *POM* stands for Project Object Model. It lists the project's name, version, JDK level, and dependencies. We will not write one by hand — Spring Initializr will hand us one on a later page.

Maven is not the only option. Gradle is the other common Java build tool. We pick Maven here because Spring's documentation defaults to it and the generated `pom.xml` reads top-to-bottom without DSL knowledge. For the rest of this tier we will only use Maven.

## Install

On macOS with Homebrew:

```bash
brew install maven
```

On Ubuntu / Debian:

```bash
sudo apt update
sudo apt install -y maven
```

On Windows, download the binary zip from [maven.apache.org](https://maven.apache.org/download.cgi), unzip it, and add the `bin/` directory to your `PATH`. The [official install steps](https://maven.apache.org/install.html) cover the details.

## Verify

```bash
mvn -v
```

Expected output (paths will differ):

```
Apache Maven 3.9.9
Maven home: /opt/homebrew/Cellar/maven/3.9.9/libexec
Java version: 21.0.5, vendor: Eclipse Adoptium
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "14.6", arch: "aarch64"
```

The line that matters is `Java version: 21.x`. If Maven reports a different JDK, your `JAVA_HOME` is pointing at an old install — set it to your JDK 21 path before continuing.

**Next** → [Classes and primitives](./03-classes-and-primitives.md)
