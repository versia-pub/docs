import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lysand Documentation",
  description: "Documentation for Lysand, a new federated protocol",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specification', link: '/spec' }
    ],

    sidebar: [
      {
        text: 'Spec Details',
        items: [
          { text: 'Spec', link: '/spec' },
          { text: "Objects", link: '/objects' },
        ]
      },
      {
        text: "Structures",
        items: [
          { text: "Content Format", link: '/structures/content-format' },
          { text: "Custom Emoji", link: '/structures/custom-emoji' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lysand-org/' }
    ]
  }
})
