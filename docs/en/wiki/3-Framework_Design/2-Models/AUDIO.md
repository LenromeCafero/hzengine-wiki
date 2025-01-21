# AUDIO 音频模块

`hz.audio` 将音频系统抽象为多个不同的通道(channel)，比如

* `voice` 播放角色录音的通道
* `music` 播放bgm的通道
* `sound` 播放音效的通道

每个通道同一时间只允许一段音频播放。多个通道同时播放时，需要混音来叠加声音。由于ZeppOS没有提供相关能力，因此在ZeppOS上暂时只能有一个通道，这意味着不能同时播放bgm和人物配音

每个通道包含一个待播放音频队列(queue)，并允许设置不同的播放模式，如`repeat(单曲循环)`, `order(顺序播放)`, `list_loop(列表循环)`

音频资源的寻址交给hz.storage实现，而hz.storage通过hz.agnostic访问文件系统；音频的播放和混音具体逻辑和状态控制、回调由hz.agnostic实现
