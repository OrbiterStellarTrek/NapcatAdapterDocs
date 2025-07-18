import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NapcatAdapterDocs",
  description: "一个适配器帮助文档",
  lang: "zh-CN",
  srcDir: './src',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {// https://vitepress.dev/reference/default-theme-config
    footer: {
      message: '空间站「星旅」团队. 加入<a href="https://qm.qq.com/q/WuYpKfgWYw">Napcat-Adapter官方用户群</a>\n<a href="//beian.miit.gov.cn/">沪ICP备2024094132号-8</a>',
      copyright: 'Copyright © 2025 <a href="https://github.com/OrbiterStellarTrek">OrbiterStellarTrek</a>'
    },
    search: {
      provider: 'local'
    },
    logo: "/assets/napcat.png",
    editLink: {
      pattern: 'https://github.com/OrbiterStellarTrek/NapcatAdapterDocs/edit/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一个',
      next: '下一个'
    },
    externalLinkIcon: true,

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
          {
            text: '疑难解答',
            items: [
              { text: '常见问题', link: '/qa/' },
              { text: '关于文件', link: '/qa/file' }
            ]
          }
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
  lastUpdated: true,  
})
