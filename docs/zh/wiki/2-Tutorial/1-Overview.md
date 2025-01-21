# 概览

HZengine Script 是 HZengine 的专用脚本语言，针对视觉小说创作设计了简洁高效的语法。 其风格参考了 Ren'Py 语言。

HZengine Script 是以 .hzs 结尾的文本文件，用来编写剧本和演出。 你可以使用 VS Code、Sublime Text、Notepad++ 甚至系统自带的记事本软件打开和编辑 .hzs 文件。请注意使用 utf8 编码加载和保存，以免出现乱码。

hzs 文件存放在项目文件夹的 project/script 目录下。 你可以在 script 文件夹下创建子文件夹，按你的喜好将 hzs 文件分别存放在不同的子文件夹下， 但注意放在 script 文件夹外面的 hzs 文件不会被加载。

hzs 文件的命名没有特殊的规范，你可以按照自己的喜好命名 hzs 文件，只要它是 .hzs 结尾。

HZ Engine 在运行视觉小说时，会以一个 hzs 文件为单位加载到内存中，如果你的 hzs 文件过大，请考虑将其拆散成多个小的 hzs 文件。通常每个 hzs 文件不超过 500KB。
