# 常见问题与解答

## 在一切开始之前...

在你向任何人寻求帮助之前：

1. 请先阅读[快速开始](../get-started.md)，并保存所有的配置文件。有可能你只是没有看全教程，或者配置没有保存导致插件读取不到配置导致错误。（有真实案例）

2. 阅读下面的常见问题与解答，确保你遇到的问题没有被说明。

3. 如果不能解决，请带上报错日志和报错聊天截图，确保涉及插件/Napcat-Adapter已是最新，然后提出[issue](https://gitee.com/qiannqq/napcat-adapter/issues/new/choose)或者去[官方群聊](https://qm.qq.com/q/WuYpKfgWYw)寻求帮助。

> **Troubleshooting any problem without the error log is like driving with your eyes closed.**
>
> 在没有错误日志的情况下诊断任何问题无异于闭眼开车
>
> — *Apache 官方文档 Getting Started 篇章*

## 关于文件

:::tip
（目前已有解决方案，请等待后续更新）
:::

* WebSocket 支持小文件（图片、视频、音频、文件等任何形式的数据）传输，但单帧最大为 16MB，因此文件传输大小被限制为 10MB。超过 10MB 的文件将调用Bot.uploadFile尝试上传并获取URL，若Bot.uploadFile不存在则直接让 NapCat 读取本地文件。
* 如果有大文件传输需求，请确保 NapCat.OneBot 可以访问 Yunzai 的目录，因使用绝对路径，需让 NapCat.OneBot 访问的路径与真实路径一致。   


更多请访问[关于文件](file)

## 问： 适配器日志只提示初始化，没有连接（或者断断续续的连接）

答：请依次检查：

1. NapCat和适配器都在工作，适配器启用了一个WebSocket服务器（不是HTTP服务器）
2. 适配器设置的地址可以匹配上NapCat WebSocket服务器配置的地址和端口
3. 适配器的配置文件和WebSocket服务器配置是否有一方没有设置token/token不一致。

（如果地址匹配上了但是还是连接不了，请检查NapCat和适配器是否在同一个网络环境，如果不是，请参阅[快速开始](../get-started.md)的NapCat的配置部分）


## 问： 我的插件/Bot 日志出现以下报错，怎么办？

```
[MiaoYz][xx:xx:xx.xxx][ERRO] ApiRejection {
    code: XX,
    message: 'client not online'
}
```

答： 若报错信息包含 “`client not online`”，请更新适配器：`#nc更新`

## 问： 如何连接多个 NapCat？   
答： 在锅巴的插件配置中打开“多Bot”选项，然后在下方的“Bot连接列表”手动添加多个Napcat即可。

~~（如果你会编辑JSON可以编辑config/config/botlist.json的文件）~~

## 问： 嵌套转发中第二层消息打不开，显示加载失败？

<div>
  <img src="/assets/qiantao.png" width="30%" class="dark-image">
  <img src="/assets/qiantao-white.jpg" width="30%" class="light-image">
</div>

答：在9.1.67(不含)之后的版本，QQ采用了新的聊天记录加载机制。

对于不是按照特定方法发送的转发消息，第二层必定打不开，icqqjs也存在该问题，需要等待Napcat.OneBot修复。