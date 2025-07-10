import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NapcatAdapterDocs",
  description: "一个适配器帮助文档",
  lang: "zh-CN",
  head: [
    [
      'link',{ rel: 'icon', href: '/assets/napcat.png' }
    ]
  ],
  themeConfig: {
    footer: {
      message: 'Pages by <a href="https://github.com/vuejs/vitepress">Vitepress</a>.',
      copyright: 'Copyright © 2025 <a href="https://github.com/OrbiterStellarTrek">OrbiterStellarTrek</a>'
    },
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '快速开始', link: '/get-started' },
      { text: '疑难解答', link: '/qa' }
    ],

    sidebar: [
      {
        text: '教程',
        items: [
          { text: '快速开始', link: '/get-started' },
          { text: '疑难解答', link: '/qa' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qiannqq/napcat-adapter' }
    ]
  },
  markdown: {
      container: {
        tipLabel: '💡提示',
        warningLabel: '⚠️警告',
        dangerLabel: '❗危险',
        infoLabel: '💡信息',
        detailsLabel: '💡更多'
      }
  },
  lastUpdated: true  
})
