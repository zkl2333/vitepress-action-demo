const base = process.env.BUILD_BASE || "/docs/";

module.exports = {
  title: "VitePress",
  description: "Just playing around.",
  base: base,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'manifest', href: base+'manifest_'+base.replace(/\//g, '')+'.json' }],
    ['link', { rel: 'icon', href: base+'vitepress-logo-mini.svg' }],
    ['meta', { name: 'theme-color', content: '#1e1e20' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:site_name', content: 'VitePress' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['style', {}, `
    :root {
      --vp-c-brand: #10b981;
    }
    `]
  ],
  themeConfig: {
    logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
    search: {
      provider: "local",
    },
    outline: "deep",
    nav: nav(),
    sidebar: sidebarGuide(),
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present · Alano'
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
    { text: "Guide", link: "https://vitepress.dev/guide/markdown" },
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
      text: 'Mbot 插件',
      collapsed: false,
      base: '/mbot/',
      items: [
        { text: '有声书工具箱', link: 'audio_tools/' },
        { text: '每天60秒读懂世界', link: 'daily_news/' },
        { text: 'Plex通知', link: 'plex_notify/' },
        { text: 'Plex工具箱', link: 'plex_tools/' },
      ]
    },
    {
      text: 'NAS',
      collapsed: false,
      base: '/nas/',
      items: [
        { text: '常用 Docker 部署', link: 'docker/' },
        { text: 'Traefik Docker', link: 'traefik_docker/' },
        { text: 'Alist 美化', link: 'alist_diy/' },
        { text: 'Transmission 制作种子', link: 'Transmission制作种子/' },
      ]
    },
    {
      text: '媒体影音',
      collapsed: false,
      base: '/media/',
      items: [
        { text: 'Apple TV Infuse', link: 'infuse/' },
      ]
    },
  ]
}