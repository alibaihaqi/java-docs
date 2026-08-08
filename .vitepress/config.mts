import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/java-docs/',
  cleanUrls: true,
  lang: 'en-US',
  lastUpdated: true,
  srcDir: 'src',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    // fr: {
    //   label: 'French',
    //   lang: 'fr', // optional, will be added  as `lang` attribute on `html` tag
    // }
  },

  title: 'Java Documentation',
  description: 'Java Documentation Collection',

  head: [
    ['link', { rel: 'icon', href: 'https://www.alibaihaqi.com/favicon.ico' }]
  ],

  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Advanced', link: '/advanced/' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      copyright: 'Copyright © 2026 - Present by Fadli Al Baihaqi'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Introduction', link: '/introduction/' },
          { text: 'Getting Started', link: '/introduction/getting-started' }
        ]
      },
      {
        text: 'Beginner',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/beginner/' },
          { text: '01 Install JDK 21', link: '/beginner/01-install-jdk' },
          { text: '02 Install Maven', link: '/beginner/02-install-maven' },
          { text: '03 Classes and primitives', link: '/beginner/03-classes-and-primitives' },
          { text: '04 Methods', link: '/beginner/04-methods' },
          { text: '05 Records', link: '/beginner/05-records' },
          { text: '06 Collections', link: '/beginner/06-collections' },
          { text: '07 What Spring Boot is', link: '/beginner/07-what-is-spring-boot' },
          { text: '08 Create a Spring Boot project', link: '/beginner/08-create-project' },
          { text: '09 First controller', link: '/beginner/09-first-controller' },
          { text: '10 Returning JSON', link: '/beginner/10-returning-json' },
          { text: '11 GET /items', link: '/beginner/11-items-endpoint' }
        ]
      },
      {
        text: 'Intermediate',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/intermediate/' },
          { text: '01 Why a database', link: '/intermediate/01-why-a-database' },
          { text: '02 Add JPA and H2', link: '/intermediate/02-add-jpa-h2' },
          { text: '03 Entity and repository', link: '/intermediate/03-entity-repository' },
          { text: '04 Service layer', link: '/intermediate/04-service-layer' },
          { text: '05 Controller CRUD', link: '/intermediate/05-controller-crud' },
          { text: '06 Validation and errors', link: '/intermediate/06-validation-errors' },
          { text: '07 Tests', link: '/intermediate/07-tests' }
        ]
      },
      {
        text: 'Advanced',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/advanced/' },
          { text: '01 Why PostgreSQL', link: '/advanced/01-why-postgresql' },
          { text: '02 Flyway migrations', link: '/advanced/02-flyway-migrations' },
          { text: '03 Spring Security JWT', link: '/advanced/03-spring-security-jwt' },
          { text: '04 Profiles and configuration', link: '/advanced/04-profiles-config' },
          { text: '05 Docker and docker-compose', link: '/advanced/05-docker-compose' },
          { text: '06 Integration tests with Testcontainers', link: '/advanced/06-testcontainers' },
          { text: '07 OpenAPI documentation', link: '/advanced/07-openapi-docs' },
          { text: '08 Redis caching', link: '/advanced/08-redis-caching' },
          { text: '09 Actuator and health', link: '/advanced/09-actuator-health' },
          { text: '10 CI/CD with GitHub Actions', link: '/advanced/10-ci-cd-github-actions' },
        ]
      },
      {
        text: 'Spring Boot',
        collapsed: true,
        items: [
          { text: 'Profiles and Actuator', link: '/spring-boot/profiles-actuator' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alibaihaqi' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alibaihaqi/' }
    ]
  }
})
