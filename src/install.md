# 安装与配置

:::warning
由于Napcat更新频繁，该文档的一些内容可能已经过时，请留意
:::

:::tip
虽然笔者不希望你提问出本文档已经包含回答的问题，但是我估计你也不会听。

所以如果有什么问题，欢迎加入[Napcat-Adapter官方群](https://qm.qq.com/q/WuYpKfgWYw)

开发者没有耐心对每个问题一一解释详细回复，所以本文档已经包含回答的问题没人回概不负责。

又或者可以直接寻找代搭建，并把这个文档扔给TA，让TA帮你安装并配置这个插件。
:::

:::warning
1.本适配器原意是提供给Miao-Yunzai钉子户所使用，虽然TRSS-Yunzai也可以使用本适配器，但如果你分不清Miao-Yunzai和TRSS-Yunzai，正向WS和反向WS的区别，那建议去使用TRSS-Yunzai自带的OneBotv11适配器。

2.[Napcat-Adapter官方群](https://qm.qq.com/q/WuYpKfgWYw)不是Napcat的官方群，更不是Miao-Yunzai和TRSS-Yunzai的官方群。

和Napcat-Adapter无关的问题请勿进入群进行提问。
:::

## 事先准备

1. Yunzai
2. Napcat

## 安装 Napcat 

### Windows系统安装 任选其一即可
* [Windows 一键启动](https://napneko.github.io/guide/boot/Shell#napcat-win-%E4%B8%80%E9%94%AE%E7%89%88%E6%9C%AC) <Badge type="tip" text="推荐" />
* [Windows 手动安装](https://napneko.github.io/guide/boot/Shell#napcat-shell-win-%E6%89%8B%E5%8A%A8%E5%90%AF%E5%8A%A8%E6%95%99%E7%A8%8B)
* [Windows 桌面软件](https://napneko.github.io/guide/boot/Shell#napcat-windows-%E5%8F%AF%E8%A7%86%E5%8C%96%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)

### Linux系统安装 任选其一即可 <Badge type="tip" text="推荐" />
* [Shell安装 (无需多开的情况)](https://napneko.github.io/guide/boot/Shell#napcat-installer-linux-%E4%B8%80%E9%94%AE%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC-%E6%94%AF%E6%8C%81ubuntu-20-debian-10-centos9) 
* [Docker安装 (适合多开账号的)](https://napneko.github.io/guide/boot/Shell#napcat-docker-linux%E5%AE%B9%E5%99%A8%E5%8C%96%E9%83%A8%E7%BD%B2)
* **如果你的电脑/服务器只支持WSL1，请使用Shell安装。<Tooltip>WSL2无此限制</Tooltip>**
* 如果你的Yunzai是使用容器化部署(如trss.me)，若无多开需求请使用Shell部署，使用Docker部署Napcat需要注意网络桥接问题，如有出现问题（比如各种连接不上、连接无响应）请自行解决。

### 其他安装方案（含Android Termux、1Panel等）
[Napcat - 安装方式](https://napneko.github.io/guide/boot/Shell)

## 配置 Napcat

::: danger
请勿将 Napcat 的 WebSocket 服务端接口暴露在公网！

近期出现针对使用 OneBot 协议的机器人的端口扫描与恶意攻击（例如发送不当言论等）。

若您的服务端接口已公开在公网，请务必通过防火墙（适用于 Linux Shell安装的Napcat）或在云服务器控制台设置安全组（适用于 Linux Docker安装的Napcat）进行防护。

如确需跨设备公开 WebSocket 接口，请务必设置 Token，以避免账号被他人恶意利用。
:::

省流：新建一个Websocket服务器

首先需要按照下面的步骤打开一个Websocket服务器让Adapter连接。

::: warning
本适配器的工作模式为 `正向 WS 连接` （即 Adapter 连接到 Napcat ），请确保 `Adapter` 可以正常访问 `NapCat` 所提供的 IP 和端口。
:::

启动Napcat，打开浏览器，进入你的Napcat Webui<Tooltip>默认密钥napcat</Tooltip>

Napcat Webui的默认端口是6099。<Tooltip>例如你在Win上启动Napcat，那么访问地址一般就是127.0.0.1:6099</Tooltip>

::: warning
如果你的端口6099暴露在公网中，请务必修改登录密码！
:::

Linux云服务器请先在云服务器厂商安全组<Tooltip>可能叫做防火墙</Tooltip>和服务器管理面板（比如宝塔）按照如下放行（没有则忽略）


|动作|     备注     |  来源IP  |端口号| 协议 |
|:--:|:------------:|:--------:|:---:|:---:|
|允许| Napcat-WebUI | 0.0.0.0/0| 6099 | TCP |

然后访问 “http://你的云服务器公网IP:6099“。（这里的公网IP不清楚可以使用命令`curl test.ipw.cn`获取）

按照图示打开`网络配置`，新建一个`WebSocket服务器`。
![WebUI](/image/webconfig1.png)

随后按照如图所示填写配置。
:::danger
**跨设备公网WebSocket连接，请务必配置连接Token！**
::: 

![WebUIConfig2](/image/webconfig2.png)

:::danger
**跨设备公网WebSocket连接，请务必配置连接Token！**
:::

完成后记得**保存！保存！并启用！**

## 🔨安装适配器

点击播放直接看动画版安装过程

<NuAsciinemaPlayer
  src="asciinema/gitee-install.cast"
  :preload="true"
  :cols="300"
  :rows="40"
  :auto-play="false"
  :controls="true"
  :terminal-font-size="'14px'"
  :loop="false"
/>

安装步骤：

1. 在你的**Yunzai**根目录下执行安装指令：

::: code-group
```bash [gitee]
git clone --depth=1 https://gitee.com/qiannqq/napcat-adapter.git ./plugins/napcat-adapter
```

```bash [github]
git clone --depth=1 https://github.com/qiannqq/napcat-adapter.git ./plugins/napcat-adapter
```
:::

2. 安装依赖

::: code-group
```bash [pnpm]
pnpm install --filter=napcat-adapter
```

```bash [yarn]
yarn install
```
:::

3. 配置修改

如果你是Shell安装的Napcat，使用默认的端口和 `0.0.0.0` 作为服务器的地址，那么直接启动Yunzai应该即可正常使用，如果不行，请尝试下面的步骤：

安装适配器后启动一次Yunzai，然后

（对于新手/会翻文件不会改文件的）使用锅巴配置即可

（对于会翻文件并改文件的）打开插件根目录下的 `config/config/cfg.yaml`，

编辑 baseUrl 地址为127.0.0.1（一般不用改，如果连接不上请看下面的折叠部分），前面加上“ws://”，后面加上你在 `Napcat Webui` 指定的端口号。

（例如：ws://127.0.0.1:3001）

:::details 什么，你不知道怎么配置？或者连接失败？

1.  **如果你的Yunzai和Napcat在同一个设备：**

      *   没有使用什么Docker（比如使用`trss.me`的安装脚本）或者WSL2的话，直接填`127.0.0.1`一般就可以了。

          （当然没什么问题你就不会来看这里了）

      *   如果你在Linux平台上使用了TRSS安装脚本安装Yunzai，同时直接安装了Napcat：

          TRSS 安装脚本使用容器部署，因此在容器内部，`localhost` 或 `127.0.0.1` 指向的是容器自身，无法用于访问宿主机上运行的服务。因此不能在容器中直接使用 `127.0.0.1` 来连接Napcat。

          **解决办法**：
          *   使用`host.docker.internal`
              将原先的 `127.0.0.1` 改为 `host.docker.internal`，该方法理论上支持Linux Docker（v20.10+）环境，但未经测试。
          
          *   通过容器网络网关来访问宿主机。默认情况下，这个网关就是宿主机在 Docker 桥接网络中的地址。

              首先找到容器所连接的网络的网关 IP，在终端输入：
              ```bash
              docker network inspect bridge
              ```
              一般地，该指令会输出一个JSON，在输出的 JSON 中，找到 `"Gateway"` 字段，其值通常是 `172.17.0.1`，这个就是你应该配置的地址。

              比如原来是`ws://127.0.0.1:3939`，现在就是`ws://172.17.0.1:3939`

              > [!warning]
              > 不要照抄这个地址！！！这个地址是演示用的！实际需要根据你自己的配置进行配置！直接照抄一般用不了！

      *   如果你在Linux平台上使用了Docker安装了Napcat，同时直接安装了Yunzai：

          适配器[NapCat.Docker](https://github.com/NapNeko/NapCat-Docker) Readme使用的启动指令已经自带了对3000，3001和6099端口的映射：

          >docker run -d \
          >-e NAPCAT_GID=$(id -g) \
          >-e NAPCAT_UID=$(id -u) \
          >-p 3000:3000 \
          >-p 3001:3001 \
          >-p 6099:6099 \
          >--name napcat \
          >-restart=always \  
          >mlikiowa/napcat-docker:latest

          如果你是因为没有连接成功而来到这里，说明你在WebSocket服务器设置的端口可能没有映射出来。（或者你没有正确配置，这里我们先不论）

          解决方法：在上述Docker启动指令后添加：
          ```bash
          -p xxxx:xxxx
          ```

          其中xxxx是你在WebSocket服务器设置的端口，完成后重启Napcat容器，适配器的连接地址配置为：

          ```bash
          ws://127.0.0.1:xxxx
          ```

      *   如果你在Win的WSL2系统安装了Yunzai，同时直接安装了Napcat：

          请先直接使用`127.0.0.1`尝试，如果无法连接，请继续查看。
          *   **如果你的电脑运行 Windows 11 22H2 及更高版本**：
              1.  电脑`Win+R`，输入`%UserProfile%`
              2.  会打开一个目录，在该目录下创建文件，名为`.wslconfig`
              3.  使用文本编辑器打开这个文件，粘贴下面代码块的内容后保存
                ```bash
                networkingMode=mirrored
                ```
              4.  重启WSL2系统后启动Yunzai，再次尝试连接。

              或者：
              1.  电脑`Win+S`，搜索`WSL Setting`，打开该应用。

            ![WSL2设置窗口](/image/setting.png)

            2. 将网络模式改为 `mirrored`，然后重启WSL2系统。

          如果仍然无法连接，或者提示不支持镜像模式网络，请看下面的通用方法。

          *   **WSL2的通用方法**：
              1.  在WSL2系统的终端执行以下指令：
                  ```bash
                  ip route show | grep -i default | awk '{ print $3}'
                  ```
                  典型的输出可能是：
                  ```
                  172.30.96.1
                  ```
                  因此，在此示例中，`172.30.96.1`就是我们需要配置的地址。

                  比如原来是`ws://127.0.0.1:3939`，现在就是`ws://172.30.96.1:3939`

                > [!warning] ⚠️警告
                > 再警告一遍！地址不要照抄！！！这个地址是演示用的！实际需要根据你自己的配置进行配置！直接照抄一般用不了！

              更多关于WSL的信息请看[这里](https://learn.microsoft.com/zh-cn/windows/wsl/networking#identify-ip-address)

2.  **如果你的Yunzai和Napcat不在同一个设备：**

假设部署Napcat服务器的公网地址是`114.51.xx.919`，那么在这个示例中，配置的地址即为`ws://114.51.xx.919:你选择的端口`。

:::

如果在之前配置 `WebSocket 服务器` 时输入了 token，请取消配置文件里 `accessToken` 的注释，并将"your token"编辑为你在 WebSocket 服务器配置的 token。

比如原来是：
```bash
# Token
# accessToken:"your token"
```

更改完之后是：
```bash
# Token
accessToken:"你实际的Token"
```

:::danger
**跨设备公网WebSocket连接，请务必配置连接Token！**
:::

:::tip
如果你会配置局域网/组网，那么这是您的首选，因为更安全
:::

 *  如果配置完上面的适配器，不想再使用ICQQ了：

    打开 Yunzai 根目录下的 config/config/bot.yaml，将 skip_login: false 改为 skip_login: true（大约在第 32 行）。 

    这里配置的作用是跳过ICQQ登录，直接使用适配器连接。

4. 重启 Yunzai 后即可享用

## 运行不正常？

你可能需要[疑难解答](qa/)

若你的问题不在“疑难解答”内，你可以询问AI，也可以加入[官方群聊](https://qm.qq.com/q/WuYpKfgWYw)询问，等待好心人给你解答。

例如下面的Deepwiki：

* [DeepWiki Miao-Yunzai](https://deepwiki.com/yoimiya-kokomi/Miao-Yunzai)
* [DeepWiki Napcat-Adapter](https://deepwiki.com/qiannqq/napcat-adapter)

若你确定问题是本适配器引起的，请携带你的问题详情和日志前往创建[issue](https://gitee.com/qiannqq/napcat-adapter/issues/new/choose)，等待开发者的回复
