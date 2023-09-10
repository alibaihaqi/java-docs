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
