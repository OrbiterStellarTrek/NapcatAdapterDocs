# 常见问题与解答

## 在一切开始之前...

为了更快地定位并解决你的问题，请先按照如下操作进行：

1. 阅读[安装与配置](../install)并确保自己已经按照指示操作，保存所有的配置文件，确保Napcat-Adapter已是最新<Tooltip>使用指令：#nc更新</Tooltip>，重启Yunzai和Napcat再次尝试问题是否出现。有可能你只是没有看全教程，或者配置没有保存导致插件读取不到配置导致错误。

2. 阅读下面的常见问题与解答，确保你遇到的问题没有被说明。

3. 阅读[issue](https://gitee.com/qiannqq/napcat-adapter/issues?q=is%3Aall)，查看是否有人和你有同样的问题。

4. 如果以上步骤都不能解决，请带上报错日志和报错聊天截图，确保涉及插件已是最新，然后[提出issue](https://gitee.com/qiannqq/napcat-adapter/issues/new/choose)或者去[官方群聊](https://qm.qq.com/q/WuYpKfgWYw)<Tooltip>注意这是Napcat-Adapter的用户群而并非其他插件用户群</Tooltip>寻求帮助。

:::details 【提问速通】

如果你想获得最快最优解决方案

请确保：
1. 提问时请带上报错日志和报错聊天截图
2. 请确保涉及插件/Napcat/Napcat-Adapter<Tooltip>使用指令：#nc更新</Tooltip>已是最新
3. 请确保提问时带上相关截图（例如访问不了请提供浏览器访问时的截图）
4. 请确保避免无用提问（“我这个到底怎么解决？”“怎么办？”），请这样提问：“我想要xxx，但是这个功能产生了这样的报错（附上日志截图和聊天截图）”   
⚠️请你记住，没有任何人有义务为你免费解答
:::

>在提问之前，可以阅读[提问的智慧](https://lug.ustc.edu.cn/wiki/doc/smart-questions/#%E5%A3%B0%E6%98%8E)<Tooltip>这个指南不提供适配器的实际支持服务，只教你怎么正确的提问</Tooltip>，知晓高效的提问方法。

> **Troubleshooting any problem without the error log is like driving with your eyes closed.**
>
> 在没有错误日志的情况下诊断任何问题无异于闭眼开车。
>
> — *Apache 官方文档 Getting Started 篇章*

## [关于文件](file)

## 问： Napcat安装失败/打不开/账号登录不上/访问不了Webui/Webui密码忘了

答：此为Napcat方面的问题，本文档只涉及Napcat-Adapter的安装配置和Napcat方面的部分配置，没有能力也没有义务来解答此类问题。

请参阅[Napcat的文档](https://napneko.github.io/config/basic)获取此方面的帮助。

## 问： 适配器日志只提示初始化，没有连接（或者断断续续的连接）

答：请依次检查：

1. NapCat和适配器都在工作，且NapCat启用了一个WebSocket服务器<Tooltip>注意不是HTTP服务器</Tooltip>。
2. 适配器设置的地址可以匹配上NapCat WebSocket服务器配置的地址和端口。
3. 适配器的配置文件和WebSocket服务器配置是否有一方设置token不一致。

（如果地址匹配上了但是还是连接不了，请检查NapCat和适配器是否在同一个网络环境，如果不是，请参阅[安装与配置](../install#%E9%85%8D%E7%BD%AE-napcat)配置适配器的部分）

## 问：TRSS-Yunzai可以用这个插件吗？

答：可以，但不推荐。对于TRSS-Yunzai仍有些兼容性问题，例如：[Issue-5 [Bug] 合并转发失败](https://github.com/qiannqq/napcat-adapter/issues/5#issuecomment-3808387324)。（该问题已修复）

**TRSS-Yunzai更推荐使用自带的OneBotv11适配器**


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
  <img src="/image/qiantao.png" width="30%" class="dark-image">
  <img src="/image/qiantao-white.jpg" width="30%" class="light-image">
</div>

答：在9.1.67(不含)之后的版本，QQ采用了新的聊天记录加载机制。

~~对于不是按照特定方法发送的转发消息，第二层必定打不开。~~

**如果出现该问题，请更新NapCatQQ**


## 问： 为什么接入多个 Bot 后，群内两个 Bot 账号通常只有一个会响应？并且响应的账号随机

答： 这源于 Miao-Yunzai 的消息去重机制。该机制会将用户 QQ 号和原始消息 (raw_msg) 组合生成一个唯一标识（例如 "123456789:#帮助"），并在随后的 200 毫秒内忽略相同的标识。因此，当多个 Bot 几乎同时收到完全相同的消息时，只有最先接收到消息的 Bot 会响应，其他 Bot 会因标识重复而被过滤掉。

（TRSS-Yunzai对此机制进行了改进，因此不存在该问题。）

## 问： Napcat-Adapter（本适配器）可以连接其他协议端吗？比如LLOneBot、Lgr（拉格兰）

答： Napcat-Adapter（本适配器）使用 `node-napcat-ts` 作为连接Napcat的方式，并且基于Napcat进行高度兼容，因此无法连接除Napcat外的任何协议端，即便其同为`OneBotv11`协议，如果你有需要，建议使用 TRSS-Yunzai 并使用其 Onebotv11 适配器连接。[点我传送到 TRSS-Yunzai](https://gitee.com/TimeRainStarSky/Yunzai#%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B)

## 问：日志出现 `TLS connection ……` ，不能正常使用

```log
11-4 5:14:19 [error] Bot | 发生错误 Error: Client network socket disconneted before secure TLS connection was established
  at TLSSocket.onConnectEnd (node:_tls_wrap:1730:19)
  at TLSSocket.emit (node:events:530:35)
  at endReadableNT (node:internal/streams/readable:1698:12)
  at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
```

答：
1. 请检查 `config/config/cfg.yaml` 配置文件是否正确，是否使用 `ws://` 而并非 `wss://`

```yaml
# ws地址
baseUrl: "ws://127.0.0.1:3001"
```

2. 请检查配置完毕之后有没有重启云崽

3. 请检查Napcat相关配置是否正确，详见[安装与配置](../install#%E9%85%8D%E7%BD%AE-napcat)
