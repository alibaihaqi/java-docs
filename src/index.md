---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Java Documentation"
  tagline: Develop your Java project
  actions:
    - theme: brand
      text: Introduction
      link: /introduction/
    - theme: alt
      text: Getting Started
      link: /introduction/getting-started

features:
  - title: Spring Boot
    details: Build Java Application with Spring Boot
    link: /spring-boot/
#   - title: Nest JS
#     details: Build your backend using Nest JS
#     link: /nestjs/
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-name-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
}
</style>