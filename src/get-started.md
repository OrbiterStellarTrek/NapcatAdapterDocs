# 快速开始

## 事先准备
1. Yunzai
2. Napcat   
:::details Napcat需要进行以下配置

> [!danger] ⚠️危险
> **如果你的端口6099暴露在公网中，请务必修改登录密码！**

> [!warning]
> 本适配器的工作模式为 `正向 WS 连接`，请确保 `Napcat-Adapter` 可以正常访问 `NapCat` 所提供的 IP 和端口。

> 关于 WSL 的帮助请参考：[WSL Networking Documentation](https://learn.microsoft.com/zh-cn/windows/wsl/networking#identify-ip-address)
>
> 关于 Docker 配置端口映射请参考：[Docker 镜像配置端口](https://www.doubao.com/thread/w76de7e1b8088ac44)

打开浏览器，进入你的Napcat Webui（默认密钥Napcat），按照图示打开`网络配置`，新建一个`WebSocket服务器`
![WebUI](/assets/webconfig1.png)
随后按照如图所示填写配置
> [!tip]
> Napcat Docker默认映射3001端口，如有疑问可查看容器是否映射端口

![WebUIConfig2](/assets/webconfig2.png)
完成后记得保存并启用
:::

:::details 你没安装Napcat？ 
[点我跳转官方文档](https://napneko.github.io/guide/install)   
我真服了怎么还有没安装Napcat就跑来用Napcat-Adapter的
![傻了吧唧的，叉出去](/assets/cd.jpg)
:::

## 🔨安装

1. 直接克隆插件到插件目录

Gitee源
``` bash
git clone --depth=1 https://gitee.com/qiannqq/napcat-adapter.git ./plugins/napcat-adapter
```
:::tip
如果你的网络不是很好，可以使用下面的Github源
:::
Github源
``` bash
git clone --depth=1 https://github.com/qiannqq/napcat-adapter.git ./plugins/napcat-adapter
```
2. 安装依赖
``` bash
pnpm install --filter=napcat-adapter
# Yunzai-Next 等使用yarn管理依赖的请使用以下指令安装依赖
# yarn install
```

3. 安装本适配器后启动一次，打开插件根目录下的 `config/config/cfg.yaml`，编辑 baseUrl 地址为刚刚在 NapCat WebUI 中配置的地址（例如：ws://0.0.0.0:3000）。如果在配置 `WebSocket 服务器` 时输入了 token，请取消配置文件里 token 的注释，并编辑为你在 WebSocket 服务器配置的 token。
:::danger
**跨设备公网WebSocket连接，请务必配置连接Token！**
:::
:::details 如果看不懂请看这里的图文并茂
？这种基本功都不会，干什么吃的，晚点再写这个
![傻了吧唧的，叉出去](/assets/cd.jpg)
:::

4. 重启 Yunzai 后即可享用

## 你可能需要[疑难解答](qa/)