module.exports = {
  title: "VitePress",
  description: "Just playing around.",
  cleanUrls: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: 'deep',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '开始',
        link: '/repo/'
      }
    ],
    sidebar: [
      {
        text: 'Start',
        link: '/repo/',
      },
      {
        text: '目录1',
        items: [
          {
            text: '页面1',
            link: '/repo/page1'
          },
          {
            text: '页面2',
            link: '/repo/page2'
          }
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/htnanako/'
      }
    ]
  },
};
