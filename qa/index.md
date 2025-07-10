# 常见问题与解答

## 关于文件

:::tip
（目前已有解决方案，请等待后续更新）
:::

* WebSocket 支持小文件（图片、视频、音频、文件等任何形式的数据）传输，但单帧最大为 16MB，因此文件传输大小被限制为 10MB。超过 10MB 的文件将调用Bot.uploadFile尝试上传并获取URL，若Bot.uploadFile不存在则直接让 NapCat 读取本地文件。
* 如果有大文件传输需求，请确保 NapCat.OneBot 可以访问 Yunzai 的目录，因使用绝对路径，需让 NapCat.OneBot 访问的路径与真实路径一致。   


更多请访问[关于文件](file)

## 问： 我的插件/Bot 日志出现以下报错，怎么办？

```
[MiaoYz][xx:xx:xx.xxx][ERRO] ApiRejection {
    code: XX,
    message: 'client not online'
}
```

答： 若报错信息包含 “`client not online`”，请更新适配器：`#nc更新`

## 问： 如何连接多个 NapCat？   
答： 在锅巴的插件配置中打开“多Bot”选项，然后在下方的“Bot连接列表”手动添加多个Napcat即可。~~（如果你会编辑JSON可以编辑config/config/botlist.json的文件）~~

## 问： 嵌套转发中第二层消息打不开，显示加载失败？
<img src="/assets/qiantao.png" width="30%">
答：在9.1.67(不含)之后的版本，QQ采用了新的聊天记录加载机制，对于不是按照特定方法发送的转发消息，第二层必定打不开，icqqjs也存在该问题，需要等待Napcat.OneBot修复。