import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { 
    plugins: [
      MermaidPlugin(),
      groupIconVitePlugin({ 
        customIcon: {
          github: localIconLoader(import.meta.url, '../src/public/svg/github.svg'),
          gitee: localIconLoader(import.meta.url, '../src/public/svg/gitee.svg'),
        },
      })
    ],
    optimizeDeps: {
      exclude: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
      ],
      include: ['mermaid'],
    },
    ssr: { 
      noExternal: [ 
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        "@nolebase/ui-asciinema", 
        '@nolebase/ui', 
        'mermaid', 
      ], 
    }, 
  }, 
  title: "NCAPDoc",
  description: "一个适配器帮助文档",
  lang: "zh-CN",
  srcDir: './src',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'msvalidate.01', content: '8A4F74DD3B2D169303381C3296AA70B0' }], // Bing <meta name="msvalidate.01" content="8A4F74DD3B2D169303381C3296AA70B0" />
  ],
  themeConfig: {// https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    logo: "/image/napcat.png",
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
    outline: {
      level: [2,4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },

    nav: [
      { text: '主页', link: '/' },
      { text: '安装与配置', link: '/install' },
      { text: '疑难解答', link: '/qa' }
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '介绍', link: '/introduction' }
        ]
      },
      {
        text: '教程',
        items: [
          { text: '安装与配置', link: '/install' }
        ]
      },
      {
        text: '有问题？',
        items: [
          { text: '常见问题', link: '/qa/' },
          {
            text: '疑难解答',
            items: [
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
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '更多'
    },
    config(md) {
      md.use(MermaidMarkdown);
      md.use(markdownItTaskCheckbox); //todo
      md.use(groupIconMdPlugin) //代码组图标
    },
  },
  sitemap: {
    hostname: 'https://nca.yilx.cc/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },
  lastUpdated: true,
})
