const base = process.env.BUILD_BASE || "/";

module.exports = {
  title: "VitePress",
  description: "Just playing around.",
  base: base,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/vitepress-logo-mini.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'VitePress' }],
  ],
  themeConfig: {
    logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        indexName: 'vitepress'
      }
    },
    outline: "deep",
    nav: nav(),
    sidebar: {
      '/repo/': { base: '/repo/', items: sidebarGuide() },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/htnanako/",
      },
    ],
  },
};

function nav() {
  return [
    {
      text: 'Guide',
      link: '/repo/',
      activeMatch: '/repo/'
    },
    {
      text: 'Google',
      link: 'http://www.google.com'
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: '标题1',
      collapsed: false,
      items: [
        { text: 'page1', link: 'page1' },
      ]
    },
    {
      text: '标题2',
      collapsed: true,
      items: [
        { text: 'page2', link: 'page2' },
        { text: 'page3', link: 'page3' }
      ]
    }
  ]
}