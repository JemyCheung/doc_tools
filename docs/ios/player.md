##  硬解切换前后台失败，pause 和resume，报错 Decode fail
研发建议使用软解码：

##  播放器seek失败
- index table = moov

- 失败的原因
弱网情况下如果 index table太大，可能还没下载完；视频太长，seek的跨度过大等
整体来说seek失败一种正常现象，可以监听seek结果回调，对seek成功or失败进行处理。

##  播放器切换url，在加载前会显示上一个视频的画面

问题：调用- (BOOL)playWithURL:(nullable NSURL x)URL sameSource:(BOOL)sameSource更换url
新url状态变为playing，还有上个视频画面
解决方式：预期场景，之前客户提的需求，要解决需要手动销毁 新建播放器，由于视图清空，会有黑屏现象
可以先新建播放器，在销毁，或者在切换url前在播放器图层上添加一层封面或遮挡的黑色view，在收到playing状态回调时移除。

##  播放器播放的过程中手机息屏
  在使用播放器的过程中保持 [UIApplication sharedApplication].idleTimerDisabled = YES;

##  3.4.0 后台恢复前台，画面卡主，声音正常
具体场景：直播rtmp，不区分软硬解

监听前后台，进入前台调用play，后台调用stop
```
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onUIApplicationWillResignBackground) name:UIApplicationWillResignActiveNotification object:nil];
[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onUIApplicationWillEnterForeground) name:UIApplicationDidBecomeActiveNotification object:nil];
```
现象：恢复前台画面卡主，声音正常
调整方法：

player.enableRender = YES;

[player play];

##  hls 格式不支持缓存原因
HLS 流，有很多是多码率的，也就是一个 hls 里面可能会有多重清晰度的流，比如超清，标清，客户会根据网络状态动态切换不同的清晰度，如果要做缓存功能，会比较麻烦，不同的清晰度的切片对齐是一个麻烦，而且体验不好，因为回放的时候，可能会出现一会很清晰一会模糊，如果另外开一路线程去拉高清码流，又占用太多用户带宽，影响播放体验。

##  播放器减少延迟 触发快放的条件
减少延迟 触发快放的条件是
QCPLAY_PID_PlayBuff_MaxTime
QCPLAY_PID_PlayBuff_MinTime

不在这这两个参数的值之间就触发,默认500 ~ 2000，一旦超过这个阈值就触发

播放的速度会不会越来越大？
有可能的,快放的速度小于延时的增加速度就可能，快放的速度是大于 1 的，为了保证平滑的播放效果,不能设置得太大

##  播放器播放多声道资源
目前qplayer对1、2、5、6个channel的资源能兼容播放，对部分人生采集特殊的双声道外放不正常，耳机可以



##  打包模拟器注意事项
待完成

##  播放器的创建线程问题
问：创建一个播放对象的时候大约会新建8条线程，调用销毁对象的方法线程还是存在，一般什么时机会清理这些线程呢，客户担心线程太多会造成卡顿
答：销毁播放器对象线程还在运行，说明还有和播放器对象无关的一些线程处理，由系统控制的，我们的实际代码操作不到，遇到卡顿系统会择优处理的，大概率也不会遇到因线程量多导致卡顿的，遇到卡顿的情况，一般先从代码层面进行排除
qplayer线程的数量已经是较优状态，由于内部线程管理复杂麻烦，不会再进行较大的调整


##  播放器播放短视频的首开时间
  qplayer对MP4格式短视频首开时间在0.2~0.5秒左右，如果客户场景类似于抖音，不需要使用预加载的功能即可达到较好的首开效果，该场景下不建议客户使用hls的格式，该格式首开时间长于MP4，体验较差；不推荐使用预加载功能，该功能会占用带宽，影响正在播放的视频。

##  播放器PLPlayerOptionKeyTimeoutIntervalForMediaPackets与实际超时回调时间不符
问题：pili 层自动重连关闭  PLPlayerOptionKeyTimeoutIntervalForMediaPackets 设置1
主播断开到播放段回调到error要10 ~12秒的样子
原因：qplayer 播放直播链接，默认超时时间5秒，超时后qplayer至少进行一次重连，重连时间10秒左右
qplayer重连失败后，反馈PLPlayerErrorHTTPErrorHTTPConnectFailed 到霹雳层，客户收到stopwitherror的回调

