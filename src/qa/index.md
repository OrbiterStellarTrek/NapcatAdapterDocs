# 常见问题与解答

## 在一切开始之前...

为了更快地定位并解决你的问题，请先按照如下操作进行：

1. 阅读[快速开始](../get-started.md)，并保存所有的配置文件，确保Napcat-Adapter已是最新，重启Yunzai和Napcat再次尝试问题是否出现。有可能你只是没有看全教程，或者配置没有保存导致插件读取不到配置导致错误。

2. 阅读下面的常见问题与解答，确保你遇到的问题没有被说明。

3. 阅读[issue](https://gitee.com/qiannqq/napcat-adapter/issues?q=is%3Aall)，查看是否有人和你有同样的问题。

4. 如果以上步骤都不能解决，请带上报错日志和报错聊天截图，确保涉及插件已是最新，然后[提出issue](https://gitee.com/qiannqq/napcat-adapter/issues/new/choose)或者去[官方群聊](https://qm.qq.com/q/WuYpKfgWYw)寻求帮助。

:::details 【提问速通】
如果你想获得最快最优解决方案   
请确保：
1. 提问时请带上报错日志和报错聊天截图
2. 请确保涉及插件/Napcat-Adapter已是最新（使用指令：`#nc更新`）
3. 请确保提问时带上相关截图（例如访问不了请提供浏览器访问时的截图）
4. 请确保避免无用提问（“我这个到底怎么解决？”“怎么办？”），请这样提问：“我想要xxx，但是这个功能产生了这样的报错（附上日志截图和聊天截图）”   
⚠️请你记住，没有任何人有义务为你免费解答
:::

>在提问之前，可以阅读[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/#%E5%BD%93%E4%BD%A0%E6%8F%90%E9%97%AE%E6%97%B6)，知晓高效的提问方法。

> **Troubleshooting any problem without the error log is like driving with your eyes closed.**
>
> 在没有错误日志的情况下诊断任何问题无异于闭眼开车
>
> — *Apache 官方文档 Getting Started 篇章*

## [关于文件](file)

## 问： 适配器日志只提示初始化，没有连接（或者断断续续的连接）

答：请依次检查：

1. NapCat和适配器都在工作，且NapCat启用了一个WebSocket服务器。（ **不是HTTP服务器** ）
2. 适配器设置的地址可以匹配上NapCat WebSocket服务器配置的地址和端口。
3. 适配器的配置文件和WebSocket服务器配置是否有一方没有设置token/token不一致。

（如果地址匹配上了但是还是连接不了，请检查NapCat和适配器是否在同一个网络环境，如果不是，请参阅[快速开始](../get-started)配置适配器的部分）


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

对于不是按照特定方法发送的转发消息，第二层必定打不开，icqqjs也存在该问题，暂无解决方案。

## 问： 为什么接入多个 Bot 后，群内两个 Bot 账号通常只有一个会响应？并且响应的账号随机

答： 这源于 Miao-Yunzai 的消息去重机制。该机制会将用户 QQ 号和原始消息 (raw_msg) 组合生成一个唯一标识（例如 "123456789:#帮助"），并在随后的 200 毫秒内忽略相同的标识。因此，当多个 Bot 几乎同时收到完全相同的消息时，只有最先接收到消息的 Bot 会响应，其他 Bot 会因标识重复而被过滤掉。

（TRSS-Yunzai对此机制进行了改进，因此不存在该问题。）

## 问： Napcat-Adapter（本适配器）可以连接其他协议端吗？比如LLOneBot、Lgr

答： Napcat-Adapter（本适配器）使用node-napcat-ts作为连接Napcat的方式，并且基于Napcat进行高度兼容，因此无法连接除Napcat外的任何协议端，即便其是`OneBotv11`协议。
