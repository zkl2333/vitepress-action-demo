const base = process.env.BUILD_BASE || "/docs/";

module.exports = {
  lang: 'zh_CN',
  title: "VitePress",
  description: "Just playing around.",
  base: base,
  cleanUrls: true,
  lastUpdated: true, // 上次更新时间
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'manifest', href: base+'manifest_'+base.replace(/\//g, '')+'.json' }],
    ['link', { rel: 'icon', href: base+'vitepress-logo-mini.svg' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:site_name', content: 'VitePress' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    // ['style', {}, `
    // :root {
    //   --vp-c-brand: #10b981;
    //   --vp-c-text-code: #34cb94;
    //   --vp-c-mute: #2e2e2e;
    //   --vp-button-brand-bg: #059669;
    //   --vp-button-brand-hover-bg: #047857;
    //   --vp-button-brand-hover-border: #059669;
    //   --vp-button-brand-active-bg: #047051;
    //   --vp-button-brand-active-border: #34d399;
    // }
    // `]
  ],
  themeConfig: {
    siteTitle: '文档库',
    lastUpdated: {
      text: '更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
    search: {
      provider: "local",
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '所有文章',
    outline: {
      level: "deep",
      label: '本文目录'  // 自定义 "On this page" 为 "本文目录"
    },
    nav: nav(),
    sidebar: sidebarGuide(),
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present'
    },
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Alano-i?tab=repositories",
      },
    ],
  },
};

function nav() {
  return [
    { text: "首页", link: "/" },
    { text: "文档", link: "/contents/" },
    { text: "Guide",
      items: [
        { text: 'VitePress 中文网', link: 'https://vitejs.cn/vitepress/guide/markdown.html' },
        { text: '官方文档', link: 'https://vitepress.dev/guide/markdown' },
      ]
    },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '目录',
      base: '/contents',
      link: '/'
    },
    {
      text: '分类1',
      collapsed: false,
      base: '/分类1/',
      items: [
        { text: '页面1', link: '页面1/' },
        { text: '页面2', link: '页面2/' },
        { text: '页面3', link: '页面3/' },

      ]
    },
    {
      text: '分类2',
      collapsed: false,
      base: '/分类2/',
      items: [
        { text: '页面1', link: '页面1/' },
        { text: '页面2', link: '页面2/' },
        { text: '页面3', link: '页面3/' },

      ]
    },
    {
      text: '分类3',
      collapsed: false,
      base: '/分类3/',
      items: [
        { text: '页面1', link: '页面1/' },
        { text: '页面2', link: '页面2/' },
        { text: '页面3', link: '页面3/' },

      ]
    },
  ]
}