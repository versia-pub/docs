import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lysand Documentation",
  description: "Documentation for Lysand, a new federated protocol",
  srcDir: 'docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Specification', link: '/spec' },
    ],

    sidebar: [
      {
        text: 'Spec Details',
        items: [
          { text: 'Spec', link: '/spec' },
        ]
      },
      {
        text: "Structures",
        items: [
          { text: "Content Format", link: '/structures/content-format' },
          { text: "Custom Emoji", link: '/structures/custom-emoji' },
          { text: "Collection", link: '/structures/collection' },
        ]
      },
      {
        text: "Cryptography",
        items: [
          { text: "Keys", link: "/cryptography/keys" }
        ]
      },
      {
        text: "Objects",
        link: "/objects",
        items: [
          {
            text: "Publications", link: "/objects/publications", items: [
              { text: "Note", link: "/objects/note" },
              { text: "Patch", link: "objects/patch" },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lysand-org/' }
    ],
    search: {
      provider: "local",
    },
    editLink: {
      pattern: "https://github.com/lysand-org/docs/edit/main/docs/:path"
    },
    logo: "/logo.png",
  },
  lastUpdated: true,
  cleanUrls: true,
  titleTemplate: ":title · Lysand Documentation",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }]
  ],
  lang: 'en-US',
})
