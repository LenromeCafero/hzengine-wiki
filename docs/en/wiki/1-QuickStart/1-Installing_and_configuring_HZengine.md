# 安装和配置 HZengine

## 一. 配置 Zepp OS 开发环境

在基于 HZengine 创作视觉小说之前，你需要先配置 Zepp OS 开发环境，具体操作方法参见 [https://docs.zepp.com/zh-cn/docs/guides/quick-start/environment/](https://docs.zepp.com/zh-cn/docs/guides/quick-start/environment/)

如果在安装Zeus CLI的过程中出现进度条卡死问题，你应该尝试对npm进行换源。

通过 Zepp OS 官方文档的环境配置教程，你应该已经安装了 Node.js ，Zeus CLI，Zepp OS 模拟器。

你可以打开命令行，使用以下命令检查环境是否正确配置

```bash
zeus -v
```

```bash
npm -v
```

这个命令的作用是输出 Zeus CLI 和 npm (Node.js的包管理器，随着Node.js自动安装) 的版本号。如果它们都能正确执行，基本可确认环境配置成功。

## 二.  安装 HZengine CLI

打开终端，输入以下命令

```bash
npm i hzengine-cli -g
```

这条命令将把 HZengine CLI 全局安装到你的电脑上，它提供了创建项目、打包游戏等基本功能。

## 三. 创建项目

首先打开你想创建项目的位置，在此处打开终端，输入以下命令并回车

```bash
hze create hello-hzengine
```

这将在在当前文件夹下创建一个叫 `hello-hzengine` 的视觉小说项目。如果当前文件夹下存在同名文件夹，你需要更换一个名字。

接下来，你应该看见一个如下图所示的列表，请选择一个初始项目模板（虽然就只有一个），这里我们选择 Template Project，回车确定，就能创建一个实例项目。

<figure><img src="/static/image/image (1).png" alt=""><figcaption></figcaption></figure>

一切就绪

完成后，使用 VS Code 等 IDE 打开自动创建的 `hello-hzengine` 文件夹，就可以开始创作了。

