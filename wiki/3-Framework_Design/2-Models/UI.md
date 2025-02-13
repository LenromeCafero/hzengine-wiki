# UI 界面模块

HZ-Engine 的界面系统主要由 **Layer(图层)** ，**View(视图)** 和 **Router(路由)** 组成。

## 设计思路

### Layer 图层
HZ-Engine 首先将游戏画面划分为多个 Layer。

Layer 有 name 和 z_index 两个基本属性。z_index 用于确定在屏幕上的堆叠顺序。

Layer 用来容纳 View 的实例，从而控制其显示层级。

内置的 Layer 有：
* `bg`：背景层。显示 cg、其它背景图片、或者视频等
* `fg`：前景层。显示人物立绘、或者一些需要在背景上方的图片（比如在对话中展示一个宝箱中发现的道具的图片）
* `ct`：控制层。显示对话框、菜单按钮（比如自动、向前翻页、向后翻页、设置）、分支选项菜单等
* `overlay`：浮动层。显示设置界面、模态框、浮动按钮等平常不显示，但显示时需要覆盖在 ct 之上的视图

从上到下，z_index 依次增大。

#### 平台实现
##### Zepp OS
由`VIEW_CONTAINER`实现，请注意该类控件的数量限制。
##### Web
由 div 元素实现。

### View 视图

View 组合一个或多个基本控件，用来实现较单一的功能。例如：

* `say`：对话框。角色对话时显示的 view，通过给定的角色名称和对话内容，以对话框的形式显示在屏幕上。这个 view 可以包含一个 img 控件作为对话框背景，两个 text 控件分别显示角色名称和对话内容。
* `menu`：分支选择菜单。由多个 button 控件组成，分别指向不同的剧情分支等。
* `fg_img`：这个 view 只包含一个 img 控件，用于显示人物立绘
* `bg_img`：同上，用于显示背景图片

每个 layer 可以包含多个 view 的实例，比如在`fg`layer 中同时包含两个`fg_img` view 实例，来同时显示两个人物的立绘。

#### hz.ui 如何管理 view




然后提供一个类似下面的，用于实例化 view 的方法。这将在指定的图层上显示这个 view 实例

```ts
function createView(name: string, layer: string, init_props): ViewInstance
```

也可以允许给 view 指定一个 tag，若新实例化的 view 与已存在的 view 具有相同的 tag，将自动销毁已存在的那个 view。这个可以用于保证同类 view 在同一时间只有一个能显示在屏幕上，比如设置页面、存档页面、关于页面可以使用同一个 tag `system_view`，来保证它们不会在同一时间显示

#### 关于平台和 ui 框架无关性

`hz.ui`模块并不清楚 layer 在创建时的具体逻辑，而是调用`hz.agnostic`提供的创建 layer 的方法。这可以保证`layer`即可以是 ZeppOS 的`VIEW_CONTAINER`，也可以是 web 中的 canvas 之类的东西。

view同上。动画、过场、布局等功能，可以由view的具体逻辑实现，比如未来使用AsukaUI的响应式特性简化开发过程、使用fx.js进一步封装而成的过渡动画库等。
