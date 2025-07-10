# 关于发送大文件的方法
:::tip
（目前已有解决方案，请等待后续更新）
:::
* WebSocket 支持小文件（图片、视频、音频、文件等任何形式的数据）传输，但单帧最大为 16MB，因此文件传输大小被限制为 10MB。超过 10MB 的文件将调用Bot.uploadFile尝试上传并获取URL，若Bot.uploadFile不存在则直接让 NapCat 读取本地文件。
* 如果有大文件传输需求，请确保 NapCat.OneBot 可以访问 Yunzai 的目录，因使用绝对路径，需让 NapCat.OneBot 访问的路径与真实路径一致。   

1. Docker

   :::details 1Panel
   登录面板后，点击左侧“容器”，找到当前使用的 NapCat 容器，点击“编辑”。
   ![1Panel-1](/assets/docker-1p1.png)
   找到目录挂载，添加一个，左侧选择本机目录（喵崽所在绝对路径），右侧容器目录填写相同路径。
   ![1Panel-2](/assets/docker-1p2.png)
   :::

   ::: details 宝塔面板
   登录面板后，点击左侧“Docker”，再点击“容器”，找到当前使用的 NapCat 容器，点击“管理”。
   ![BT-1](/assets/docker-bt1.jpg)
   在“更多设置”中添加“挂载/映射”，选择本机目录（喵崽所在绝对路径），右侧容器目录填写相同路径。
   ![BT-2](/assets/docker-bt2.jpg)
   保存容器配置即可。
   ![BT-3](/assets/docker-bt3.jpg)
   :::

   :::details 其他还在烧烤中
   都说了还在烧烤中看不到吗？
   ![表情](/assets/cd.jpg)
   :::

2. Windows

   :::tip
   一般来说，Windows 下的 Yunzai 和 NapCat.OneBot 目录一致，无需额外配置。
   :::

3. Android Termux

    :::details tmoe Chroot 容器

   此方法重启后失效，需每次重启后重新配置。
   Chroot 仅限 Root 环境。

   ```bash
   # 在 Termux 中执行，而非容器环境
   su
   cd /data/data/com.termux/files/home/.local/share/tmoe-linux/containers/chroot/<NapCat容器名称>/root
   mkdir TRSS_AllBot
   mount --bind /data/data/com.termux/files/home/.local/share/tmoe-linux/containers/chroot/<Yunzai容器名称>/root/TRSS_AllBot /data/data/com.termux/files/home/.local/share/tmoe-linux/containers/chroot/<NapCat容器名称>/root/TRSS_AllBot
   exit
   ```
    :::

4. **跨设备（完全不在同一设备）、WSL**

:::details 点击展开
部署到 NapCat 和 Yunzai 都能访问的服务器
```bash
git clone https://gitee.com/qiannqq/Lain-drive.git
# 如果要将Lain-drive作为插件安装在Yunzai中，跟随Yunzai启动，则使用以下指令
# git clone --depth=1 https://gitee.com/qiannqq/Lain-drive.git ./plugins/Lain-drive
```
安装 Lain-drive 依赖
```bash
pnpm i
```
启动指令
```bash
node .
```
启动后，在 config/config.yaml 修改服务器地址为 NapCat 可访问的地址
在 Yunzai 安装该插件
```bash
curl -o "./plugins/example/大文件上传.js" "https://gitee.com/qiannqq/yunzai-plugin-JS/raw/master/JS/uploadFile.js"
```
编辑插件中 IP 地址为你部署 Lain-drive 的地址
在 Yunzai 根目录安装依赖
```bash
pnpm i node-fetch -w
```
:::

5. Other 其他方案
:::details 此方案仅适用于有代码功底或会熟练运用AI写代码的用户
* 为了实现大文件发送，我给Bot添加了一个uploadFile的函数<br>
* 在文件超过10MB大小时，适配器便会判断Bot.uploadFile这个函数是否存在<br>
* 如果存在，适配器则会尝试调用Bot.uploadFile，向其传入文件的Buffer数据，获取Bot.uploadFile返回的参数<br>
* 一般这个参数为URL，并且这个URL是让Napcat访问的，如果Napcat无法访问到目标地址，则文件发送失败<br>
* 所以，你可以通过自定义Bot.uploadFile函数，让其使用其他的文件服务器，比如阿里云的OSS对象存储<br>
* Bot.uploadFile可以参考 [uploadFile.js](https://gitee.com/qiannqq/yunzai-plugin-JS/raw/master/JS/uploadFile.js)

#### 以下是适配器处理文件的部分代码，位于`./lib/utils/common.js`，nccommon类中
```javascript
/**
 * 标准化文件消息
    * @param file
    */
async getFile(file) {
    if(this.isLocalPath(file) || Buffer.isBuffer(file)) {
        try {
            let rawFile = Buffer.isBuffer(file) ? file : fs.readFileSync(this.getFilePath(file))
            /** 文件大小判断 */
            if(rawFile.length > (cfg().bigFileSize || 10485760)) {
                if(Bot.uploadFile && typeof Bot.uploadFile === 'function') {
                /** 有uploadFile走uploadFile */
                return await Bot.uploadFile(rawFile)
                } else {
                /** 没有uploadFile如果是Buffer就缓存到本地，否则直接返回绝对路径 */
                if(Buffer.isBuffer(file)) {
                    let TempFileName = `./temp/napcat-file-temp.${Date.now()}`
                    fs.writeFileSync(TempFileName, file)
                    file = TempFileName
                    /** 缓存到本地后，30秒删除 */
                    setTimeout(() => {
                    fs.unlinkSync(TempFileName)
                    }, 1000 * 30)
                }
                return this.getFilePath(file)
                }
            }
            return `base64://${rawFile.toString('base64')}`
        } catch {
            return this.getFilePath(file)
        }
    } else {
        return file
    }
}
```
:::