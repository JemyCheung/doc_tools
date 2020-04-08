# 播放器
## 播放居中  

```<com.pili.pldroid.player.widget.PLVideoTextureView
        android:id="@+id/VideoView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="center" />
```  

## 画面被裁减、拉伸、留有黑边、显示不全  

这个是预期的，1:1的视频是没法放到1:2的显示器上让它完全填充显示器还不变形的  
![](http://cdn.iorange.vip/065a5c567bb06caed1e0847704bba91c.jpg)  

## rtmp播放延时大  

延时是多方面共同造成的。这里只讲播放器这端可以调整的部分。    
播放器缓存策略会缓存一部分数据，可能会导致延时增大，按下面参数试一试，或者可以再相应减少一点点测试一下   

```
// 默认的缓存大小，单位是 ms，默认值是：500  
options.setInteger(AVOptions.KEY_CACHE_BUFFER_DURATION, 400);  

// 最大的缓存大小，单位是 ms，默认值是：2000  
options.setInteger(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION, 1000);
```   
## 检查视频本身信息的 ffprobe 的使用  

使用 -show_packets 参数查看包信息 ffprobe -show_packets -of compact 路径 | grep video |grep flags=K 两个packet之间pts_time差可以看做 gop的大小  

以 JSON 格式显示每个流的信息 ffprobe -print_format json -show_streams test.mp4 显示容器格式相关信息 ffprobe -show_format test.mp4 使用 -show_frames 参数查看视频中的帧信息 ffprobe -show_frames test.mp4  

## ffplay 如何进行音视频调试  

显示宏块 ffplay -debug vis_mb_type inputfile  

显示运动矢量 ffplay -vismv pf inputfile -vismv pf – 向前预测P帧图像运动向量 -vismv bf – 向前预测B帧图像运动向量 -vismv bb – 向后预测B帧图像运动向量 eg: ffplay -vismv pf -vismv bf -vismv bb https://youban-test.oss-cn-shanghai.aliyuncs.com/dev/ManualUploadFile/2018/07/25/14/15cbaae70a97d144dc839c3799a1e07642.mp4

显示音频波型 ffplay -showmode 1 sample.mp4 show mode (0 = video, 1 = waves, 2 = RDFT)  

## 关于播放器重连  

播放器的重连是在开始播放之后的，如果第一次就失败了，不会触发底层的重连 之前也有客户反馈过，现在的 IO_ERROR 过于频繁，网络稍微抖动一下就会出现，没法真正判断什么时候应该手动重连。所以建议在 onError里的 ERROR_CODE_OPEN_FAILED 即-2 进行手动重连（在app层重连就是setVideoURL再start的过程） 如果使用的是 PLVideoView 或者 PLVideoTextureView，重连的方法如下： mVideoView.setVideoPath(mVideoPath); mVideoView.start(); 如果使用的是 PLMediaPlayer，重连的方法如下： mMediaPlayer.reset(); mMediaPlayer.setDisplay(mSurfaceView.getHolder()); mMediaPlayer.setDataSource(mVideoPath); mMediaPlayer.prepareAsync();  

## 关于七牛播放器拖动的问题  

断网后播放视频缓存时前后拖拽进度条不起作用? ==> 拖动是要访问网络取拖动的关键帧，没有网络，自然拖不动  

进度条拖动的时候，离手时的时间和即播放的时间对不上，有时快几秒，有时慢几秒。 ==> 拖动的核心原理就是取关键帧，松手的点不一定是刚好是关键帧，自然有些偏差  

## 七牛播放器里面demo 类的说明与选择  

目前七牛播放器SDK的demo里面有这样一些类：

"PLMediaPlayerActivity", "PLAudioPlayerActivity", "PLVideoViewActivity", "PLVideoTextureActivity",

其中Audio肯定是指播放纯银频的，这个不用说，其他的使用方法基本相同，唯一的区别在于PLMediaView 、PLVideoView 类使用了 SurfaceView 来完成视频画面的渲染，而 PLVideoTextureView 采用了 TextureView 完成视频画面的渲染 ，因此，在这里合并在一起来介绍。  



SurfaceView和TextureView  

SurfaceView和TextureView都继承自android.view.View类。它们可以从单独的线程中绘制和渲染，这是与其他视图的主要区别。 Crosswalk单独使用绘图功能，通过专用GPU线程大大提高渲染性能。

SurfaceView提供嵌入视图层次结构内部的专用绘图表面。你可以控制这个曲面的格式和大小; SurfaceView会将表面放置在屏幕上的正确位置。它的行为或多或少地类似于传统桌面系统上的屏幕窗口，例如，X11系统上的XWindow，它可以是无框的，并嵌入在另一个XWindow中。

以下是SurfaceView的两个限制：

不能动画，变换和缩放;

不能覆盖两个SurfaceView。

TextureView看起来像一个普通的View。你可以动画，变换和缩放它，就像一个TextView。 TextureView只能在硬件加速窗口中使用。然而，TextureView将消耗比SurfaceView更多的内存，也可能有1〜3帧延迟。

参考：

1，http://developer.Android.com/reference/android/view/SurfaceView.html 2，http://developer.android.com/reference/android/view/TextureView.html

## 播放端全屏设置  

Android 播放端全屏 ==> setDisplayAspectRatio ==> ASPECT_RATIO_PAVED_PARENT 附：iOS播放端保持比例并填满屏幕 ==> player.playerView.contentMode = UIViewContentModeScaleAspectFill  

## 播放端 有哪个方法可以获取视频的方向的吗？  

OnInfoListener.MEDIA_INFO_VIDEO_ROTATION_CHANGED

## android 播放端显示主播离开的逻辑实现  

1、首先要知道主播什么时候停止推流，这个可以在主播退出推流页面的时候向客户的业务服务器发送一个通知，告诉业务服务器推流已结束；

2、播放端在每次需要重连时去请求流的状态，如果是推流已结束，则退出播放页面，否则在读取不到流的时候就显示“主播离开请稍后”类似提醒，或者播放端和客户的业务器保持一个长连接，在业务服务器接收到推流结束通知的时候，通知播放端退出播放页面，其他读不到流的时候等待就可以了。

## Android播放端debug开启  

mAVOptions.setInteger(AVOptions.KEY_LOG_LEVEL, 0); KEY_LOG_LEVEL 有5级

## 播放卡顿的问题排查思路？  

1，确认是主播推流就卡，还是个别客户端播放卡 2，RTMP 直播还是 HLS 回放 3，卡顿端，确认网络环境，2G/3G/4G/WiFi 4，访问 www.speedtest.net 这个链接 测试带宽，一般来说5M左右不卡

## 播放端处理后台播放的音乐  

有其它app后台播放音乐时，使用 PLMediaPlayer ，进入直播后台音乐会暂停；在观看直播状态切入后台，打开其它app播放音乐，再切回观看直播界面，后台音乐通史播放，如何让后台音乐暂停

首先第一种情况：

进入直播时在 activity 的 onCreate 中会调用

AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE); audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN); 使后台音乐失焦；



第二种切回前台的情况：

不经过 onCreate ，所以对后台音乐没有影响；

如果需要在这种情况下，暂停后台音乐，可以在观看直播的 activity 的 onResuem 中调用

AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE); audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);

## 播放端键盘挤压画面处理  

manifest 中添加 windowSoftInputMode 属性 android:windowSoftInputMode="adjustPan"

播放端demo如何隐藏默认播放控件
使用 PLVideoTextureView 和 PLVideoView 时，播放的 UI 控件是由 MediaController 管理，开发者可以参考 sdk demo 自行实现自定义的 UI 控件，如果直接使用 demo 中的 MediaController 同时又希望不显示 UI 控件，如下修改 MediaController

public void show(int timeout) { if (true) return; }

## 播放画中画显示效果  

参考 http://www.cnblogs.com/mythou/p/3250302.html

## 自定义七牛播放器VideoView或MediaPlayer的MediaController播放样式  

https://blog.csdn.net/midux/article/details/79664595 demo下载地址为：https://github.com/midux001/mediacontroller