##  播放器怎么指定httpDns，或怎么指定只使用localDns
  播放器option的属性值PLPlayerOptionKeyDNSManager如果不设置，默认使用0.0.0.0，底层的处理逻辑目前不清楚，但会使用腾讯或阿里的httpdns服务。
如果客户想指定httpdns地址，按如下代码设置：
[option setOptionValue:@"x.x.x.x" forKey:PLPlayerOptionKeyDNSManager];
如果客户想指定使用localDns，按如下代码设置：

[option setOptionValue:@"127.0.0.1" forKey:PLPlayerOptionKeyDNSManager];
##  3.4.3播放器在xcode10上打包失败，bitcode失败
 关闭bitcode灰度包
真机：http://pr8hjn86c.bkt.clouddn.com/noBitcode-PLPlayerKit.framework.zip
真机+模拟器：http://o9zmf8ght.bkt.clouddn.com/Universal-PLPlayerKit.framework.zip

##  iphoneX等屏幕比例非9：16的设备全屏播放问题
  苹果iphone8及之前的手机系列产品屏幕比例都是标准的9：16，从iphoneX开始转为使用非9：16的刘海屏尺寸，而目前较为常见的视频分辨率比例是9：16，这就导致视频在iphoneX以上设备上播放无法完美铺满整个屏幕，客户反馈的问题一般是：无法铺满或画面有剪切。
针对这个问题，可以提供给客户这三种画面布局填充方案，可以按App场景来选择：
- 视频按原比例全部显示在屏幕上，但上下会有黑边。对应player.playView.contentMode = UIViewContentModeScaleAspectFit;
- 视频铺满整个屏幕，不留黑边，但因为比例不一致，会有左右方向的视频溢出部分会被剪切掉，对应player.playView.contentMode = UIViewContentModeScaleAspectFill;
- 视频变换比例铺满整个屏幕，由于是强行铺满，画面会有纵向拉伸效果，对应player.playView.contentMode = UIViewContentModeScaleToFill;



* 由于比例的不同，想把比例不一致的屏幕和视频强行铺满是不切实际的（不拉伸的情况下），然而有些客户就是比较执着：“iphone6s可以，iphoneX怎么就不可以，人家抖音。。。   ”，碰到这种问题，可以给他举个栗子，一张短粗胖的照片，没办法放进一个苗条的相框里，除非给相框拆了。

##  stop不清屏
播放器在stop的时候会保留最后一一帧画面，playwithurl切换到新播放地址的时候，网络不好或其他原因，会导致画面停留在上一个视频中
可以添加个launchView，设置个黑色图片来规避，目前sdk没有办法处理，之前调整过几次会引起比较严重的用户体验问题，所以在使用方式上规避一下

##  播放器的日志搜集
目前播放器分为两层，底层是Qplayer层，外层是pili层，两层分别有各自的日志写入功能，其中Qplayer层的日志比较重要：
Qplayer层：需要把loglevel设置成verbose级别，日志会保存在沙盒Document目录下，文件名core.txt，Qplayer层的日志比较重要，一般是排查问题的依据，开启代码如下：

[option setOptionValue:@(kPLLogVerbose) forKey:PLPlayerOptionKeyLogLevel];

Pili层：level只要不是kPLLogNone，都会写入到本地，路径是沙盒/Library/Caches/Pili/PlayerLogs，Pili层的log数量受level的级别影响，级别越高日志越详细，但一般排查问题很少用到：



##  v3.4.3之前版本设置contentMode在iOS13设备上运行闪退
闪退信息如下：

Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: 'Cannot get value with size 32. The type encoded as q is expected to be 8 bytes'

*** First throw call stack:

(0x1975d898c 0x1973010a4 0x1979c3de4 0x19b2315bc 0x19b2312b8 0x10592700c 0x197983a28 0x197985a84 0x1979854d8 0x1978d4dbc 0x197981078 0x1043049fc 0x1979c1238 0x1975567e0 0x197556738 0x197555ed0 0x19755101c 0x1975508bc 0x1a13bc328 0x19b5e66d4 0x1042f9334 0x1973db460)

libc++abi.dylib: terminating with uncaught exception of type NSException

问题原因：3.4.3之前版本对iOS13的兼容性问题

解决方案：升级sdk版本到3.4.3
