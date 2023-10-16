# MVC Application

You can initiate the project through [Spring Initializr](https://start.spring.io/)

![MVC App Spring Initializr](/assets/springboot/mvc-app-init.png)

This application will use:
- Project: `Maven`
- Programming Langauge: `Java`
- Spring Boot: `3.2.0(M3)` -> It's recommended to use stable version, but you still can use `SNAPSHOT` (it's version under development or experimental probably).
- Dependencies:
    - `Spring Web`: to enable build Web, RESTful API, and Apache Tomcat as an default embedded container
    - `Spring Boot DevTools`: to enable hot reload the application without kill the application (you might need some configuration in different text editor)
    - `Spring Boot Starter Test`: to enable integration with Java Test

## First Common APIs

```java [CommonController.java]
package com.alibaihaqi.springboot.mvcapp.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonController {

    @RequestMapping("common")
    @ResponseBody
    public String commonResponse() {
        return "Hello!";
    }
}
```

## Generate simple HTML file
You can use `StringBuffer` to generate the HTML but it really painful by append it `one-by-one`.

```java [CommonController.java]
package com.alibaihaqi.springboot.mvcapp.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommonController {

    @RequestMapping("common")
    @ResponseBody
    public String commonResponse() {
        return "Hello!";
    }

    @RequestMapping("common-html")
    @ResponseBody
    public String commonHtmlResponse() {
        StringBuffer sb = new StringBuffer();
        sb.append("<html>");
        sb.append("<head>");
        sb.append("<title>MVC App</title>");
        sb.append("</head>");
        sb.append("<body>");
        sb.append("<p>My MVC App</p>");
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }

    // We remove @ResponseBody to indicate the Spring Boot
    // that we want to serve other resources, such as JSP file
    // commonJsp will refer as the view name
    @RequestMapping("common-jsp")
    public String commonJspResponse() {
        return "commonJsp";
    }
}
```

## Use Apache Tomcat Embed

By using Apache Tomcat Embed package, you can move your HTML file as an independent page.

You can setup by install the dependency through `pom.xml`
```xml
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>
	<dependency> // [!code ++]
		<groupId>org.apache.tomcat.embed</groupId> // [!code ++]
		<artifactId>tomcat-embed-jasper</artifactId> // [!code ++]
	</dependency> // [!code ++]
</dependencies>
```

