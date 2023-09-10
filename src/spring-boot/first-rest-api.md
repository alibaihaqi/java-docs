# First REST API with Spring Boot

After finish generate your application, you might see the structure of your application similar like this.

![Spring Boot Application](/assets/springboot/application-structure.png)

If you yes, you're good to go to the next step. Well done!

## Generate First GET API

We'll create first **GET API** on this project, with requirements:
- path **"/common"**,
- the response contains 2(two) properties, **success** and **message**

1. Before we jump into generate path, we might need to create 2 classes,
    - CommonController (for the path)
    - Common

- CommonController.java
```java [CommonController.java]
package com.alibaihaqi.springboot.springapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

    /**
     * @return: Common -> { success: boolean, message: string }
     */
    @GetMapping("/common") // Path Implementation
    public Common commonResponse() {
        return new Common(true, "Success from common controller Java!");
    }
}
```

- Common.java
```java [Common.java]
package com.alibaihaqi.springboot.springapp;

public class Common {
    private Boolean success;
    private String message;

    public Common(Boolean success, String message) {
        super();
        this.success = success;
        this.message = message;
    }

    @Override
    public String toString() {
        return "Common{" +
                "success=" + success +
                ", message='" + message + '\'' +
                '}';
    }

    public Boolean getSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
```