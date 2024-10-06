# 概览

## 角色定义

* 创作者：使用HZengine创作galgame的人

## 框架设计

HZengine Core 分为多个模块实现

- ui: 界面模块，负责页面的组织和显示。不依赖具体的 UI 框架、不内置转场和过渡功能，仅仅是调用创作者提供的页面创建和销毁函数，由创作者实现具体的绘制逻辑。
- audio: 音频模块，负责 bgm，voice，音效的混音和播放（暂时先封装单轨音频播放的逻辑，混音等华米的系统能力开放后实现）
- system: 系统模块，负责游戏整体运行逻辑，如状态管理
- storage: 存储模块，负责存档的存取、代理文件系统、加解密(按需实现)、hmg 映像（类似 krkr 的.xp3，用来将游戏资源打包成一个文件，按需实现）
- script: 剧本解释器模块，负责解释和优化.ksz 剧本，提供自定义语法功能
- debug: 调试模块，异常处理、日志
- async: 异步模块，负责管理定时器、执行异步任务等
- agnostic: 跨平台模块，封装使 HZengine 跨平台运行的最小接口。HZengine Core 不包含任何特定平台代码，而必须通过 agnostic 模块间接访问，或是从 HZengine 中剔除

至于网络和健康传感器等功能，可以先自己调用，时机成熟后开发内置模块

### hz.ui 界面模块

HZengine 的界面系统由**图层(layer)**和**视图(view)**组成。

#### layer 和 view 简介

layer 可以对应`hmUI.widget.VIEW_CONTAINER`，是 ZeppOS 控件的容器，用于保证控件在 z 轴上堆叠时有正确顺序。

内置的 layer 有

- `bg`：背景层。显示 cg、其它背景图片、或者视频等
- `fg`：前景层。显示人物立绘、或者一些需要在背景上方的图片（比如在对话中展示一个宝箱中发现的道具的图片）
- `ct`：控制层。显示对话框、菜单按钮（比如自动、向前翻页、向后翻页、设置）、分支选项菜单等
- `overlay`：浮动层。显示设置界面、模态框、浮动按钮等平常不显示，但显示时需要覆盖在 ct 之上的视图

view 组合一个或多个基本控件，用来实现较单一的功能。例如：

- `say`：对话框。角色对话时显示的 view，通过给定的角色名称和对话内容，以对话框的形式显示在屏幕上。这个 view 可以包含一个 img 控件作为对话框背景，两个 text 控件分别显示角色名称和对话内容。
- `choice`：分支选择菜单。由多个 button 控件组成，分别指向不同的剧情分支等。
- `image`：这个 view 只包含一个 img 控件，用于显示人物立绘、背景等

每个 layer 可以包含多个 view 的实例，比如在`fg`layer 中同时包含两个`image`view 实例，来同时显示两个人物的立绘。这要求 view 本身是无状态的，且其被创建或更新时的逻辑无副作用。

#### hz.ui 如何管理 layer

`hz.ui`维护一个`layerList`，提供如`addLayer(name)`、`getLayerList()`等方法。创建 layer 需要指定 z_order

#### hz.ui 如何管理 view

由于一个 view 应当可以被多次实例化，并在一个界面上同时显示多个相同的 view，所以创作者提供一个 name 用于区分不同类型的 view，并提供 view 的创建、销毁、更新的方法。
注册一个 view 的方法类似：

```ts
registerView(name: string, {create: (init_props) => ViewInstance, update: (new_props, instance) => void, destroy: (instance) => void}): void
```

然后提供一个类似下面的，用于实例化 view 的方法。这将在指定的图层上显示这个 view 实例

```ts
createView(name: string, layer: string, init_props): ViewInstance
```

也可以允许给 view 指定一个 tag，若新实例化的 view 与已存在的 view 具有相同的 tag，将自动销毁已存在的那个 view。这个可以用于保证同类 view 在同一时间只有一个能显示在屏幕上，比如设置页面、存档页面、关于页面可以使用同一个 tag `system_view`，来保证它们不会在同一时间显示

#### 关于平台和 ui 框架无关性

`hz.ui`模块并不清楚 layer 在创建时的具体逻辑，而是调用`hz.agnostic`提供的创建 layer 的方法。这可以保证`layer`即可以是 ZeppOS 的`VIEW_CONTAINER`，也可以是 web 中的 canvas 之类的东西。

view同上。动画、过场、布局等功能，可以由view的具体逻辑实现，比如未来使用AsukaUI的响应式特性简化开发过程、使用fx.js进一步封装而成的过渡动画库等。
