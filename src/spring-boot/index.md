# General Information

I still new Java programming languages, and I found nice course you might want to look.

Udemy Course: [Learn Spring Boot 3 in 100 Steps - No 1 Java Framework](https://www.udemy.com/course/spring-boot-tutorial-for-beginners/)

## Getting Started with Spring Boot
- **WHY** Spring Boot?
- **WHAT** are the goals of Spring Boot?
- **HOW** does Spring Boot work?
- **COMPARE** Spring Boot vs Spring MVC vs Spring?

::: tip
- Setting up Spring Projects **before Spring Boot was NOT easy!**
:::

[Generate Your Project](https://start.spring.io/)

::: tip
**SNAPSHOT** version are version under development.
:::

---

Before the Spring Boot launched, several obstacles that you might find during your develoment:

1. Dependency Management (**pom.xml**)
    - Manage frameworks and versions
      - **REST API** - Spring frameworks, Spring MVC framework, etc.
      - **Unit Test** - Spring Test, Mockito, JUnit, etc.
2. Define Web App Configuration(**web.xml**)
    - example: Configure **DispatcherServlet** for Spring MVC
3. Spring Configuration (**context.xml**)
    - Define **Spring Configuration**
      - Component Scan
      - View Resolver
4. NFRs (Non-Functional Requirements)
    - Logging
    - Error Handling
    - Monitoring

## Spring Boot Starter Projects
- **Web Application & REST API** - Spring Boot Starter Web (spring-webmvc, spring-web, spring-boot-starter-tomcat, spring-boot-starter-json)
- **Unit Test** - Spring Boot Starter Test
- **Talk to database using JPA** - Spring Boot Starter Data JPA
- **Talk to database using JDBC** - Spring Boot Starter JDBC
- **Secure web application or REST API** - Spring Boot Starter Security

## Debug

- To enable debug in Spring Boot, you can add value on `application.properties` - **src/main/resources/application.properties**

```properties
logging.level.org.springframework=debug
```

## Devtools

- Add **spring-boot-devtools** in pom.xml

```xml [pom.xml]
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>

    <dependency> // [!code ++]
		<groupId>org.springframework.boot</groupId>  // [!code ++]
		<artifactId>spring-boot-devtools</artifactId>  // [!code ++]
	</dependency>  // [!code ++]

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
```

- For IntelliJ IDEA, you need to checked the `Build Project Automatically` in `IntelliJ IDEA -> Setting -> Build, Execution, Deployment -> Compiler`.

![Enable Autobuild in IntelliJ](/assets/springboot/enable-autobuild-intellij.png)

- For IntelliJ IDEA, you need to checked the `Allow auto-make to start even...` in `IntelliJ IDEA -> Setting -> Advanced Settings`

![Enable Automake in Development](/assets/springboot/enable-automake-development.png)

### Advantage of using Spring Boot Dev Tools
- Increase developer productivity
- For `pom.xml` dependency changes, need to stop your server **manually**
