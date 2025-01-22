# 变换与过渡动画

变换与过渡动画可以让你显示一个图像时，指定它的位置、缩放、对齐、旋转角度和透明度等，也能应用与这些属性有关的动画。

变换（transform）应用于一个图像对象，而过渡（transition）包含两个变换，分别应用于旧的图像和新的图像。

## 变换描述文件（Profile）

变换的描述文件叫做 Profile。自定义 Profile 保存在 `project/animation` 文件夹下以 `.json` 结尾的文件中。文件名去除扩展名，并将空格转为下划线后即为变换名称。

一个 Profile 的实例如下：
```json
[
  {
    "frame": { "alpha": 0 }
  },
  {
    "time": 0.8,
    "wrapper": "easein",
    "frame": { "alpha": 1 }
  }
]
```
这是一个 fadein（淡入） 效果，可以使一个图像从全透明渐渐变为不透明。

### Track 与 Section

最外层的数组代表一个 `Track`(轨道)，里面的每个对象为 `Section`(片段)。一个 Track 里的 Section 会被按顺序执行。

对于一个 Section，你可以用 `frame` 字段定义一个关键帧，值为一个对象，里面保存了该关键帧的图像属性。可以配置的图像属性根据所设置的图像不同，而有所不同。一般来说，以下几个为通用属性：
| 属性名     | 类型       | 说明                              |
|:---------:|:---------:|:---------------------------------:|
|`alpha`    |`number`   |透明度(`0`为全透明，`255`为不透明)     |
|`xoffset`  |`number`   |水平方向偏移坐标                     |
|`yoffset`  |`number`   |竖直方向偏移坐标                     |
|`xanchor`  |`number`   |水平方向锚点位置                     |
|`yanchor`  |`number`   |竖直方向锚点位置                     |
|`xalign`   |`number`   |水平方向对齐位置                     |
|`yalign`   |`number`   |竖直方向对齐位置                     |

`time` 字段指定了该 Section 的持续时间，如果未指定，则为瞬间完成。

`wrapper` 字段是动画的映射函数，可以让图像属性的变化速度随时间改变而改变，从而产生更丝滑的视觉效果。

内置的 wrapper 有 `easein`、`easeout`、`ease`、`linear`。

此外，Section 还有 `repeat` 字段，使该 Section 重复执行一定次数。

```json
[
  {
    "frame": { "alpha": 0 }
  },
  {
    "time": 0.8,
    "wrapper": "easein",
    "frame": { "alpha": 1 },
    "repeat": 10
  }
]
```
这样，图像将从全透明淡入为不透明，突然变成全透明，又淡入为不透明... 就这样重复10次。

当 Profile 只包含一个 Section 时，你可以省略外面的数组，比如
```json
{
    "frame": { alpha: 128, xanchor: -1.0, xalign: 0.0 }
}
```
如果这个 Section 恰好又只有 frame 字段，我们可以称之为 **瞬时变换**。

### 多轨 Profile

当然，如果你想创建几条同时执行互不干扰的轨道，你可以在外层使用一个二维数组，第二维的每个数组都是一个 Track，且会同时开始运行。
```json
[
    // Track 1
    [
        {
            "frame": { "alpha": 255 }
        },
        // ...
    ],
    // Track 2
    [
        {
            "frame": { "xoffset": 0 }
        }
        // ...
    ]
]
```
这样，你可以在每个 Track 中分别控制不同的参数，实现复杂的动画。

二维数组已经是一个 Profile 的上限了。

但这还不是 HZengine 变换与过渡系统的全部。

### 同步子变换（syncs）

你可以使用 Section 的 `syncs` 字段指定子变换。子变换会在这个 Section 的关键帧（如果有）执行完后立即执行。`syncs` 是一个数组，里面的每一项都是一个 Profile，所有 Profile 同时开始执行。等全部的子变换都执行完成后，这个 Section 才算执行完成。

```json
[
    {
        "frame": { alpha: 0 }
    },
    {
        "time": 1.0,
        "wrapper": "easein",
        "frame": { alpha: 255 }
    },
    {
        "syncs": [
            [
                {
                    "frame": { xoffset: 0 }
                },
                // ... 对 xoffset 进行一些操作
            ],
            [
                {
                    "frame": { yoffset: 0 }
                }
                // ... 对 yoffset 进行一些操作
            ]
        ]
    },
    // ...
]
```
syncs 的好处是允许你在一个轨道的中间，想对多个参数进行分别控制时，即可用 `syncs` 创建多个子轨分别处理。
还有一个好处是，允许通过嵌套的方式自由组合已有的各种 Profile，从而实现非常复杂的动画效果。

`repeat` 字段对 `syncs` 同样有效。当一个 Section 同时指定了 `frame`、`syncs`、`repeat` 时，会先执行关键帧，再执行 syncs，然后从头开始，执行关键帧，然后执行 syncs...

