# 循环语句(while)

实现循环的方式有很多种。比如组合使用 jump 和 if 就能实现循环：

```renpy
* start
$ sd.times = 0

* 轮回
"这是你第[++sd.times]次轮回了"
if sd.times >= 10
    "恭喜你，轮回了10次，可以解放了"
    jump 轮回之后的故事
end if
"你还得继续轮回"
jump 轮回

* 轮回之后的故事
# ...
```

而本章要介绍的 while 语句，实际上是结合了条件判断与跳转。

## while 语句

while 是多行语句，由开始命令 `while` 和结束命令 `end while` 组成。

* `while` 开始命令，后面加一个表达式。如果表达式的值为 true，则执行 while 和 end while 之间的语句块，否则就跳过。
* `end while` 结束命令，后面不加任何东西。

每当 while 中的语句块执行完一遍后，都会重新对 while 后面的表达式进行求值，如果是 true，就再重复执行一遍......

举个栗子

<pre class="language-renpy"><code class="lang-renpy"><strong>$ sd.好感度 = 0
</strong><strong>while sd.好感度 &#x3C; 10
</strong><strong>    "你的好感度现在是[sd.好感度]，继续加油哦！"
</strong><strong>    # ...
</strong><strong>    "...美好的一天又结束了"
</strong><strong>    sd.好感度++
</strong><strong>end while
</strong><strong>"你的好感度终于达到10啦！"
</strong></code></pre>

## 无限循环

如果像下面这样，将 while 后面的表达式直接设置为 true，会陷入无限循环

```renpy
while true
    "啊？这里貌似是个无限循环"
end while
```

## 嵌套使用 while 语句

while 语句可以嵌套使用，此处不作赘述。请注意每个 while 都要有对应的 end while。

## 使用 break 强制退出循环

break 是个单行语句。你可以使用 break 语句来跳出当前的循环，比如

<pre class="language-renpy"><code class="lang-renpy"><strong>$ sd.times = 0
</strong><strong>while true
</strong>    "我" "哈喽"
    $ sd.times++
    if sd.times >= 20
        "你已经哈喽20次了，可以休息了"
        break   # 强制退出循环
    end if
end while
"休息..."
</code></pre>

当使用了嵌套 while 语句时，break 只会跳出最内层的 while 循环。



循环语句就介绍到这啦 QAQ。三连投币加关注（bushi）
