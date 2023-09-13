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

  // head: [
  //   ['link', { rel: 'icon', href: '/java-docs/assets/favicon.ico' }]
  // ],

  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      copyright: 'Copyright © 2023-Present Fadli Al Baihaqi'
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
        text: 'Spring Boot',
        items: [
          { text: 'Getting Started', link: '/spring-boot/' },
          { text: 'First REST API with Spring Boot', link: '/spring-boot/first-rest-api' },
          { text: 'Profiles', link: '/spring-boot/profiles' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