### 异步子变换（async）

如果你希望一个 Section 启动子变换后，不等待子变换完成而立即执行下一个 Section，可以使用 `asyncs` 字段指定 **异步子变换**（相反地，`syncs` 指定的子变换称为 **同步子变换**）。

总结一下，

`Profile` 是变换声明文件，`Section` 是一个变换的基本单位，`Track` 包含若干个顺序执行的 `Section`

一个 `Profile` 既可以是一个 `Track`，也可以是单个的 `Section`，或是 `Track`的数组（其中每个 `Track` 同时开始执行）

`Section` 包含的字段如下

|   字段    |   类型    |   说明    |   必须    |
|:--------:|:---------:|:--------:|:--------:|
|`time`    |`number`   |持续时间   |否         |
|`wrapper` |`string`   |映射函数   |否         |
|`frame`   |`object`   |关键帧属性 |否         |
|`syncs`   |`Profile[]`|同步子变换 |否         |
|`asyncs`  |`Profile[]`|异步子变换 |否         |
|`repeat`  |`number`   |重复次数   |否         |

### 内置 Profile
:::tip 提示
内置 Profile 仍未实装
:::
|名称|说明|
|:--------:|:--------:|
|`fadein`|淡入效果|
|`fadeout`|淡出效果|
|`move_right_out`|缓慢移出屏幕右侧|
|`move_left_out`|缓慢移出屏幕左侧|
|`move_right_in`|缓慢从屏幕右侧移入|
|`move_left_in`|缓慢从屏幕左侧移入|
|`shake`|屏幕摇晃效果|

## 过渡（Transition）
**过渡** 由 创建变换 和 清除变换 组成。

当我们需要使背景图从一个场景切换到另一个场景时，我们明确了一个要创建的图像：新的场景图片，和一个要清除的图像：旧的场景图片。创建变换和清除变换分别应用与这两种图像，从而实现转场过渡的效果。

人物立绘的切换、ui界面的切换也是如此。

在 HZengine Script 中，使用 **transition 语句** 可以创建一个过渡。

```renpy
transition <过渡名称> = (<清除变换>, <创建变换>)
```

例如，我们想组合现有的 fadeout(淡出) 与 fadein(淡入) 变换，使其称为一个 fade 过渡，可以这样写：
```renpy
transition fade = (fadeout, fadein)
```
:::tip 提示
由于 HZScript 的塑料解释器较为鸡肋（以及本人的懒癌），`=` 的前后必须要有至少一个空格，否则可能会报错。
:::

此处的等号、括号是必须的。括号代表一个元组，里面的元素用`,`隔开。transition 是一个二元组，如果传递了一个一元组，相当于创建变换为空。

如果你想指定多个变换作为清除或创建变换，可以使用数组，例如
```renpy
transition multi_trans = ([out_profile1, out_profile2, out_profile3], in_profile)
```
这样清除变换就由三个变换组成。发生冲突时，右侧的变换会覆盖左侧的变换。

如果不想指定清除或创建变换，可以使用`none`占位符（实际上是一个内置的空变换）：
```renpy
transition only_in = (none, fadein)
```

## 使用变换和过渡
目前，`show`、`scene`、`hide`语句支持应用变换与过渡。

在这三个语句的 `with` 字段内指定过渡名称，即可应用过渡
```renpy
show ningning happy with fade
```
人物的上一张立绘将被淡出，同时新的立绘淡入，整体呈现渐变的效果。

要指定多个过渡，使用逗号隔开
```renpy
show ningning angry with fade, push_to_right
```

你也可以直接把 transition 的元组写在 with 后面，这样无需指定过渡名称，称为 **匿名过渡**：
```renpy
scene bg cafe room2 with (move_right_out, move_right_in)
```

让一个气球摇晃并淡出：
```renpy
hide ballon with ([shake, fadeout])
```

## 关于变换与过渡动画系统的实现
HZengine 的变换与过渡系统基于新开发的 `animation.js`，其提供了多轨动画、自定义映射函数、声明式关键帧语法等功能。一个 Animation 对象本质上是一个以时间为自变量的函数，意味着你可以把时间换元成滑动坐标等，为未来许多复杂功能打下基础。

在 HZengine 内部，变换与过渡动画系统作为内置的 `transform` 插件，也提供了快速创建动画的 JavaScript 接口，开发者编写的自定义页面和插件可以轻松应用动画，且 `animation.js` 支持持久化的特点甚至能让动画状态随存档保存，让你能创建一个贯穿整个游戏流程的长时间循环动画。

`animation.js` 是一个平台无关的、仅用作属性计算的库，`transform` 插件下的 `hz_anime.js` 负责管理 profile，并提供 animation 的持久化功能、对外调用的接口。