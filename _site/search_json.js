window.ydoc_plugin_search_json = {
  "Android": [
    {
      "title": "Qiniu SDK",
      "content": "Introduce how to use Qiniu SDK and Frequently Asked Questions",
      "url": "/android/android.html",
      "children": []
    },
    {
      "title": "播放器",
      "content": "",
      "url": "/android/player.html",
      "children": [
        {
          "title": "播放居中",
          "url": "/android/player.html#播放居中",
          "content": "播放居中        android:id=\"@+id/VideoView\"        android:layout_width=\"match_parent\"\n        android:layout_height=\"match_parent\"\n        android:layout_gravity=\"center\" />\n"
        },
        {
          "title": "画面被裁减、拉伸、留有黑边、显示不全",
          "url": "/android/player.html#画面被裁减、拉伸、留有黑边、显示不全",
          "content": "画面被裁减、拉伸、留有黑边、显示不全这个是预期的，1:1的视频是没法放到1:2的显示器上让它完全填充显示器还不变形的"
        },
        {
          "title": "rtmp播放延时大",
          "url": "/android/player.html#rtmp播放延时大",
          "content": "rtmp播放延时大延时是多方面共同造成的。这里只讲播放器这端可以调整的部分。播放器缓存策略会缓存一部分数据，可能会导致延时增大，按下面参数试一试，或者可以再相应减少一点点测试一下// 默认的缓存大小，单位是 ms，默认值是：500  options.setInteger(AVOptions.KEY_CACHE_BUFFER_DURATION, 400);  \n\n// 最大的缓存大小，单位是 ms，默认值是：2000  \noptions.setInteger(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION, 1000);\n"
        },
        {
          "title": "检查视频本身信息的 ffprobe 的使用",
          "url": "/android/player.html#检查视频本身信息的-ffprobe-的使用",
          "content": "检查视频本身信息的 ffprobe 的使用使用 -show_packets 参数查看包信息 ffprobe -show_packets -of compact 路径 | grep video |grep flags=K 两个packet之间pts_time差可以看做 gop的大小以 JSON 格式显示每个流的信息 ffprobe -print_format json -show_streams test.mp4 显示容器格式相关信息 ffprobe -show_format test.mp4 使用 -show_frames 参数查看视频中的帧信息 ffprobe -show_frames test.mp4"
        },
        {
          "title": "ffplay 如何进行音视频调试",
          "url": "/android/player.html#ffplay-如何进行音视频调试",
          "content": "ffplay 如何进行音视频调试显示宏块 ffplay -debug vis_mb_type inputfile显示运动矢量 ffplay -vismv pf inputfile -vismv pf – 向前预测P帧图像运动向量 -vismv bf – 向前预测B帧图像运动向量 -vismv bb – 向后预测B帧图像运动向量 eg: ffplay -vismv pf -vismv bf -vismv bb https://youban-test.oss-cn-shanghai.aliyuncs.com/dev/ManualUploadFile/2018/07/25/14/15cbaae70a97d144dc839c3799a1e07642.mp4显示音频波型 ffplay -showmode 1 sample.mp4 show mode (0 = video, 1 = waves, 2 = RDFT)"
        },
        {
          "title": "关于播放器重连",
          "url": "/android/player.html#关于播放器重连",
          "content": "关于播放器重连播放器的重连是在开始播放之后的，如果第一次就失败了，不会触发底层的重连 之前也有客户反馈过，现在的 IO_ERROR 过于频繁，网络稍微抖动一下就会出现，没法真正判断什么时候应该手动重连。所以建议在 onError里的 ERROR_CODE_OPEN_FAILED 即-2 进行手动重连（在app层重连就是setVideoURL再start的过程） 如果使用的是 PLVideoView 或者 PLVideoTextureView，重连的方法如下： mVideoView.setVideoPath(mVideoPath); mVideoView.start(); 如果使用的是 PLMediaPlayer，重连的方法如下： mMediaPlayer.reset(); mMediaPlayer.setDisplay(mSurfaceView.getHolder()); mMediaPlayer.setDataSource(mVideoPath); mMediaPlayer.prepareAsync();"
        },
        {
          "title": "关于七牛播放器拖动的问题",
          "url": "/android/player.html#关于七牛播放器拖动的问题",
          "content": "关于七牛播放器拖动的问题断网后播放视频缓存时前后拖拽进度条不起作用? ==> 拖动是要访问网络取拖动的关键帧，没有网络，自然拖不动进度条拖动的时候，离手时的时间和即播放的时间对不上，有时快几秒，有时慢几秒。 ==> 拖动的核心原理就是取关键帧，松手的点不一定是刚好是关键帧，自然有些偏差"
        },
        {
          "title": "七牛播放器里面demo 类的说明与选择",
          "url": "/android/player.html#七牛播放器里面demo-类的说明与选择",
          "content": "七牛播放器里面demo 类的说明与选择目前七牛播放器SDK的demo里面有这样一些类：\"PLMediaPlayerActivity\", \"PLAudioPlayerActivity\", \"PLVideoViewActivity\", \"PLVideoTextureActivity\",其中Audio肯定是指播放纯银频的，这个不用说，其他的使用方法基本相同，唯一的区别在于PLMediaView 、PLVideoView 类使用了 SurfaceView 来完成视频画面的渲染，而 PLVideoTextureView 采用了 TextureView 完成视频画面的渲染 ，因此，在这里合并在一起来介绍。SurfaceView和TextureViewSurfaceView和TextureView都继承自android.view.View类。它们可以从单独的线程中绘制和渲染，这是与其他视图的主要区别。 Crosswalk单独使用绘图功能，通过专用GPU线程大大提高渲染性能。SurfaceView提供嵌入视图层次结构内部的专用绘图表面。你可以控制这个曲面的格式和大小; SurfaceView会将表面放置在屏幕上的正确位置。它的行为或多或少地类似于传统桌面系统上的屏幕窗口，例如，X11系统上的XWindow，它可以是无框的，并嵌入在另一个XWindow中。以下是SurfaceView的两个限制：不能动画，变换和缩放;不能覆盖两个SurfaceView。TextureView看起来像一个普通的View。你可以动画，变换和缩放它，就像一个TextView。 TextureView只能在硬件加速窗口中使用。然而，TextureView将消耗比SurfaceView更多的内存，也可能有1〜3帧延迟。参考：1，http://developer.Android.com/reference/android/view/SurfaceView.html 2，http://developer.android.com/reference/android/view/TextureView.html"
        },
        {
          "title": "播放端全屏设置",
          "url": "/android/player.html#播放端全屏设置",
          "content": "播放端全屏设置Android 播放端全屏 ==> setDisplayAspectRatio ==> ASPECT_RATIO_PAVED_PARENT 附：iOS播放端保持比例并填满屏幕 ==> player.playerView.contentMode = UIViewContentModeScaleAspectFill"
        },
        {
          "title": "播放端 有哪个方法可以获取视频的方向的吗？",
          "url": "/android/player.html#播放端-有哪个方法可以获取视频的方向的吗？",
          "content": "播放端 有哪个方法可以获取视频的方向的吗？OnInfoListener.MEDIA_INFO_VIDEO_ROTATION_CHANGED"
        },
        {
          "title": "android 播放端显示主播离开的逻辑实现",
          "url": "/android/player.html#android-播放端显示主播离开的逻辑实现",
          "content": "android 播放端显示主播离开的逻辑实现1、首先要知道主播什么时候停止推流，这个可以在主播退出推流页面的时候向客户的业务服务器发送一个通知，告诉业务服务器推流已结束；2、播放端在每次需要重连时去请求流的状态，如果是推流已结束，则退出播放页面，否则在读取不到流的时候就显示“主播离开请稍后”类似提醒，或者播放端和客户的业务器保持一个长连接，在业务服务器接收到推流结束通知的时候，通知播放端退出播放页面，其他读不到流的时候等待就可以了。"
        },
        {
          "title": "Android播放端debug开启",
          "url": "/android/player.html#android播放端debug开启",
          "content": "Android播放端debug开启mAVOptions.setInteger(AVOptions.KEY_LOG_LEVEL, 0); KEY_LOG_LEVEL 有5级"
        },
        {
          "title": "播放卡顿的问题排查思路？",
          "url": "/android/player.html#播放卡顿的问题排查思路？",
          "content": "播放卡顿的问题排查思路？1，确认是主播推流就卡，还是个别客户端播放卡 2，RTMP 直播还是 HLS 回放 3，卡顿端，确认网络环境，2G/3G/4G/WiFi 4，访问 www.speedtest.net 这个链接 测试带宽，一般来说5M左右不卡"
        },
        {
          "title": "播放端处理后台播放的音乐",
          "url": "/android/player.html#播放端处理后台播放的音乐",
          "content": "播放端处理后台播放的音乐有其它app后台播放音乐时，使用 PLMediaPlayer ，进入直播后台音乐会暂停；在观看直播状态切入后台，打开其它app播放音乐，再切回观看直播界面，后台音乐通史播放，如何让后台音乐暂停首先第一种情况：进入直播时在 activity 的 onCreate 中会调用AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE); audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN); 使后台音乐失焦；第二种切回前台的情况：不经过 onCreate ，所以对后台音乐没有影响；如果需要在这种情况下，暂停后台音乐，可以在观看直播的 activity 的 onResuem 中调用AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE); audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);"
        },
        {
          "title": "播放端键盘挤压画面处理",
          "url": "/android/player.html#播放端键盘挤压画面处理",
          "content": "播放端键盘挤压画面处理manifest 中添加 windowSoftInputMode 属性 android:windowSoftInputMode=\"adjustPan\"播放端demo如何隐藏默认播放控件使用 PLVideoTextureView 和 PLVideoView 时，播放的 UI 控件是由 MediaController 管理，开发者可以参考 sdk demo 自行实现自定义的 UI 控件，如果直接使用 demo 中的 MediaController 同时又希望不显示 UI 控件，如下修改 MediaControllerpublic void show(int timeout) { if (true) return; }"
        },
        {
          "title": "播放画中画显示效果",
          "url": "/android/player.html#播放画中画显示效果",
          "content": "播放画中画显示效果参考 http://www.cnblogs.com/mythou/p/3250302.html"
        },
        {
          "title": "自定义七牛播放器VideoView或MediaPlayer的MediaController播放样式",
          "url": "/android/player.html#自定义七牛播放器videoview或mediaplayer的mediacontroller播放样式",
          "content": "自定义七牛播放器VideoView或MediaPlayer的MediaController播放样式https://blog.csdn.net/midux/article/details/79664595 demo下载地址为：https://github.com/midux001/mediacontroller"
        }
      ]
    },
    {
      "title": "直播",
      "content": "",
      "url": "/android/streaming.html",
      "children": [
        {
          "title": "基本概念",
          "url": "/android/streaming.html#基本概念",
          "content": "基本概念关于 分辨率、帧率、码率 等编码基本概念可以参考以下文档H.264 一般规范\n分辨率、帧率、码率的相互关系"
        },
        {
          "title": "一组建议值",
          "url": "/android/streaming.html#一组建议值",
          "content": "一组建议值关于分档的【标清、高清、超清】，目前并不是通用标准，多数视频站点使用各自的标准，一般只是作为区分的不同视频质量的标识。\n\n画质\n码率\n分辨率\n帧率\n\n\n\n\n标清\n800 kbps\n360x640\n15\n\n\n高清\n1.2 mbps\n540x960\n20\n\n\n超清\n1.8 mbps\n720x1280\n20\n\n\n"
        },
        {
          "title": "对应在 sdk 中的配置",
          "url": "/android/streaming.html#对应在-sdk-中的配置",
          "content": "对应在 sdk 中的配置// 标清StreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(15,800*1024,15,StreamingProfile.H264Profile.BASELINE);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(360,640)\n\t\t\t\t.setAVProfile(avProfile)\n\n// 高清\nStreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(20,1.2*1024*1024,20,StreamingProfile.H264Profile.BASELINE);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(540,960)\n\t\t\t\t.setAVProfile(avProfile)\n\n// 超清\nStreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(20,1.8*1024*1024,20,StreamingProfile.H264Profile.HIGH);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(720,1280)\n\t\t\t\t.setAVProfile(avProfile)\n"
        },
        {
          "title": "推流SDK关键日志",
          "url": "/android/streaming.html#推流sdk关键日志",
          "content": "推流SDK关键日志"
        },
        {
          "title": "提供 Android 的日志",
          "url": "/android/streaming.html#推流sdk关键日志-提供-android-的日志",
          "content": "提供 Android 的日志$ adb logcat -v threadtime > log.txt"
        },
        {
          "title": "打开最高的日志级别",
          "url": "/android/streaming.html#推流sdk关键日志-打开最高的日志级别",
          "content": "打开最高的日志级别StreamingEnv.setLogLevel(Log.VERBOSE)"
        },
        {
          "title": "如何过滤推流 SDK 输出的日志",
          "url": "/android/streaming.html#推流sdk关键日志-如何过滤推流-sdk-输出的日志",
          "content": "如何过滤推流 SDK 输出的日志$ adb logcat -v threadtime -s PLDroidMediaStreaming"
        },
        {
          "title": "如何查看客户的调用姿势",
          "url": "/android/streaming.html#推流sdk关键日志-如何查看客户的调用姿势",
          "content": "如何查看客户的调用姿势$ adb logcat -v threadtime | grep Pili-Interface"
        },
        {
          "title": "如何查看客户的系统和版本信息",
          "url": "/android/streaming.html#推流sdk关键日志-如何查看客户的系统和版本信息",
          "content": "如何查看客户的系统和版本信息$ adb logcat -s PLDroidMediaStreaming | grep Pili-System"
        },
        {
          "title": "如何查看客户的推流参数配置",
          "url": "/android/streaming.html#推流sdk关键日志-如何查看客户的推流参数配置",
          "content": "如何查看客户的推流参数配置$ adb logcat -s PLDroidMediaStreaming | grep prepare"
        },
        {
          "title": "如何查看用户实际使用的 Camera 预览分辨率",
          "url": "/android/streaming.html#推流sdk关键日志-如何查看用户实际使用的-camera-预览分辨率",
          "content": "如何查看用户实际使用的 Camera 预览分辨率$ adb logcat -s PLDroidMediaStreaming | grep \"setCameraPreviewSize\"public WatermarkSetting(Context ctx, String absoluteResPath, WATERMARK_LOCATION location, WATERMARK_SIZE size, int alpha) 有一个构造方法，第二个参数，传入图片的绝对路径就可以。"
        },
        {
          "title": "水印能否传入SD卡的图片",
          "url": "/android/streaming.html#水印能否传入sd卡的图片",
          "content": "水印能否传入SD卡的图片不支持，但是把 GPUImage 的 shader 算法移植过来就行。"
        },
        {
          "title": "Android 推流 sdk 是否支持 GPUImage ?",
          "url": "/android/streaming.html#android-推流-sdk-是否支持-gpuimage-?",
          "content": "Android 推流 sdk 是否支持 GPUImage ?建议看看我们的下面这篇关于滤镜的说明，写得很详细 https://github.com/pili-engineering/PLStreamingKit/wiki/7-高级功能#75-视频滤镜渲染 https://github.com/pili-engineering/PLDroidCameraStreaming/wiki/8-高级功能#Advanced-features"
        },
        {
          "title": "关于滤镜的问题",
          "url": "/android/streaming.html#关于滤镜的问题",
          "content": "关于滤镜的问题配置一下 AspectFrameLayout 的 SHOW_MODE，设置为：SHOW_MODE.FULL"
        },
        {
          "title": "Android 推流如何设置全屏 ？",
          "url": "/android/streaming.html#android-推流如何设置全屏-？",
          "content": "Android 推流如何设置全屏 ？不支持"
        },
        {
          "title": "Android 推流是否支持动态分辨率切换？",
          "url": "/android/streaming.html#android-推流是否支持动态分辨率切换？",
          "content": "Android 推流是否支持动态分辨率切换？可以参考 http://androidxref.com/4.4_r1/xref/frameworks/opt/net/voip/src/jni/rtp/EchoSuppressor.cpp"
        },
        {
          "title": "回声消除这块，你们有解决方案吗",
          "url": "/android/streaming.html#回声消除这块，你们有解决方案吗",
          "content": "回声消除这块，你们有解决方案吗安卓推流 SDK 的文档：https://github.com/pili-engineering/PLDroidMediaStreaming/wiki"
        },
        {
          "title": "SDK 在哪里下载 ？",
          "url": "/android/streaming.html#sdk-在哪里下载-？",
          "content": "SDK 在哪里下载 ？6.0 需要增加权限处理代码，让用户确认下"
        },
        {
          "title": "Android 6.0 无法打开摄像头",
          "url": "/android/streaming.html#android-6.0-无法打开摄像头",
          "content": "Android 6.0 无法打开摄像头1088的size性能比1080更好，另外可以避免一些手机硬编吗情况下花屏现象，1088 能够被16整除 H264是以16x16为块来做的，很多 android 厂商，只支持能被 16 整除的硬编"
        },
        {
          "title": "为什么我们的Android推流视频分辨率是1088，而不是1080 ？",
          "url": "/android/streaming.html#为什么我们的android推流视频分辨率是1088，而不是1080-？",
          "content": "为什么我们的Android推流视频分辨率是1088，而不是1080 ？美颜是在 Preview 的时候其实就生效了，因为 Preview 就有美颜效果的 我问下CameraStreamingSetting配置里面的setCameraFacingId是干嘛的？跟setCameraId不一样么？就是设置当前的摄像头 ID，前置/后置那跟setCameraId这个方法有区别么？ ==> 两个都是设置摄像头 id。 setCameraId 是老 api，为了支持多个 camera。 新增了 setCameraFacingId，参数类型不一样。 建议用新的 api 新api可以设置CAMERA_FACING_ID.CAMERA_FACING_3RD，这个是什么意思呢？ ==> 后置副摄像头，即双摄像头的副摄像头"
        },
        {
          "title": "android camera id",
          "url": "/android/streaming.html#android-camera-id",
          "content": "android camera id开启自适应码率的话，会动态调节码率、帧率\n不开启自适应码率的话，会选择性丢帧 所以马赛克会由两方面因素导致，可能是 codec 层面；也可能是网络引起丢帧导致。\n1 分辨率、帧率、码率属于单机版对画质的影响（多媒体领域范畴）； 2 加上网络因素，就需要考虑（流媒体领域范畴）"
        },
        {
          "title": "直播马赛克",
          "url": "/android/streaming.html#直播马赛克",
          "content": "直播马赛克setFrontCameraMirror(true) 的意思是， 让前置摄像头，自拍的方向和推流的方向是一致的前置摄像头，自拍的方向和推流的方向是反着的\n后置摄像头，自拍的方向和推流的方向是一样的\n默认的 Android Camera 的行为如下：\n"
        },
        {
          "title": "镜像mirror",
          "url": "/android/streaming.html#镜像mirror",
          "content": "镜像mirrorwatermarksetting.setInJustDecodeBoundsEnabled(false) 可以解决"
        },
        {
          "title": "推流端添加水印清晰度不够",
          "url": "/android/streaming.html#推流端添加水印清晰度不够",
          "content": "推流端添加水印清晰度不够@Override public boolean onTouch(View v, MotionEvent event) { return true;// 根据实际要求实现该方法，reture true 即为消耗事件 }cameraPreviewFrameView.setOnTouchListener(this);目前 SDK 还没提供屏蔽对焦框的方法，但是可以通过 View 事件拦截的方法达到效果CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE // 自动对焦（Picture）CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_VIDEO // 自动对焦（Video）CameraStreamingSetting.FOCUS_MODE_AUTO // 手动对焦mCameraStreamingSetting.setCameraId(Camera.CameraInfo.CAMERA_FACING_BACK) .setContinuousFocusModeEnabled(false)//开关自动追焦 .setFocusMode(CameraStreamingSetting.FOCUS_MODE_AUTO)有客户在推流端需要屏蔽对焦框的要求，不是关闭自动/手动对焦，推流端关闭对焦框\"\\naudio:\" + streamingProfile.getStreamStatus().audioFps + \" fps\"\"\\nvideo:\" + streamingProfile.getStreamStatus().videoFps + \" fps\"); break; } }public void onStateChanged(StreamingState streamingState, Object extra) { Log.i(TAG, \"streamingState:\" + streamingState); switch (streamingState) { case STREAMING: Log.e(\"SSSSSS\", \"bitrate:\" + streamingProfile.getStreamStatus().totalAVBitrate / 1024 + \" kbps\"在推流状态回调的 STREAMING case 中，获取 streamingProfile 的 streamStatus 对象来获得录屏的推流状态。\n将推流配置对象 streamingProfile 设为录屏 Activity 的成员变量，这样在录屏各个生命周期都可以访问该对象；\n所以可以通过一下方法在录屏状态获取推流信息\n然后录屏推流 ScreenStreamingManager 没有设置该回调的方法，但是根据以上信息我们知道状态信息存在 streamStatus 对象中，而 streamStatus 是 StreamingProfile 的内部类，\n在使用其回调方法 notifyStreamStatusChanged 中的 streamStatus 可以获得帧率码率信息；\n在普通推流（MediaStreamingManager）或者连麦推流（RTCMediaStreamingManager），都有 setStreamStatusCallback 方法，\n在录屏场景如何获得推流状态，如码率、帧率等\n"
        },
        {
          "title": "录屏推流信息状态获取",
          "url": "/android/streaming.html#录屏推流信息状态获取",
          "content": "录屏推流信息状态获取部分客户可能会有先获取预览画面，再获取推流地址／等待一段时间，之后再进行推流的需求 case READY: // start streaming when READY view.postDelayed(new Runnable() { @Override public void run() { try { mProfile.setPublishUrl(\"rtmp://pili-publish.live.zhangrui.qiniuts.com/live-rui/flow-77\"); mMediaStreamingManager.setStreamingProfile(mProfile); } catch (URISyntaxException e) { e.printStackTrace(); } startStreaming(); } }, 6000); break;"
        },
        {
          "title": "延迟／先预览(修改推流地址)，之后推流",
          "url": "/android/streaming.html#延迟／先预览修改推流地址，之后推流",
          "content": "延迟／先预览(修改推流地址)，之后推流区别在于，PICTURE 一般用于拍照，VIDEO 一般用于录制视频。 拍照的对焦算法会更灵敏，而 VIDEO 相对更柔和。 所以，PICTURE 模式下，稍稍动一下手机，一般都会触发对焦，功耗会更高；Video 触发对焦的条件更苛刻。FOCUS_MODE_AUTO 是手动点击对焦模式。 SDK 的设计是，在手动点击对焦之后，timeout 之后，会自动地切换为 CAF，即连续对焦模式 连续对焦模式： CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_VIDEO 这两种都是 CAF，一种是 PICTURE 另一种是 VIDEO"
        },
        {
          "title": "Android推流对焦里面FOCUS_MODE_AUTO的理解",
          "url": "/android/streaming.html#android推流对焦里面focus_mode_auto的理解",
          "content": "Android推流对焦里面FOCUS_MODE_AUTO的理解数据源模块 － 环境黑暗，摄像头曝光时间较长，导致帧率低，但是一般比较平稳 － camera preview size 设置太高 － 网络太差，导致数据源处丢帧 处理模块 － 美颜等一些特效太多，导致 processing 时间过长，数据源 fps 较低 － 机器的 GPU 太烂，导致处理时间长 编码模块 － 设置的 fps 本身就比较低 － 客户设置的分辨率太高，codec 编码时间太长 网络模块 － 网络不好，推流端丢帧了，但是一般会比较波动 终端模块 － 机器性能低，导致各个阶段的 fps 都低 － 推流时间太长，手机发热较严重，导致 CPU 降频，fps 也会降低描述 需要从以下模块去逐步排查问题："
        },
        {
          "title": "直播SDK 视频帧率为什么有时候会很低 ？",
          "url": "/android/streaming.html#直播sdk-视频帧率为什么有时候会很低-？",
          "content": "直播SDK 视频帧率为什么有时候会很低 ？遇到这种报错信息，直接要求客户排查主播端网络状态，证明是主播网络不佳导致的断流的原因。 注：errorCode -1006 用户自己网络原因"
        },
        {
          "title": "Android推流过程中报errorcode:-1006直接关闭推流？",
          "url": "/android/streaming.html#android推流过程中报errorcode-1006直接关闭推流？",
          "content": "Android推流过程中报errorcode:-1006直接关闭推流？乐视 1s 手机比较暗的问题，你们可以通过配置下面这行语句来解决，你们看看先试试效果： CameraStreamingSetting.setFocusMode(CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE)而3A算法主要指的是自动对焦(AF)、自动曝光(AE)及自动白平衡(AWB)。 自动白平衡:根据光源条件调整图片颜色的保真程度。 ==>相机主要技术点为3A算法。概念解释：相机参数问题 具体原因需要深入分析。从现象来看，是特殊机型上面，本应该自动调整的参数，系统没有调整。 比如，我们现在设定了 fps 和 AF，理论上，AWB 和 AE 根据 Camera tuning 的算法应该在光线暗的环境得到相应地提升，来达到亮度的提升。 但是，从现象来看，部分机型没有提升。"
        },
        {
          "title": "Android 部分机型推流，屏幕显示灰暗，播放端也是灰暗效果",
          "url": "/android/streaming.html#android-部分机型推流，屏幕显示灰暗，播放端也是灰暗效果",
          "content": "Android 部分机型推流，屏幕显示灰暗，播放端也是灰暗效果android.os.Build.MODEL 获取手机型号android.os.Build.VERSION.RELEASE获取版本号"
        },
        {
          "title": "Android获取手机的型号和系统版本",
          "url": "/android/streaming.html#android获取手机的型号和系统版本",
          "content": "Android获取手机的型号和系统版本Android 系统，硬编有两种实现方式，一种是使用 Surface 的方式硬编， 一种是使用 YUV 数据直接硬编，走的不同的代码流程，对于外部导入 YUV 数据进行硬编推流的话，必须使用后者，内部采集推流，推荐前者HW_VIDEO_YUV_AS_INPUT_WITH_HW_AUDIO_CODECHW_VIDEO_SURFACE_AS_INPUT_WITH_HW_AUDIO_CODEC,"
        },
        {
          "title": "Android 推流 type 理解",
          "url": "/android/streaming.html#android-推流-type-理解",
          "content": "Android 推流 type 理解Setting – Manage apps – 进入安装的那个应用的App info – 查看 Permissions开启权限：检查权限 */ private void checkPermission() { if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) { // MPermissions.requestPermissions(this, 1, Manifest.permission.CAMERA); Toast.makeText(this, \"已被禁止获取摄像头权限,请在权限管理中重新设置\", Toast.LENGTH_LONG).show(); }if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED){\n// MPermissions.requestPermissions(this, 2, Manifest.permission.RECORD_AUDIO); Toast.makeText(this, \"已被禁止获取录音权限,请在权限管理中重新设置\", Toast.LENGTH_LONG).show(); } }/**注意将 checkPermission 方法放在onCreate里面 推流初始化动作的前面"
        },
        {
          "title": "Android 推流SDK检查摄像头和录音权限问题解决方案",
          "url": "/android/streaming.html#android-推流sdk检查摄像头和录音权限问题解决方案",
          "content": "Android 推流SDK检查摄像头和录音权限问题解决方案开启美颜功能必须的代码==> CameraStreamingSetting cameraStreamingSetting = new CameraStreamingSetting(); .setBuiltInFaceBeautyEnabled(true) // Using sdk built in face beauty algorithm .setFaceBeautySetting(new CameraStreamingSetting.FaceBeautySetting(0.8f, 0.8f, 0.6f)) // sdk built in face beauty settings .setVideoFilter(CameraStreamingSetting.VIDEO_FILTER_TYPE.VIDEO_FILTER_BEAUTY); // set the beauty on/off MediaStreamingManager.setVideoFilterType(CameraStreamingSetting.VIDEO_FILTER_TYPE.VIDEO_FILTER_BEAUTY） 另外需要检查用户自己客制化的逻辑 初始化 resume"
        },
        {
          "title": "Android 开启美颜功能说明",
          "url": "/android/streaming.html#android-开启美颜功能说明",
          "content": "Android 开启美颜功能说明忽略错误发现错误的时候，请求服务端，服务端调用 stream.status 方法看下流的status状态是否是disconnect（如果是disconnect就没有推流了）， 然后再响应给客户端，客户端展示主播已下线有流状态回调接口，流状态发生变化，都会回调你们业务服务器，你们业务服务器收到有断开的流（异常断流和正常断流都会回调）， 然后决定是否要推送一波断开的消息给客户端异常断流和正常断流我们都收到了，不好处理，你们也部分正常断流和异常断流，让我们怎么做处理？ 没有推流，sdk有没有抛出异常或则，我们怎么判断？ 三种方法："
        },
        {
          "title": "异常断流和正常断流，客户端处理方式",
          "url": "/android/streaming.html#异常断流和正常断流，客户端处理方式",
          "content": "异常断流和正常断流，客户端处理方式减少格式转换，例如：如果 libyuv 和 encoder 支持的输入格式是 i420，那么尽可能用 GPU 把回调的数据改为 i420\n编码自动适配，auto 模式自动选择硬编，失败自动切软编\n找到一切有 memory copy 的地方，减少 copy\n找到一切后台工作线程，特别是与服务端频繁交互的线程，如 zeus，qos，减少交互频率\n杜绝一切循环输出的 log 打印，减少不必要的 log 打印\n不仅是在编码前推流前做帧率控制，而是要从 Camera Preview 层面做控制，比如预设帧率是 15fps，Camera Preview 层面考虑隔帧做美颜+渲染\n减少帧率，更准确地帧率控制\n自适应算法，忽略用户配置的 Camera Preview size，而自动选择一个接近推流 size 的 Camera Preview size\n减少尺寸拉伸/剪裁，Camera Preview 的 size 尽可能靠近推流的 size\n"
        },
        {
          "title": "推流 SDK 功耗优化",
          "url": "/android/streaming.html#推流-sdk-功耗优化",
          "content": "推流 SDK 功耗优化如果您之前没有太多音视频编码的实战经验，我们比较建议您使用demo里的设置参数。分辨率不盲目攀高 如果限定一个码率，比如800kbps，那么分辨率越高就会让编码器越 “为难\" ，可以想象，它必须拆东墙补西墙，通过减少色彩信息或者引入马赛克这种“鱼目混珠”的手段来承载足够多的像素点。 所以，同样的是2G的一个电影文件，1080p画质的版本可能不如720p画质的版本看起来更清晰。有些玩过3D游戏的朋友可能会说，游戏的帧率越高越流畅。 这里要注意一定不要混淆场景：游戏追求高帧率的目的是为了尽可能让3D模型渲染出来的运动效果更加接近真实运动轨迹，所以帧率越高越好。 但对摄像头而言，它要采集的目标是真实世界的物体，真实世界本来就没有刷新率的说法，所以这个理论不适用。帧率一般24-30 如果限定一个码率，比如800kbps，那么帧率越高，编码器就必须加大对单帧画面的压缩比，也就是通过降低画质来承载足够多的帧数。 如果视频源来自摄像头，24FPS已经是肉眼极限，所以一般20帧的FPS就已经可以达到很好的用户体验了。 并且七牛有控制帧率过高的接口： setFpsControllerEnable(true)码率不是越大越好 如果不做码率大小上的限制，那么分辨率越高，画质越细腻； 帧率越高，视频也越流畅，但相应的码率也会很大，因为每秒钟需要用更多的数据来承载较高的清晰度和流畅度。 这对云服务厂商而言这是好事（收入跟流量呈正比），但对您可能意味着更多的费用开支。"
        },
        {
          "title": "好的画质是分辨率、帧率和码率三者之间的平衡：",
          "url": "/android/streaming.html#好的画质是分辨率、帧率和码率三者之间的平衡：",
          "content": "好的画质是分辨率、帧率和码率三者之间的平衡：帧率：FPS（每秒钟要多少帧画面）； 以及Gop（表示多少秒一个I帧） 码率：编码器每秒编出的数据大小，单位是kbps，比如800kbps代表编码器每秒产生800kb（或100KB）的数据。 分辨率：单位英寸中所包含的像素点数； VGA：Video Graphics Array（视频图像分辨率）分辨率、帧率和码率三者之间的关系网络方面的请求和链接失败，会引起StreamingState#IOERROR；\ncamera未启用；\n推流url无效；\n已经处于推流状态，调用开始推流；\n推流startStreaming 调用需要在 StreamingState#READY 之后 并且需要在非UI线程中 ；\n"
        },
        {
          "title": "Android 推流失败原因总结",
          "url": "/android/streaming.html#android-推流失败原因总结",
          "content": "Android 推流失败原因总结anr日志的存放目录：\\data\\anr\\traces.txt adb pull \\data\\anr\\traces.txt ./traces.txt 导出到当前目录下"
        },
        {
          "title": "导出ANR文件的命令",
          "url": "/android/streaming.html#导出anr文件的命令",
          "content": "导出ANR文件的命令unix-like 系统： adb shell logcat -v time thread | tee ~/log.log win 系统： adb shell logcat -v time thread > log.log 命令敲上之后，进行复现，复现完成之后，停止命令，然后把对应的 log.log 发过来。"
        },
        {
          "title": "android 抓取log 的方法：",
          "url": "/android/streaming.html#android-抓取log-的方法：",
          "content": "android 抓取log 的方法：unix-like 系统： adb shell logcat -v time thread | tee ~/log.log win 系统： adb shell logcat -v time thread > log.log 命令敲上之后，进行复现，复现完成之后，停止命令，然后把对应的 log.log 发过来。"
        }
      ]
    },
    {
      "title": "短视频",
      "content": "",
      "url": "/android/shortvideo.html",
      "children": [
        {
          "title": "短视频自定义分辨率大小",
          "url": "/android/shortvideo.html#短视频自定义分辨率大小",
          "content": "短视频自定义分辨率大小//默认选用sdk内置videoEncodeSetting.setEncodingSizeLevel(PLVideoEncodeSetting.VIDEO_ENCODING_SIZE_LEVEL.VIDEO_ENCODING_SIZE_LEVEL_480P_1); // 480x480\n\n/**\n * 如果 SDK 内置的分辨率列表不能满足需求，可以通过此方法自定义编码视频的分辨率\n * @param width 宽度\n * @param height 高度\n */\npublic PLVideoEncodeSetting setPreferedEncodingSize(int width, int height);\n\n"
        },
        {
          "title": "拍摄视频不清晰/模糊",
          "url": "/android/shortvideo.html#拍摄视频不清晰模糊",
          "content": "拍摄视频不清晰/模糊A:通常是视频编码的参数没有调整到位。首先通过PLCameraSetting设置采集的分辨率和码率，再通过PLVideoEncodeSetting设置视频的编码分辨率和码率。确保cameraSetting的值>=encodeSetting值。对应设置可以参考码率与分辨率关系"
        },
        {
          "title": "精简版、基础版、进阶版、专业版差异及兼容升级",
          "url": "/android/shortvideo.html#精简版、基础版、进阶版、专业版差异及兼容升级",
          "content": "精简版、基础版、进阶版、专业版差异及兼容升级A:版本功能差异 ，精简版向专业版升级，直接替换jar包和so文件；专业版向精简版缩减时，需要对照版本功能差异删除代码中专业版功能"
        },
        {
          "title": "短视频报error code = -8",
          "url": "/android/shortvideo.html#短视频报error-code-=--8",
          "content": "短视频报error code = -8A:联系您对应销售/商务，开通短视频授权。自2.2.1版本起通过PLShortVideoEnv类可以进行鉴权查询"
        },
        {
          "title": "短视频最短时间限制",
          "url": "/android/shortvideo.html#短视频最短时间限制",
          "content": "短视频最短时间限制A:没有限制，点按录制视频小于一帧，可以在onDurationTooShort这个方法的回调中，恢复进度条状态"
        },
        {
          "title": "短视频支持h265编码的mp4文件吗",
          "url": "/android/shortvideo.html#短视频支持h265编码的mp4文件吗",
          "content": "短视频支持h265编码的mp4文件吗A:不支持,只支持h264,h263也不支持"
        },
        {
          "title": "屏幕录制支持对单个窗口的录制吗",
          "url": "/android/shortvideo.html#屏幕录制支持对单个窗口的录制吗",
          "content": "屏幕录制支持对单个窗口的录制吗A:短视频sdk支持屏幕录制，可以设置屏幕录制大小，不支持对单独的view进行录制"
        },
        {
          "title": "是否支持全屏录制",
          "url": "/android/shortvideo.html#是否支持全屏录制",
          "content": "是否支持全屏录制A:支持，demo提供的只是限制ui，您在ui上做更改即可，同时应修改配置的预览分辨率和编码分辨率为全屏(eg:1280x720,demo默认480x480)"
        },
        {
          "title": "PLShortVideoUploader ClassNotFound",
          "url": "/android/shortvideo.html#plshortvideouploader-classnotfound",
          "content": "PLShortVideoUploader ClassNotFoundA:gradle依赖 compile 'com.qiniu:qiniu-android-sdk:7.4.3'，可以用短视频封装的上传，也可以直接调用上传API Android上传"
        },
        {
          "title": "getApplicationContext()' on a null object reference",
          "url": "/android/shortvideo.html#getapplicationcontext'-on-a-null-object-reference",
          "content": "getApplicationContext()' on a null object referenceA:v3.0.0-v3.0.1有这个报错，在Application或者onCreate加上 PLShortVideoEnv.checkAuthentication(getApplicationContext(), new PLAuthenticationResultCallback() {….}"
        },
        {
          "title": "是否支持声音内录",
          "url": "/android/shortvideo.html#是否支持声音内录",
          "content": "是否支持声音内录A:目前 android 系统已经限制录制系统声音了，我们 sdk 只能录制麦克风采集的声音，可以将扬声器声音调大，也是能被手机录入，只是会失真"
        }
      ]
    }
  ],
  "iOS": [
    {
      "title": "",
      "content": "",
      "url": "/ios/ios.html",
      "children": []
    }
  ]
}