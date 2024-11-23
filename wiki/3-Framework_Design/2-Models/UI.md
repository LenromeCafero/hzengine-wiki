# UI 界面模块

HZ-Engine 的界面系统主要由 **Layer(图层)** ，**View(视图)** 和 **Router(路由)** 组成。

## 设计思路

### Layer 图层
HZ-Engine 首先将游戏画面划分为多个 Layer，Layer 具有 z_index 属性，用来确定在屏幕上显示的堆叠顺序。

Layer 有 name 和 z_index 两个基本属性。

内置的 Layer 有：
- 显示背景图片、CG的 `bg` (Background) 背景层
- 显示人物立绘和道具图片的 `fg` (Foreground) 前景层
- 显示互动界面如人物对话、选择分支菜单的 `ct` (Control) 控制层
- 显示快捷菜单、设置页面等临时浮动于所有其它页面上方的 `overlay` 覆盖层
从上到下，z_index 逐渐增大。

### View 视图
View 在 HZ-Engine 中指有特定功能的页面的一部分。比如显示人物立绘的 


#### layer 和 view 简介

layer 可以对应`hmUI.widget.VIEW_CONTAINER`，是 ZeppOS 控件的容器，用于保证控件在 z 轴上堆叠时有正确顺序。

内置的 layer 有

* `bg`：背景层。显示 cg、其它背景图片、或者视频等
* `fg`：前景层。显示人物立绘、或者一些需要在背景上方的图片（比如在对话中展示一个宝箱中发现的道具的图片）
* `ct`：控制层。显示对话框、菜单按钮（比如自动、向前翻页、向后翻页、设置）、分支选项菜单等
* `overlay`：浮动层。显示设置界面、模态框、浮动按钮等平常不显示，但显示时需要覆盖在 ct 之上的视图

view 组合一个或多个基本控件，用来实现较单一的功能。例如：

* `say`：对话框。角色对话时显示的 view，通过给定的角色名称和对话内容，以对话框的形式显示在屏幕上。这个 view 可以包含一个 img 控件作为对话框背景，两个 text 控件分别显示角色名称和对话内容。
* `choice`：分支选择菜单。由多个 button 控件组成，分别指向不同的剧情分支等。
* `image`：这个 view 只包含一个 img 控件，用于显示人物立绘、背景等

每个 layer 可以包含多个 view 的实例，比如在`fg`layer 中同时包含两个`image`view 实例，来同时显示两个人物的立绘。这要求 view 本身是无状态的，且其被创建或更新时的逻辑无副作用。

#### hz.ui 如何管理 layer

`hz.ui`维护一个`layerList`，提供如`addLayer(name)`、`getLayerList()`等方法。创建 layer 需要指定 z\_order

#### hz.ui 如何管理 view

由于一个 view 应当可以被多次实例化，并在一个界面上同时显示多个相同的 view，所以创作者提供一个 name 用于区分不同类型的 view，并提供 view 的创建、销毁、更新的方法。 注册一个 view 的方法类似：

<pre class="language-ts"><code class="lang-ts"><strong>function registerView(name: string, opt: {create: (init_props) => ViewInstance, update: (new_props, instance) => void, destroy: (instance) => void}): void
</strong></code></pre>

然后提供一个类似下面的，用于实例化 view 的方法。这将在指定的图层上显示这个 view 实例

```ts
function createView(name: string, layer: string, init_props): ViewInstance
```

也可以允许给 view 指定一个 tag，若新实例化的 view 与已存在的 view 具有相同的 tag，将自动销毁已存在的那个 view。这个可以用于保证同类 view 在同一时间只有一个能显示在屏幕上，比如设置页面、存档页面、关于页面可以使用同一个 tag `system_view`，来保证它们不会在同一时间显示

#### 关于平台和 ui 框架无关性

`hz.ui`模块并不清楚 layer 在创建时的具体逻辑，而是调用`hz.agnostic`提供的创建 layer 的方法。这可以保证`layer`即可以是 ZeppOS 的`VIEW_CONTAINER`，也可以是 web 中的 canvas 之类的东西。

view同上。动画、过场、布局等功能，可以由view的具体逻辑实现，比如未来使用AsukaUI的响应式特性简化开发过程、使用fx.js进一步封装而成的过渡动画库等。
