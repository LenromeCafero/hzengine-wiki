# 项目结构与安装方法

在上一章节，我们用 hzengine-cli 创建了一个模板项目，现在是时候介绍项目文件夹的结构了。

用 VS Code 打开我们刚才创建的项目文件夹，可以看到如下图所示的目录结构

<figure><img src="/static/image/image.png" alt=""><figcaption><p>示例项目的文件结构</p></figcaption></figure>

project.json 是 HZ-Engine 的项目信息文件，保存了视觉小说项目的名字、版本、制作者信息等。你可以修改这个文件来保存视觉小说项目的相关信息。

build 文件夹用于存放构建相关的临时文件和安装包，打包项目时会用到。

project 文件夹是 HZ-Engine的游戏资源根文件夹（以下简称 project 文件夹）这个文件夹里面保存了游戏脚本、立绘、cg 等游戏的核心资源，可以说，这里几乎是HZ-Engine项目的基地。

让我们看看project文件夹包含了哪些内容

* hz\_package.json 游戏的描述文件，里面保存了游戏名字、制作者信息和版本等。
* image 图片资源文件夹，保存了角色立绘、CG、背景图等图片。
* audio 音频资源文件夹，保存人物语音、背景音乐、音效等音频资源。
* gui 图形界面资源文件夹，保存按钮、文本框背景等可交互元素的图片资源
* script 游戏脚本文件夹，保存以.hzs结尾的HZ-Engine Script文件，用于描述剧本和演出。
* animation 动画描述文件，保存用于转场、变换的动画描述文件

## 预览与调试

在项目文件夹中打开终端，输入

```sh
hze build
```

稍等片刻，build 文件夹中会出现一个 .zip 结尾的文件，这个就是打包后的视觉小说小程序安装包。

::: info 提示
在 HZengine 0.1 中，创作者可以将视觉小说打包为可直接安装的小程序，这是一个折中的方案。从 HZengine 0.2 开始，视觉小说将被打包为 HZengine Package（.hzpk），配合官方提供的启动器小程序使用。这是为了方便未来统一管理插件、提供增量更新等高级调试功能。HZengine 0.1 打包的独立小程序预计在 9 月 15 日起停止运行，届时可以通过 HZengine 0.2 CLI 重新打包成 hzpk 文件。
:::

### 生成直链

下一步是把刚才的 .zip 安装包生成为直链。

常用的方法是将文件上传到支持直链的网盘，然后获取直链（宣称支持直链的网盘非常少，百度网盘不行），直链链接必须以 https 开头。

如果你自己有办法生成直链，可以直接看下一部分 - 生成二维码。否则，请继续看，

这里推荐一个网盘 秋储云谷 [https://akidepot.com/](https://akidepot.com/) ，注册后免费有 1GB 空间，对于制作 HZengine 视觉小说绰绰有余了。注册一个账号，进入网盘后，将刚才打包的 .zip 安装包上传。上传完成后，右键点击网盘中的文件，点击“获取外链”（他打错了，实际上是直链）。之后弹出一个窗口，里面就是我们需要的直链。

### 生成二维码

将刚才获取的直链的前缀 https 改成 zpkd1，你将获得一段 zpkd1://... 形式的链接，这个是 Zepp OS 的安装包链接格式。

使用文本转二维码工具（推荐草料二维码 [https://cli.im/](https://cli.im/)），将刚才得到的 zpkd1 开头的链接粘贴进去，就会生成一个二维码。这就是小程序安装二维码。

### 使用 Zepp App 开发者模式安装小程序

打开 Zepp App，进入开发者模式页面，如果你之前没有启用开发者模式，请先启用开发者模式

#### 开发者模式开启方式 <a href="#kai-fa-zhe-mo-shi-kai-qi-fang-shi-sao-ma-an-zhuang-xiao-cheng-xu" id="kai-fa-zhe-mo-shi-kai-qi-fang-shi-sao-ma-an-zhuang-xiao-cheng-xu"></a>

* 开启
  * 前往「我的」 => 「设置」 => 「关于」，连续点击 Zepp 图标 7 次直至弹窗弹出
* 关闭
  * 前往「我的」 => 「设置」，取消开发者模式选项

![devInfo.png](https://docs.zepp.com/zh-cn/assets/images/dev\_info-116b04decb3f7e537d013dac3023ffd1.png)

#### 扫码二维码安装小程序

使用「扫一扫」功能，扫描刚才生成的二维码，即可将 HZengine 视觉小说安装至设备。

![installAppScanCode.png](https://docs.zepp.com/zh-cn/assets/images/install\_app\_scan\_code-94bc951129feae201b090a4f5a864e06.jpg)

***
