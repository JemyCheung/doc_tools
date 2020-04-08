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
    },
    {
      "title": "",
      "content": "",
      "url": "/ios/player.html",
      "children": [
        {
          "title": "硬解切换前后台失败，pause 和resume，报错 Decode fail",
          "url": "/ios/player.html#硬解切换前后台失败，pause-和resume，报错-decode-fail",
          "content": "硬解切换前后台失败，pause 和resume，报错 Decode fail研发建议使用软解码："
        },
        {
          "title": "播放器seek失败",
          "url": "/ios/player.html#播放器seek失败",
          "content": "播放器seek失败\nindex table = moov\n\n\n失败的原因\n弱网情况下如果 index table太大，可能还没下载完；视频太长，seek的跨度过大等\n整体来说seek失败一种正常现象，可以监听seek结果回调，对seek成功or失败进行处理。\n\n"
        },
        {
          "title": "播放器切换url，在加载前会显示上一个视频的画面",
          "url": "/ios/player.html#播放器切换url，在加载前会显示上一个视频的画面",
          "content": "播放器切换url，在加载前会显示上一个视频的画面问题：调用- (BOOL)playWithURL:(nullable NSURL x)URL sameSource:(BOOL)sameSource更换url新url状态变为playing，还有上个视频画面\n解决方式：预期场景，之前客户提的需求，要解决需要手动销毁 新建播放器，由于视图清空，会有黑屏现象\n可以先新建播放器，在销毁，或者在切换url前在播放器图层上添加一层封面或遮挡的黑色view，在收到playing状态回调时移除。"
        },
        {
          "title": "播放器播放的过程中手机息屏",
          "url": "/ios/player.html#播放器播放的过程中手机息屏",
          "content": "播放器播放的过程中手机息屏在使用播放器的过程中保持 [UIApplication sharedApplication].idleTimerDisabled = YES;"
        },
        {
          "title": "3.4.0 后台恢复前台，画面卡主，声音正常",
          "url": "/ios/player.html#3.4.0-后台恢复前台，画面卡主，声音正常",
          "content": "3.4.0 后台恢复前台，画面卡主，声音正常具体场景：直播rtmp，不区分软硬解监听前后台，进入前台调用play，后台调用stop[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onUIApplicationWillResignBackground) name:UIApplicationWillResignActiveNotification object:nil];[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onUIApplicationWillEnterForeground) name:UIApplicationDidBecomeActiveNotification object:nil];\n现象：恢复前台画面卡主，声音正常调整方法：player.enableRender = YES;[player play];"
        },
        {
          "title": "hls 格式不支持缓存原因",
          "url": "/ios/player.html#hls-格式不支持缓存原因",
          "content": "hls 格式不支持缓存原因HLS 流，有很多是多码率的，也就是一个 hls 里面可能会有多重清晰度的流，比如超清，标清，客户会根据网络状态动态切换不同的清晰度，如果要做缓存功能，会比较麻烦，不同的清晰度的切片对齐是一个麻烦，而且体验不好，因为回放的时候，可能会出现一会很清晰一会模糊，如果另外开一路线程去拉高清码流，又占用太多用户带宽，影响播放体验。"
        },
        {
          "title": "播放器减少延迟 触发快放的条件",
          "url": "/ios/player.html#播放器减少延迟-触发快放的条件",
          "content": "播放器减少延迟 触发快放的条件减少延迟 触发快放的条件是QCPLAY_PID_PlayBuff_MaxTime\nQCPLAY_PID_PlayBuff_MinTime不在这这两个参数的值之间就触发,默认500 ~ 2000，一旦超过这个阈值就触发播放的速度会不会越来越大？有可能的,快放的速度小于延时的增加速度就可能，快放的速度是大于 1 的，为了保证平滑的播放效果,不能设置得太大"
        },
        {
          "title": "播放器播放多声道资源",
          "url": "/ios/player.html#播放器播放多声道资源",
          "content": "播放器播放多声道资源目前qplayer对1、2、5、6个channel的资源能兼容播放，对部分人生采集特殊的双声道外放不正常，耳机可以"
        },
        {
          "title": "打包模拟器注意事项",
          "url": "/ios/player.html#打包模拟器注意事项",
          "content": "打包模拟器注意事项待完成"
        },
        {
          "title": "播放器的创建线程问题",
          "url": "/ios/player.html#播放器的创建线程问题",
          "content": "播放器的创建线程问题问：创建一个播放对象的时候大约会新建8条线程，调用销毁对象的方法线程还是存在，一般什么时机会清理这些线程呢，客户担心线程太多会造成卡顿答：销毁播放器对象线程还在运行，说明还有和播放器对象无关的一些线程处理，由系统控制的，我们的实际代码操作不到，遇到卡顿系统会择优处理的，大概率也不会遇到因线程量多导致卡顿的，遇到卡顿的情况，一般先从代码层面进行排除\nqplayer线程的数量已经是较优状态，由于内部线程管理复杂麻烦，不会再进行较大的调整"
        },
        {
          "title": "播放器播放短视频的首开时间",
          "url": "/ios/player.html#播放器播放短视频的首开时间",
          "content": "播放器播放短视频的首开时间qplayer对MP4格式短视频首开时间在0.2~0.5秒左右，如果客户场景类似于抖音，不需要使用预加载的功能即可达到较好的首开效果，该场景下不建议客户使用hls的格式，该格式首开时间长于MP4，体验较差；不推荐使用预加载功能，该功能会占用带宽，影响正在播放的视频。"
        },
        {
          "title": "播放器PLPlayerOptionKeyTimeoutIntervalForMediaPackets与实际超时回调时间不符",
          "url": "/ios/player.html#播放器plplayeroptionkeytimeoutintervalformediapackets与实际超时回调时间不符",
          "content": "播放器PLPlayerOptionKeyTimeoutIntervalForMediaPackets与实际超时回调时间不符问题：pili 层自动重连关闭  PLPlayerOptionKeyTimeoutIntervalForMediaPackets 设置1主播断开到播放段回调到error要10 ~12秒的样子\n原因：qplayer 播放直播链接，默认超时时间5秒，超时后qplayer至少进行一次重连，重连时间10秒左右\nqplayer重连失败后，反馈PLPlayerErrorHTTPErrorHTTPConnectFailed 到霹雳层，客户收到stopwitherror的回调"
        },
        {
          "title": "播放器怎么指定httpDns，或怎么指定只使用localDns",
          "url": "/ios/player.html#播放器怎么指定httpdns，或怎么指定只使用localdns",
          "content": "播放器怎么指定httpDns，或怎么指定只使用localDns播放器option的属性值PLPlayerOptionKeyDNSManager如果不设置，默认使用0.0.0.0，底层的处理逻辑目前不清楚，但会使用腾讯或阿里的httpdns服务。如果客户想指定httpdns地址，按如下代码设置：\n[option setOptionValue:@\"x.x.x.x\" forKey:PLPlayerOptionKeyDNSManager];\n如果客户想指定使用localDns，按如下代码设置：[option setOptionValue:@\"127.0.0.1\" forKey:PLPlayerOptionKeyDNSManager];"
        },
        {
          "title": "3.4.3播放器在xcode10上打包失败，bitcode失败",
          "url": "/ios/player.html#3.4.3播放器在xcode10上打包失败，bitcode失败",
          "content": "3.4.3播放器在xcode10上打包失败，bitcode失败关闭bitcode灰度包真机：http://pr8hjn86c.bkt.clouddn.com/noBitcode-PLPlayerKit.framework.zip\n真机+模拟器：http://o9zmf8ght.bkt.clouddn.com/Universal-PLPlayerKit.framework.zip"
        },
        {
          "title": "iphoneX等屏幕比例非9：16的设备全屏播放问题",
          "url": "/ios/player.html#iphonex等屏幕比例非9：16的设备全屏播放问题",
          "content": "iphoneX等屏幕比例非9：16的设备全屏播放问题苹果iphone8及之前的手机系列产品屏幕比例都是标准的9：16，从iphoneX开始转为使用非9：16的刘海屏尺寸，而目前较为常见的视频分辨率比例是9：16，这就导致视频在iphoneX以上设备上播放无法完美铺满整个屏幕，客户反馈的问题一般是：无法铺满或画面有剪切。针对这个问题，可以提供给客户这三种画面布局填充方案，可以按App场景来选择：视频按原比例全部显示在屏幕上，但上下会有黑边。对应player.playView.contentMode = UIViewContentModeScaleAspectFit;\n视频铺满整个屏幕，不留黑边，但因为比例不一致，会有左右方向的视频溢出部分会被剪切掉，对应player.playView.contentMode = UIViewContentModeScaleAspectFill;\n视频变换比例铺满整个屏幕，由于是强行铺满，画面会有纵向拉伸效果，对应player.playView.contentMode = UIViewContentModeScaleToFill;\n由于比例的不同，想把比例不一致的屏幕和视频强行铺满是不切实际的（不拉伸的情况下），然而有些客户就是比较执着：“iphone6s可以，iphoneX怎么就不可以，人家抖音。。。   ”，碰到这种问题，可以给他举个栗子，一张短粗胖的照片，没办法放进一个苗条的相框里，除非给相框拆了。\n"
        },
        {
          "title": "stop不清屏",
          "url": "/ios/player.html#stop不清屏",
          "content": "stop不清屏播放器在stop的时候会保留最后一一帧画面，playwithurl切换到新播放地址的时候，网络不好或其他原因，会导致画面停留在上一个视频中可以添加个launchView，设置个黑色图片来规避，目前sdk没有办法处理，之前调整过几次会引起比较严重的用户体验问题，所以在使用方式上规避一下"
        },
        {
          "title": "播放器的日志搜集",
          "url": "/ios/player.html#播放器的日志搜集",
          "content": "播放器的日志搜集目前播放器分为两层，底层是Qplayer层，外层是pili层，两层分别有各自的日志写入功能，其中Qplayer层的日志比较重要：Qplayer层：需要把loglevel设置成verbose级别，日志会保存在沙盒Document目录下，文件名core.txt，Qplayer层的日志比较重要，一般是排查问题的依据，开启代码如下：[option setOptionValue:@(kPLLogVerbose) forKey:PLPlayerOptionKeyLogLevel];Pili层：level只要不是kPLLogNone，都会写入到本地，路径是沙盒/Library/Caches/Pili/PlayerLogs，Pili层的log数量受level的级别影响，级别越高日志越详细，但一般排查问题很少用到："
        },
        {
          "title": "v3.4.3之前版本设置contentMode在iOS13设备上运行闪退",
          "url": "/ios/player.html#v3.4.3之前版本设置contentmode在ios13设备上运行闪退",
          "content": "v3.4.3之前版本设置contentMode在iOS13设备上运行闪退闪退信息如下：Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: 'Cannot get value with size 32. The type encoded as q is expected to be 8 bytes'*** First throw call stack:(0x1975d898c 0x1973010a4 0x1979c3de4 0x19b2315bc 0x19b2312b8 0x10592700c 0x197983a28 0x197985a84 0x1979854d8 0x1978d4dbc 0x197981078 0x1043049fc 0x1979c1238 0x1975567e0 0x197556738 0x197555ed0 0x19755101c 0x1975508bc 0x1a13bc328 0x19b5e66d4 0x1042f9334 0x1973db460)libc++abi.dylib: terminating with uncaught exception of type NSException问题原因：3.4.3之前版本对iOS13的兼容性问题解决方案：升级sdk版本到3.4.3"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/ios/streaming.html",
      "children": [
        {
          "title": "直播",
          "url": "/ios/streaming.html#直播",
          "content": "直播"
        },
        {
          "title": "推流sdk打包时，依赖库HappyDNS的bitcode报错",
          "url": "/ios/streaming.html#推流sdk打包时，依赖库happydns的bitcode报错",
          "content": "推流sdk打包时，依赖库HappyDNS的bitcode报错打包时，rebuild from bitcode不要打钩"
        },
        {
          "title": "推流sdk添加水印没有效果",
          "url": "/ios/streaming.html#推流sdk添加水印没有效果",
          "content": "推流sdk添加水印没有效果检查下客户使用的水印图片资源是否带scale比例scale比例：图片文件名后带有@2x或@3x"
        },
        {
          "title": "关于横屏推流",
          "url": "/ios/streaming.html#关于横屏推流",
          "content": "关于横屏推流首先保证播放段画面不旋转，也就是手机本身旋转后，摄像头也要旋转\n再调整预览画面并且修改推流参数\n步骤：\n手机旋转   设置摄像头旋转方向 PLVideoCaptureConfiguration videoOrientation\n如果是VC旋转 调整 preview的size ； 或者直接旋转preview\n修改 PLVideoStreamingConfiguration 的videosize为横屏 （播放段看到的size）\nps：如果是推流的过程中修改\n旋转方向用PLMediaStreamingSession的类调用position\n新建PLVideoStreamingConfiguration，并调用reload\n"
        },
        {
          "title": "录屏推流横竖屏设置",
          "url": "/ios/streaming.html#录屏推流横竖屏设置",
          "content": "录屏推流横竖屏设置测试replaykit 推流，初始化进入的时候UIInterfaceOrientation 是LandscapeRight/LandscapeLeft，sampleBufferSize 宽大于高，是横屏的效果\nUIInterfaceOrientation 是Portrait，sampleBufferSize 高大于宽，是竖屏效果\n所以判断应该是UIInterfaceOrientation 影响到了replaykit输出的宽高，客户提供的腾讯的 homeOrientation 应该也是这么调整的就问一下\n不过这个客户也可以自己外部实现"
        },
        {
          "title": "视频帧旋转及优化偶现黑屏 -- 他趣",
          "url": "/ios/streaming.html#视频帧旋转及优化偶现黑屏----他趣",
          "content": "视频帧旋转及优化偶现黑屏 -- 他趣提给供他趣的灰度包，包含帧旋转http://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.4-beta-20180831.zip\n该sdk在 plus 录制第五人格时候会出现图片中效果\n必现步骤：打开 用户中心，再关闭 用户中心 ，就会出现 绿屏问题\n原因：分辨率发生变化。最开始 sourceRect 中 size 是 1080，1920，当关闭用户中心时，srcFrameVideoSize 变为了 750，1334，此时需要调整 sourceRect 的值。\nsourceRect ：从这个区域取数据。\ndestRect ：把 sourceRect 区域内的数据放到这个位置\nsourceRect 大于实际了的videosize，绿色相当于填充\n配置：配置.pages"
        },
        {
          "title": "视频帧为0，日志显示failed to setup VTCompressionSession",
          "url": "/ios/streaming.html#视频帧为0，日志显示failed-to-setup-vtcompressionsession",
          "content": "视频帧为0，日志显示failed to setup VTCompressionSession对象没有正常的释放导致编码器设置失败，由客户调用 destroy 接口，只 dealloc 没有 destroy 还是可能导致编码器没有销毁掉"
        },
        {
          "title": "推流SDK v2.3.4 v2.3.5版本推流没声音，使用Demo正常",
          "url": "/ios/streaming.html#推流sdk-v2.3.4-v2.3.5版本推流没声音，使用demo正常",
          "content": "推流SDK v2.3.4 v2.3.5版本推流没声音，使用Demo正常首先看下客户推上来的流音频帧率是否为0，如果不为0，可能是调用了静音。\n如果音频帧为0，可以让客户按Demo的配置来设置推流参数，一般音频的配置用defaultConfiguration就可以。\nv2.3.4版本音频采集的模块有个位置会有数组越界，但内部做了个保护不会影响正常使用，但如果客户的代码里有类似Swizzle的防止数组越界的功能（发现数组越界即丢弃），就会导致永远采集不到buffer，可以让客户检查下App的代码。\n建议去掉Swizzle防越界的模块，或者处理时绕过SDK。\n也可以提供2.3.5的灰度版本，已修复这个问题：\n真机：https://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.5.1-iphones.zip\n真机+模拟器：https://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.5.1-universal.zip\n"
        },
        {
          "title": "replykit  在ios12  ios13 的bug",
          "url": "/ios/streaming.html#replykit-在ios12-ios13-的bug",
          "content": "replykit  在ios12  ios13 的bugreplykit在12 和13 的操作系统上有不同程度的问题，主要会导致录屏后没有声音的问题，应该是replykit的bug，需要外部处理下ios12：\n询问获取权限的弹窗不是每次都出现，即使每次都调用\n[RPScreenRecorder sharedRecorder].microphoneEnabled = YES;\n会导致音频的回调不执行，没有声音\nios13：\n同时注册mic 和 app，音频回调正常，发布的音频帧正常，但是播放没有声音，控制台持续打印 [AAC Encoder] reload source ASDB, sample rate 44100hz\n单独使用mic 或 app 音频帧率和播放都正常\nmic 和 APP中打印的音频的samplebuffer的asbd参数不一样，应该是这个原因导致（声道数不同）ps：弹窗正常为了保证在每个系统上都能正常使用，可以使用外部采集   如：QRDMicrophoneSource增加音频samplebuffer回调"
        },
        {
          "title": "使用replaykit broadcast录屏偶现推流sdk crash：",
          "url": "/ios/streaming.html#使用replaykit-broadcast录屏偶现推流sdk-crash：",
          "content": "使用replaykit broadcast录屏偶现推流sdk crash：image-2019-05-28-16-38-45-663.png原因是replaykit回调了无效的buffer，sdk内部没有对buffer是否有效做判断，导致memmove抛出异常，可以引导客户在replaykit的回调里加上以下代码过滤掉无效buffer：\nif (!CMSampleBufferDataIsReady(sampleBuffer)) return;"
        },
        {
          "title": "推流sdk录屏场景Demo（实时更新）",
          "url": "/ios/streaming.html#推流sdk录屏场景demo（实时更新）",
          "content": "推流sdk录屏场景Demo（实时更新）http://peioy2m4j.bkt.clouddn.com/PLMediaStreamingKitFunctionDemo.zip"
        }
      ]
    },
    {
      "title": "",
      "content": "",
      "url": "/ios/shortvideo.html",
      "children": [
        {
          "title": "v1.13.1之前版本上传报错",
          "url": "/ios/shortvideo.html#v1.13.1之前版本上传报错",
          "content": "v1.13.1之前版本上传报错Qiniu的sdk在7.2.4版本，移除了QNConfigutation的dns属性，导致短视频上传crash，报找不到这个方法。如果是1.13.1及之前的版本，建议客户指定下QiniuSDK的版本号为7.2.3。"
        },
        {
          "title": "短视频转码报错：Domain=com.PLShortVideoKit.ErrorDomain Code=-4002 \"Transcoding movie was failed.\" UserInfo={NSLocalizedRecoverySuggestion=You will be check the movie duration., NSLocalizedDescription=Transcoding movie was failed., NSLocalizedFailureReason=Read current movie was failed. Error Domain=AVFoundationErrorDomain Code=-11841 \"(null)\"}",
          "url": "/ios/shortvideo.html#短视频转码报错：domain=com.plshortvideokit.errordomain-code=-4002-\"transcoding-movie-was-failed.\"-userinfo={nslocalizedrecoverysuggestion=you-will-be-check-the-movie-duration.,-nslocalizeddescription=transcoding-movie-was-failed.,-nslocalizedfailurereason=read-current-movie-was-failed.-error-domain=avfoundationerrordomain-code=-11841-\"null\"}",
          "content": "短视频转码报错：Domain=com.PLShortVideoKit.ErrorDomain Code=-4002 \"Transcoding movie was failed.\" UserInfo={NSLocalizedRecoverySuggestion=You will be check the movie duration., NSLocalizedDescription=Transcoding movie was failed., NSLocalizedFailureReason=Read current movie was failed. Error Domain=AVFoundationErrorDomain Code=-11841 \"(null)\"}具体案例：demo中的转码页底部的截取时长，原视频时长15，设置maxduration=9，在选取9秒以后的数据转码失败失败信息：Domain=com.PLShortVideoKit.ErrorDomain Code=-4002 \"Transcoding movie was failed.\" UserInfo={NSLocalizedRecoverySuggestion=You will be check the movie duration., NSLocalizedDescription=Transcoding movie was failed., NSLocalizedFailureReason=Read current movie was failed. Error Domain=AVFoundationErrorDomain Code=-11841 \"(null)\"}修改：\n原因：修改了demo的参数，比如一个10秒的视频，想截取其中的5秒，但却把startTime设置成了7秒的时间点，7+5>10，导致编码器异常。"
        },
        {
          "title": "self.shortVideoEditor.loopEnabled = NO;  播放完成后调用 [self.shortVideoEditor startEditing];   不能重新播放",
          "url": "/ios/shortvideo.html#self.shortvideoeditor.loopenabled-=-no;-播放完成后调用-[self.shortvideoeditor-startediting];-不能重新播放",
          "content": "self.shortVideoEditor.loopEnabled = NO;  播放完成后调用 [self.shortVideoEditor startEditing];   不能重新播放原因：开始和结束 editing 这个动作，不涉及到seek操作，这个方法的设定就是这样  不应该包含seek操作，不然方法的意思和实际作用不符合，以上现象符合预期解决：再次播放前seek到视频开始时间"
        },
        {
          "title": "短视频SDK不支持自定义倍速的原因",
          "url": "/ios/shortvideo.html#短视频sdk不支持自定义倍速的原因",
          "content": "短视频SDK不支持自定义倍速的原因目前只支持现有的几种速率，如果设置其他速率，会有声音播放问题，因此 iOS 不支持和 Android 一样的速率设置。"
        },
        {
          "title": "SDK录制 - 系统相机 - 返回SDK录制，出现预览不全",
          "url": "/ios/shortvideo.html#sdk录制---系统相机---返回sdk录制，出现预览不全",
          "content": "SDK录制 - 系统相机 - 返回SDK录制，出现预览不全场景：录制界面，预览正常 - 调用系统相机 - 返回录制界面 - 预览缩小调用系统相机：    UIImagePickerController * imagePicker = [[UIImagePickerController alloc] init];    [imagePicker setSourceType:sourceType];\n    imagePicker.allowsEditing = allowsEditing;\n    [imagePicker setDelegate:self];\n    [xxx presentViewController:imagePicker animated:YES completion:nil];\n"
        },
        {
          "title": "现象：",
          "url": "/ios/shortvideo.html#现象：",
          "content": "现象：原因：\n原因是预览进入相机，采集的size发生了改变，再退回预览界面sdk没有将size重置为videoconfiguration里的配置，所以出现了预览变小的情况\n现在需要在在使用姿势想进行规避，在退出系统相机后回到拍摄界面时，调用一下 reloadvideoConfiguration"
        },
        {
          "title": "SDK录制的视频有绿边",
          "url": "/ios/shortvideo.html#sdk录制的视频有绿边",
          "content": "SDK录制的视频有绿边原因： 短视频用的iOS 硬编码，设置的宽高如果不是偶数，会被系统API自动校正到偶数，这个时候，录制得到的视频和实际设置的视频像素不符合，出现绿边。处理方法：建议用户在设置宽高参数的时候保证是偶数。宽高设置为 16 的倍数自然最好，至少保证宽高为偶数。"
        },
        {
          "title": "SDK提供的滤镜资源",
          "url": "/ios/shortvideo.html#sdk提供的滤镜资源",
          "content": "SDK提供的滤镜资源研发回复：这个其实四个版本对 bundle 中的滤镜是都支持的，只不过对外是根据版本，只提供 10种/ 33种 给到用户去用。截图的就是我们定义的 10 种滤镜，33 种就是 bundle 里面的全部滤镜。\n所以在官方Demo中的33种滤镜资源，四个版本的SDK都可以使用，没有限制。\n"
        },
        {
          "title": "录制时mixAudio播放背景音乐失败",
          "url": "/ios/shortvideo.html#录制时mixaudio播放背景音乐失败",
          "content": "录制时mixAudio播放背景音乐失败可能是音频的编码格式是HE-AAC，mixAudio的播放器用的是AVAudioPlayer，该播放器不支持HE-AAC的音频，将播放器替换为AVPlayer，采集会打断AVPlayer的播放目前需要客户自己转码音频编码格式\nhe-aac :http://fengwo.gttead.cn/data/upload/bgm_file/5b28a90e507e6.mp3\n\nps：shorteditor 继承editorplayer，继承avplayer"
        },
        {
          "title": "短视频SDK添加MV的问题",
          "url": "/ios/shortvideo.html#短视频sdk添加mv的问题",
          "content": "短视频SDK添加MV的问题设置MV 为 10 秒，视频时长15秒，实际播放超过 10 秒，在11秒左右\n正常；应该是存在，这个主要是内部播放的时候，根据 MV 来播放，但是计算 MV 的时间戳做不到很精确，导致可能时间播放的视频比设置的 MV 的时长大，但是最终导出视频的时候，是不会存在这个问题的，设置 MV 之后，滑动进度条，播放画面不刷新  https://oigovwije.qnssl.com/ScreenRecording_12-10-05-13.MP4\n这个是预期的，加了 MV 之后，不支持滑动精度条刷新\n如果设置 MV 的时候，mv 的 timerange 设置的是 CMTimeRangeMake(CMTimeMake(2000, 1000), CMTimeMake(8000, 1000)), 既就是 MV 时长设置的是 8 秒，loop 为 NO 的情况下，播放的时长是应该是 8 秒和视频时长中小的那一个，假如用户的视频是 20 秒，那个实际上只能播放 8 秒，并且用户在seek 的时候，可以seek 的范围应该是 0 ~ 8 秒，\n\n\n原视频执行seek，mv不会随原视频一起执行seek操作\n\n当 MV 的时长比视频时长短的时候，是否让 MV 重复播放到视频的时长，一种是不重复，一种是重复，如果选择的是不重复播放 MV，那么就会出现只要 MV 播放一遍完了，视频播放会强制重头开始播放\n如果选择的是重复播放 MV, 这种情况下视频的最后 0.2 秒左右的时候播放不出来，这是音频 MV 播放领先视频播放 0.2 秒左右，导致 MV 比视频提前 0.2 秒结束。\n现在的编辑逻辑是 MV 或者视频谁先播放完，整个播放就重头开始"
        },
        {
          "title": "PLSAVAssetExportSession 输出的视频小于预期码率",
          "url": "/ios/shortvideo.html#plsavassetexportsession-输出的视频小于预期码率",
          "content": "PLSAVAssetExportSession 输出的视频小于预期码率设置的码率值是一个推荐值，不是一个确定值，在生成视频的时候，视频场景变化大小也影响视频的码率，如果视频场景变化不大，生成的视频码率本来就偏小，加上用户设置的码率太大，导致生成视频的最终码率和设置码率差距较大。"
        },
        {
          "title": "PLSFilePreset对应实际分辨率",
          "url": "/ios/shortvideo.html#plsfilepreset对应实际分辨率",
          "content": "PLSFilePreset对应实际分辨率LowQuality：CGSizeMake(240, 320)MediumQuality: CGSizeMake(544, 960)HighestQuality：self.videoSize;640x480：CGSizeMake(480, 640)Preset960x540: CGSizeMake(544, 960)Preset1280x720: CGSizeMake(720, 1280)Preset1920x1080]: CGSizeMake(1088, 1920)"
        },
        {
          "title": "PLShortVideoTranscoder处理规则",
          "url": "/ios/shortvideo.html#plshortvideotranscoder处理规则",
          "content": "PLShortVideoTranscoder处理规则PLShortVideoTranscoder 的处理规则是的outputFilePreset 大于原始视，默认使用原始视频的videosize和码率。"
        },
        {
          "title": "PLSRangeMediaTools 对视频videosize的处理",
          "url": "/ios/shortvideo.html#plsrangemediatools-对视频videosize的处理",
          "content": "PLSRangeMediaTools 对视频videosize的处理1.10及之前版本：不支持设置导出的videosize，以第一段PLSRangeMedia的videosize为基准，按照fill模式进行切割1.11及之后版本：支持设置导出的videosize，如果每段视频的size和设置导出的 size不一样、按照fill模式剪切到导出的size"
        },
        {
          "title": "关于录制的双声道",
          "url": "/ios/shortvideo.html#关于录制的双声道",
          "content": "关于录制的双声道audioConfiguration.numberOfChannels = 2;该设置不针对采集\n采集默认是44100hz 单声道，如果设置上面的参数后在麦克风原始数据的回调里自己保存音频，该资源是单声道\n再有在保存为MP4 的时候在回加上channel的设置"
        },
        {
          "title": "合成音频码率和采样率不匹配，导出失败",
          "url": "/ios/shortvideo.html#合成音频码率和采样率不匹配，导出失败",
          "content": "合成音频码率和采样率不匹配，导出失败用户的视频采样率是 22050，我们的导出使用的音频码率默认是 128k，码率和采样率不匹配，就会出现失败的情况AVAsset+PLSExtendProperty 的属性获取视频的声道数和采样率"
        },
        {
          "title": "Editor播放AVPlayerItem的问题",
          "url": "/ios/shortvideo.html#editor播放avplayeritem的问题",
          "content": "Editor播放AVPlayerItem的问题问题：通过这个方法组合的AVPlayerItem包含几个分辨率不同的视频，AVPlayer可以都按照自适应来正常播放，PLShortVideoEditor只能按照第一个分辨率播吗？后边不同分辨率的就适配不了了答： 因为 PLShortVideoEditor 的 initWithPlayerItem 初始化，AVPlayerItem 的 videoComposition 会失效，所以目前 initWithPlayerItem 只支持 视频宽高一样并且具有相同 transform 的视频组合播放"
        },
        {
          "title": "基于TUSDK的短视频demo",
          "url": "/ios/shortvideo.html#基于tusdk的短视频demo",
          "content": "基于TUSDK的短视频demo七牛短视频官网地址下：https://github.com/pili-engineering/PLShortVideoKitExample_TuTu 文件夹\n"
        },
        {
          "title": "文字大小和PLSVideoPreviewSizeKey关系",
          "url": "/ios/shortvideo.html#文字大小和plsvideopreviewsizekey关系",
          "content": "文字大小和PLSVideoPreviewSizeKey关系AVAssetExportSsssion 比如设置的输出视频像素 outputVideoSize 是 1080x1920，如果不旋转或者旋转 180 度，那么最终导出的视频宽高还是 1080x1920，这个时候添加贴纸，就会使用 1080x1920 这个作为 PLSVideoOutputSizeKey 的角色来计算贴纸位置，即就是：```float verticalRadio = 1920 / 750;\nfloat horizontalRadio = 1080 /375;\n\nfloat radio = 1;\nif(verticalRadio > 1 && horizontalRadio > 1) {\nradio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;\n} else {\nradio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;\n}\n```\n最终贴纸在视频中的位置就是 CGRect ={100 _ radio，50_radio，200_radio，200_radio}如果视频旋转90度或者270度，那么 SDK内部会将用户设置的输出视频尺寸修改为\nAVAssetExportSsssion 比如设置的输出视频像素 outputVideoSize 是 1080x1920，如果不旋转或者旋转 180 度，那么最终导出的视频宽高还是 1080x1920，这个时候添加贴纸，就会使用 1080x1920 这个作为 PLSVideoOutputSizeKey 的角色来计算贴纸位置，\n即就是：    float verticalRadio = 1920 / 750;    float horizontalRadio = 1080 /375;\n\n    float radio = 1;\n    if(verticalRadio > 1 && horizontalRadio > 1) {\n    radio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;\n    } else {\n    radio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;\n    }\n最终贴纸在视频中的位置就是 CGRect ={100 _ radio，50_radio，200_radio，200_radio}如果视频旋转90度或者270度，那么 SDK内部会将用户设置的输出视频尺寸修改为 1920x1080，计算贴纸的时候就是下面的计算方法：    float verticalRadio = 1080 / 750;    float horizontalRadio = 1920 /375;\n\n    float radio = 1;\n    if(verticalRadio > 1 && horizontalRadio > 1) {\n    radio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;\n    } else {\n    radio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;\n    }\n最终贴纸在视频中的位置就是 CGRect ={100 _ radio，50_radio，200_radio，200_radio}在设置贴纸的时候 PLSVideoOutputSizeKey 并没有被使用到，用户可以不设置这个值\n如果用户没有设置 outputVideoSize， SDK 内部会自己去设置 outputVideoSize\n如果用户旋转了视频，导出的视频分别率还是和不旋转设置相同的值，PLSAVAssetExportSession 会根据\n@property (assign, nonatomic) PLSPreviewOrientation videoLayerOrientation\n来计算最终导出视频的分辨率，\n但是 PLSAVAssetExportSession 内部并不会去根据 videoLayerOrientation 修改贴纸的值，\nPLSAVAssetExportSession 内部会先根据 videoLayerOrientation 计算导出视频的值，然后把这个最终视频导出分辨率的值来计算贴纸的位置，设置贴纸的position，size 不会做旋转，用户设置的什么就是什么，计算方式就是刚刚发给你的，"
        },
        {
          "title": "时光倒流特效耗时问题",
          "url": "/ios/shortvideo.html#时光倒流特效耗时问题",
          "content": "时光倒流特效耗时问题问题：PLSReverserEffect 时光特效处理一个12秒的视频，耗时4秒答：正常原因：时光倒流有编解码的操作其他无耗时感的处理：往decoder送数据的时间索引反过来，例如抖音有些短视频的时光倒流是不需要花时间导出的，只是改变一下 AVPlayer 播放器的播放参数。我之前看了一下，犹豫了很久，决定不去修改这个，主要是修改这个，整个短视频编辑，导出的很多东西否需要修改，涉及的地方太多，贸然修改这个影响面太大了。这个自己知道就好，没有必要和客户说。\n我们现在的时光倒流特效是对视频进行了重新解码再编码，算是物理操作，所以耗时比较长。"
        },
        {
          "title": "代码检查设备是否支持双声道",
          "url": "/ios/shortvideo.html#代码检查设备是否支持双声道",
          "content": "代码检查设备是否支持双声道[AVAudioSession sharedInstance].maximumInputNumberOfChannels"
        },
        {
          "title": "关于水印的问题",
          "url": "/ios/shortvideo.html#关于水印的问题",
          "content": "关于水印的问题\n图片格式要求png\n\n\n不能放在 imagesasset 中\n\n\n不能有@这样的特殊字符\n\n"
        },
        {
          "title": "PLSAVAssetExportSession输出时 背景音乐参数解释",
          "url": "/ios/shortvideo.html#plsavassetexportsession输出时-背景音乐参数解释",
          "content": "PLSAVAssetExportSession输出时 背景音乐参数解释第一组是音频文件本身的开始时间和时长，就是对音频文件做选取的第二组是这个音频文件添加在视频中的位置，比如一个音频文件 30s，我们要选取这个音频文件的第 10 ~ 15s，那么 startTime 是10，duration 是 15如果要把这选取出来的 5秒的音频加载视频的第 20~25 秒，那么 locationStartTime 是 20，locationDuration 是 5"
        },
        {
          "title": "是否支持H265视频的编辑输出",
          "url": "/ios/shortvideo.html#是否支持h265视频的编辑输出",
          "content": "是否支持H265视频的编辑输出如果手机本身支持 h265 硬解的，则支持对 h265 的文件进行一系列的操作，比如转码，编辑等。目前只有iOS11以上的部分高端机型支持h265的硬件解码，我们处理完成后统一转成h264。"
        },
        {
          "title": "SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK authorization status error: auth failed!",
          "url": "/ios/shortvideo.html#sdk报错：pili-shortvideo-authorization-plshortvideo-sdk-authorization-status-error-auth-failed!",
          "content": "SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK authorization status error: auth failed!SDK鉴权失败，让客户提供包名，在http://svauth.qnsdk.com/查下是否已授权。"
        },
        {
          "title": "SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK version authorization error 900. If you want to use more SDK features, please visit \"https://www.qiniu.com/products/plsv\"!",
          "url": "/ios/shortvideo.html#sdk报错：pili-shortvideo-authorization-plshortvideo-sdk-version-authorization-error-900.-if-you-want-to-use-more-sdk-features,-please-visit-\"httpswww.qiniu.comproductsplsv\"!",
          "content": "SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK version authorization error 900. If you want to use more SDK features, please visit \"https://www.qiniu.com/products/plsv\"!SDK鉴权检测到使用了比已授权版本更高级的功能，SDK各版本功能列表参考https://developer.qiniu.com/pili/sdk/3731/short-video，客户包名的授权版本在http://svauth.qnsdk.com/查询。"
        },
        {
          "title": "短视频SDK日志搜集",
          "url": "/ios/shortvideo.html#短视频sdk日志搜集",
          "content": "短视频SDK日志搜集代码如下：    // pili 短视频日志系统    [PLShortVideoKitEnv initEnv];\n    [PLShortVideoKitEnv enableFileLogging];\n    [PLShortVideoKitEnv setLogLevel:PLShortVideoLogLevelDebug];\nloglevel可以根据实际情况来指定，级别越高日志越详细，日志目录在沙盒/Library/Caches/Pili-ShortVideo/Logs："
        },
        {
          "title": "短视频SDK是否支持同时编辑多个视频，同时转码多个视频输出报错怎么处理",
          "url": "/ios/shortvideo.html#短视频sdk是否支持同时编辑多个视频，同时转码多个视频输出报错怎么处理",
          "content": "短视频SDK是否支持同时编辑多个视频，同时转码多个视频输出报错怎么处理短视频SDK建议每次处理一个视频，多个视频同时编辑输出可能会触发底层硬件编码器的报错。"
        },
        {
          "title": "PLSVideoMixRecorder初始化耗时久",
          "url": "/ios/shortvideo.html#plsvideomixrecorder初始化耗时久",
          "content": "PLSVideoMixRecorder初始化耗时久查看是否开启了回声消除 acousticEchoCancellationEnable，关掉可以减少耗时因为回音消除这个需要硬件来做，硬件上处理需要花时间，没有办法避免"
        },
        {
          "title": "短视频SDK3.0.0版本 xcode10编译不过",
          "url": "/ios/shortvideo.html#短视频sdk3.0.0版本-xcode10编译不过",
          "content": "短视频SDK3.0.0版本 xcode10编译不过原因：3.0.0版本SDK使用的是xcode11打包的，可能会影响之前版本xcode的正常编译使用。\n解决方案：提供灰度包，目前有专业版本的灰度包，如果客户是其他版本的，比如基础版进阶版，可以联系SDK同学专业版：真机：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKitv3.0.0-for-xcode10-Release-pro-iphoneos.zip模拟器：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKitv3.0.0-for-xcode10-Release-pro-universal.zip基础版：真机：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-iphoneos-basic_for_xcode10.zip模拟器：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-universal-basic_for_xcode10.zip"
        },
        {
          "title": "PLSAVAssetExportSession合成崩溃",
          "url": "/ios/shortvideo.html#plsavassetexportsession合成崩溃",
          "content": "PLSAVAssetExportSession合成崩溃PLSAVAssetExportSession 的 outputSettings 中，movie的PLSDurationKey是0导致的"
        },
        {
          "title": "短视频SDKv3.0.0版本支持模拟器编译版本灰度包",
          "url": "/ios/shortvideo.html#短视频sdkv3.0.0版本支持模拟器编译版本灰度包",
          "content": "短视频SDKv3.0.0版本支持模拟器编译版本灰度包3.0.0线上版本只有专业版包含模拟器x86_64架构，其他版本需要提供灰度包基础版：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-basic-universal.zip精简版：http://pr8hjn86c.bkt.clouddn.com/PLShortVideoKit-v3.0.0-short-universal.framework.zip灰度包需要客户手动拖入工程，需要注意的是短视频SDK依赖Qiniu上传SDK，手动拖入Qiniu或通过cocoapods引入Qiniu，否则运行会报错；另外如果要使用SDK自带的美颜功能，需要手动引入libMuseProcessor.a，Demo工程文件夹里可以找到这个包。"
        },
        {
          "title": "是否支持声音内录",
          "url": "/ios/shortvideo.html#是否支持声音内录",
          "content": "是否支持声音内录不建议短视频录屏的代码在PLScreenRecorderManager中，是外部封装的replykit，只采集了麦克风的声音，没有采集appps：虽然代码可以更改，ios13上replykit采集的麦克风和APP的声音数据中，声道数不一样，写在一起可能会有问题"
        },
        {
          "title": "3.1.0偶现qos数组crash",
          "url": "/ios/shortvideo.html#3.1.0偶现qos数组crash",
          "content": "3.1.0偶现qos数组crashqos数组的问题，重载后正常，可以建议客户卸载重装，然后重新运行安装，不影响后续的正常使用"
        },
        {
          "title": "v3.1.1版本demo合拍功能滤镜设置无效",
          "url": "/ios/shortvideo.html#v3.1.1版本demo合拍功能滤镜设置无效",
          "content": "v3.1.1版本demo合拍功能滤镜设置无效3.1.1版本PLSVideoMixRecorder采集的音视频buffer回调不走，目前已提供灰度包，其他版本可以问研发打包，预计下个版本修复：进阶版：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-3.1.1.1-advance.zip专业版：http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-3.1.1.1-pro.zip"
        }
      ]
    }
  ]
}