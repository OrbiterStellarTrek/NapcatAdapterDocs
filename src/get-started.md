# 快速开始

## 事先准备

1. Yunzai
2. Napcat

:::details Napcat需要进行以下配置

> [!warning]
> 本适配器的工作模式为 `正向 WS 连接`，请确保 `Napcat-Adapter` 可以正常访问 `NapCat` 所提供的 IP 和端口。

打开浏览器，进入你的Napcat Webui（默认密钥Napcat）

Napcat Webui的默认端口是6099。

例如你在Win上启动Napcat，那么访问地址一般就是127.0.0.1:6099

Linux云服务器请先在云服务器厂商安全组和服务器管理面板（比如宝塔）放行入方向的6099端口

（为了防止端口占用可以多放行几个）

然后访问 “http://你的云服务器公网IP:6099“。

按照图示打开`网络配置`，新建一个`WebSocket服务器`。
![WebUI](/assets/webconfig1.png)

随后按照如图所示填写配置。
> [!tip]
> Napcat Docker默认映射3001端口，如有疑问可查看容器是否映射端口。

![WebUIConfig2](/assets/webconfig2.png)

完成后记得**保存！保存！并启用！**

:::

:::details 你没安装Napcat？ 
[点我跳转官方文档](https://napneko.github.io/guide/install)

（这里不推荐Yunzai和Napcat都使用容器化部署（Yunzai容器化部署的最知名例子：trss.me）可能会出现网络的桥接问题，如果出现请自行解决。）

我真服了怎么还有没安装Napcat-Adapter就跑来用Napcat-Adapter的
![傻了吧唧的，叉出去](/assets/cd.jpg)
:::

## 🔨安装

1. 在你的**Yunzai**根目录下执行安装指令：

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

3. 安装本适配器后启动一次，然后打开插件根目录下的 `config/config/cfg.yaml`，

编辑 baseUrl 地址为刚刚在 NapCat WebUI 中配置的地址，后面加上你在Napcat指定的端口号，前面加上“ws://”。

（例如：ws://0.0.0.0:3000）

:::details 什么，你不知道怎么配置？

1.  **如果你的Yunzai和Napcat在同一个设备：**

      *   没有使用什么Docker（比如使用`trss.me`的安装脚本）或者WSL2的话，直接填`127.0.0.1`一般没什么问题。
      *   如果你在Linux平台上使用了TRSS安装脚本安装Yunzai，同时直接安装了Napcat：

          此时在容器内部，`localhost` 或 `127.0.0.1` 指的是容器本身，而不是宿主机。因此不能在容器中直接使用 `127.0.0.1` 来连接Napcat。

          **解决办法**：通过容器所在网络的网关IP 来访问宿主机。默认情况下，这个网关就是宿主机在 Docker 桥接网络中的地址。

          首先找到容器所连接的网络的网关 IP，在终端输入：
          ```bash
          docker network inspect bridge
          ```
          一般地，该指令会输出一个JSON，在输出的 JSON 中，找到 `"Gateway"` 字段，其值通常是 `172.17.0.1`，这个就是你应该配置的地址。

          比如原来是`ws://127.0.0.1:3939`，现在就是`ws://172.17.0.1:3939`

          > [!warning]
          > 不要照抄这个地址！！！这个地址是演示用的！实际需要根据你自己的配置进行配置！直接照抄一般用不了！

      *   如果你在Win的WSL2系统使用了TRSS安装脚本安装Yunzai，同时直接安装了Napcat：
          请直接使用`127.0.0.1`尝试，如果无法连接，请继续查看。
          *   **如果你的电脑运行 Windows 11 22H2 及更高版本**：
              1.  电脑`Win+R`，输入`%UserProfile%`
              2.  会打开一个目录，在该目录下创建文件，名为`.wslconfig`
              3.  使用文本编辑器打开这个文件，粘贴下面代码块的内容后保存
                ```bash
                [wsl2]
                networkingMode=mirrored
                ```
              4.  重启WSL2系统后启动Yunzai，再次尝试连接。如果仍然无法连接，或者提示不支持镜像模式网络，请看下面的通用方法。
          *   **WSL2的通用方法**：
              1.  在WSL2系统终端执行以下指令：
                  ```bash
                  ip route show | grep -i default | awk '{ print $3}'
                  ```
                  典型的输出可能是：
                  ```
                  172.30.96.1
                  ```
                  因此，在此示例中，`172.30.96.1`就是我们需要配置的地址。

                  比如原来是`ws://127.0.0.1:3939`，现在就是`ws://172.30.96.1:3939`

                > [!warning]
              > 再警告一遍！地址不要照抄！！！这个地址是演示用的！实际需要根据你自己的配置进行配置！直接照抄一般用不了！

              更多关于WSL的配置请看[这里](https://learn.microsoft.com/zh-cn/windows/wsl/networking#identify-ip-address)

2.  **如果你的Yunzai和Napcat不在同一个设备：**
      请在Napcat的配置里先配置一个token！并填入后面的配置处，否则安全问题概不负责。

      假设部署Napcat服务器的公网地址是`114.51.xx.919`，那么在这个示例中，配置的地址即为`ws://114.51.xx.919:你选择的端口`。

:::

如果在之前配置 `WebSocket 服务器` 时输入了 token，请取消配置文件里 token 的注释，并编辑为你在 WebSocket 服务器配置的 token。

（注：也可以使用锅巴配置，这样就不用去翻文件了。）

:::danger
**跨设备公网WebSocket连接，请务必配置连接Token！**
:::
:::details 如果看不懂请看这里的图文并茂
？这种基本功都不会，干什么吃的，晚点再写这个
![傻了吧唧的，叉出去](/assets/cd.jpg)
:::

4. 重启 Yunzai 后即可享用

## 运行不正常？你可能需要[疑难解答](qa/)
