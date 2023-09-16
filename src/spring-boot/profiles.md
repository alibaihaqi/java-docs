# Profiles

## Managing Application with Profiles

- For example, you want to set different log level in Development and Production Environments.

| Log Level Spring Framework | Description                                                        |
|:--------------------------:|--------------------------------------------------------------------|
|            trace           | more detailed information about the flow of the system             |
|            debug           | Information about the flow of the system                           |
|            info            | events occurring at the run time                                   |
|           warning          | warning for the errors caused due to the usage of deprecated APIs. |
|            error           | runtime errors                                                     |
|             off            | turn off the log                                                   |

- For example, you have 2 environments, `dev` and `prod`. Then, you can create 2 (two) properties. `application-dev.properties` and `application-prod.properties`

::: code-group
```properties [application-dev.properties]
logging.level.org.springframework=trace
```

```properties [application-prod.properties]
logging.level.org.springframework=info
```

```properties [application.properties]
spring.profiles.active=dev // or prod or other environments
```
:::

```java [NestAppConfigurationController]
package com.alibaihaqi.springboot.springapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//nestapp-service.url=
@RestController
public class NestAppConfigurationController {

    @Autowired
    private NestAppConfiguration configuration;

    /**
     * @return: NestAppConfiguration -> { url: string }
     */
    @GetMapping("/nestapp-configuration") // Path Implementation
    public NestAppConfiguration nestappcConfigurationResponse() {
        return new NestAppConfiguration();
    }
}
```