[安卓推流SDK](https://github.com/pili-engineering/PLDroidMediaStreaming)
# 直播

## 更换推流url
```
mMediaStreamingManager.stopStreaming();
mProfile.setPublishUrl(url);
mMediaStreamingManager.setStreamingProfile(mProfile);
mMediaStreamingManager.startStreaming();
```

## IPCamera推流
### 三种方式    
- 摄像头本身是一个小系统，Linux或者Android系统，那需要采集数据并通过ffmpeg/Android sdk进行推流，且ip摄像头能联网    
- 摄像头自带推流软件，输入推流地址就可以推流  
- 摄像头只是单纯的摄像头，可以通过局域网wifi传输数据。那需要自行将数据传输到Linux系统或者Android系统，然后用ffmpeg/android sdk进行编码并推流  
### 处理办法
这里涉及到几个名词 ：数据传输，编码，ffmpeg，Android sdk，推流地址。只有Android sdk和推流地址是七牛提供的，其他过程都需要自己做

## 码率、分辨率、帧率关系  
关于 分辨率、帧率、码率 等编码基本概念可以参考以下文档
[H.264 一般规范](http://www.lighterra.com/papers/videoencodingh264/)
[分辨率、帧率、码率的相互关系](https://developer.qiniu.com/pili/kb/3636/streaming-VideoProfile)

## 推流模糊的一组建议值  
关于分档的【标清、高清、超清】，目前并不是通用标准，多数视频站点使用各自的标准，一般只是作为区分的不同视频质量的标识。

| 画质 | 码率     | 分辨率   | 帧率 |
| :--- | -------- | -------- | ---- |
| 标清 | 800 kbps | 360x640  | 15   |
| 高清 | 1.2 mbps | 540x960  | 20   |
| 超清 | 1.8 mbps | 720x1280 | 20   |

- 对应在 sdk 中的配置  

```java
// 标清
StreamingProfile.AudioProfile aProfile=new StreamingProfile.AudioProfile(44100,48*1024);
StreamingProfile.VideoProfile vProfile=new StreamingProfile.VideoProfile(15,800*1024,15,StreamingProfile.H264Profile.BASELINE);
StreamingProfile.AVProfilea vProfile=new StreamingProfile.AVProfile(vProfile,aProfile);
mProfile.setPreferredVideoEncodingSize(360,640)
				.setAVProfile(avProfile);

// 高清
StreamingProfile.AudioProfile aProfile=new StreamingProfile.AudioProfile(44100,48*1024);
StreamingProfile.VideoProfile vProfile=new StreamingProfile.VideoProfile(20,1200*1024,20,StreamingProfile.H264Profile.BASELINE);
StreamingProfile.AVProfilea vProfile=new StreamingProfile.AVProfile(vProfile,aProfile);
mProfile.setPreferredVideoEncodingSize(540,960)
				.setAVProfile(avProfile)

// 超清
StreamingProfile.AudioProfile aProfile=new StreamingProfile.AudioProfile(44100,48*1024);
StreamingProfile.VideoProfile vProfile=new StreamingProfile.VideoProfile(20,1800*1024,20,StreamingProfile.H264Profile.HIGH);
StreamingProfile.AVProfileavProfile=new StreamingProfile.AVProfile(vProfile,aProfile);
mProfile.setPreferredVideoEncodingSize(720,1280)
				.setAVProfile(avProfile)
```


## 推流SDK关键日志  
###  提供 Android 的日志  
$ adb logcat -v threadtime > log.txt  
### 打开最高的日志级别  
StreamingEnv.setLogLevel(Log.VERBOSE)  
### 如何过滤推流 SDK 输出的日志  
$ adb logcat -v threadtime -s PLDroidMediaStreaming  
### 如何查看客户的调用姿势  
$ adb logcat -v threadtime | grep Pili-Interface  
### 如何查看客户的系统和版本信息  
$ adb logcat -s PLDroidMediaStreaming | grep Pili-System  
### 如何查看客户的推流参数配置  
$ adb logcat -s PLDroidMediaStreaming | grep prepare  
### 如何查看用户实际使用的 Camera 预览分辨率  
$ adb logcat -s PLDroidMediaStreaming | grep "setCameraPreviewSize"  


public WatermarkSetting(Context ctx, String absoluteResPath, WATERMARK_LOCATION location, WATERMARK_SIZE size, int alpha) 有一个构造方法，第二个参数，传入图片的绝对路径就可以。

## 水印能否传入SD卡的图片  
不支持，但是把 GPUImage 的 shader 算法移植过来就行。

## Android 推流 sdk 是否支持 GPUImage ?  
建议看看我们的下面这篇关于滤镜的说明，写得很详细 https://github.com/pili-engineering/PLStreamingKit/wiki/7-高级功能#75-视频滤镜渲染 https://github.com/pili-engineering/PLDroidCameraStreaming/wiki/8-高级功能#Advanced-features

## 关于滤镜的问题  
配置一下 AspectFrameLayout 的 SHOW_MODE，设置为：SHOW_MODE.FULL

## Android 推流如何设置全屏 ？  
不支持

## Android 推流是否支持动态分辨率切换？  
可以参考 http://androidxref.com/4.4_r1/xref/frameworks/opt/net/voip/src/jni/rtp/EchoSuppressor.cpp

## 回声消除这块，你们有解决方案吗  
安卓推流 SDK 的文档：https://github.com/pili-engineering/PLDroidMediaStreaming/wiki



## SDK 在哪里下载 ？  
6.0 需要增加权限处理代码，让用户确认下

## Android 6.0 无法打开摄像头  
1088的size性能比1080更好，另外可以避免一些手机硬编吗情况下花屏现象，1088 能够被16整除 H264是以16x16为块来做的，很多 android 厂商，只支持能被 16 整除的硬编

## 为什么我们的Android推流视频分辨率是1088，而不是1080 ？
美颜是在 Preview 的时候其实就生效了，因为 Preview 就有美颜效果的 我问下CameraStreamingSetting配置里面的setCameraFacingId是干嘛的？跟setCameraId不一样么？就是设置当前的摄像头 ID，前置/后置那跟setCameraId这个方法有区别么？ ==> 两个都是设置摄像头 id。 setCameraId 是老 api，为了支持多个 camera。 新增了 setCameraFacingId，参数类型不一样。 建议用新的 api 新api可以设置CAMERA_FACING_ID.CAMERA_FACING_3RD，这个是什么意思呢？ ==> 后置副摄像头，即双摄像头的副摄像头

## android camera id  
- 开启自适应码率的话，会动态调节码率、帧率
- 不开启自适应码率的话，会选择性丢帧 所以马赛克会由两方面因素导致，可能是 codec 层面；也可能是网络引起丢帧导致。

1 分辨率、帧率、码率属于单机版对画质的影响（多媒体领域范畴）； 2 加上网络因素，就需要考虑（流媒体领域范畴）

## 直播马赛克  
setFrontCameraMirror(true) 的意思是， 让前置摄像头，自拍的方向和推流的方向是一致的  
- 前置摄像头，自拍的方向和推流的方向是反着的
- 后置摄像头，自拍的方向和推流的方向是一样的
默认的 Android Camera 的行为如下：

## 镜像mirror  
watermarksetting.setInJustDecodeBoundsEnabled(false) 可以解决

## 推流端添加水印清晰度不够  
@Override public boolean onTouch(View v, MotionEvent event) { return true;// 根据实际要求实现该方法，reture true 即为消耗事件 }

cameraPreviewFrameView.setOnTouchListener(this);
目前 SDK 还没提供屏蔽对焦框的方法，但是可以通过 View 事件拦截的方法达到效果

CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE // 自动对焦（Picture）

CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_VIDEO // 自动对焦（Video）

CameraStreamingSetting.FOCUS_MODE_AUTO // 手动对焦

mCameraStreamingSetting.setCameraId(Camera.CameraInfo.CAMERA_FACING_BACK) .setContinuousFocusModeEnabled(false)//开关自动追焦 .setFocusMode(CameraStreamingSetting.FOCUS_MODE_AUTO)

有客户在推流端需要屏蔽对焦框的要求，不是关闭自动/手动对焦，

推流端关闭对焦框
"\naudio:" + streamingProfile.getStreamStatus().audioFps + " fps"

"\nvideo:" + streamingProfile.getStreamStatus().videoFps + " fps"); break; } }

public void onStateChanged(StreamingState streamingState, Object extra) { Log.i(TAG, "streamingState:" + streamingState); switch (streamingState) { case STREAMING: Log.e("SSSSSS", "bitrate:" + streamingProfile.getStreamStatus().totalAVBitrate / 1024 + " kbps"

- 在推流状态回调的 STREAMING case 中，获取 streamingProfile 的 streamStatus 对象来获得录屏的推流状态。
- 将推流配置对象 streamingProfile 设为录屏 Activity 的成员变量，这样在录屏各个生命周期都可以访问该对象；
所以可以通过一下方法在录屏状态获取推流信息
然后录屏推流 ScreenStreamingManager 没有设置该回调的方法，但是根据以上信息我们知道状态信息存在 streamStatus 对象中，而 streamStatus 是 StreamingProfile 的内部类，
在使用其回调方法 notifyStreamStatusChanged 中的 streamStatus 可以获得帧率码率信息；
在普通推流（MediaStreamingManager）或者连麦推流（RTCMediaStreamingManager），都有 setStreamStatusCallback 方法，
在录屏场景如何获得推流状态，如码率、帧率等

## 录屏推流信息状态获取  
部分客户可能会有先获取预览画面，再获取推流地址／等待一段时间，之后再进行推流的需求 case READY: // start streaming when READY view.postDelayed(new Runnable() { @Override public void run() { try { mProfile.setPublishUrl("rtmp://pili-publish.live.zhangrui.qiniuts.com/live-rui/flow-77"); mMediaStreamingManager.setStreamingProfile(mProfile); } catch (URISyntaxException e) { e.printStackTrace(); } startStreaming(); } }, 6000); break;

## 延迟／先预览(修改推流地址)，之后推流  
区别在于，PICTURE 一般用于拍照，VIDEO 一般用于录制视频。 拍照的对焦算法会更灵敏，而 VIDEO 相对更柔和。 所以，PICTURE 模式下，稍稍动一下手机，一般都会触发对焦，功耗会更高；Video 触发对焦的条件更苛刻。

FOCUS_MODE_AUTO 是手动点击对焦模式。 SDK 的设计是，在手动点击对焦之后，timeout 之后，会自动地切换为 CAF，即连续对焦模式 连续对焦模式： CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_VIDEO 这两种都是 CAF，一种是 PICTURE 另一种是 VIDEO

## Android推流对焦里面FOCUS_MODE_AUTO的理解  


数据源模块 － 环境黑暗，摄像头曝光时间较长，导致帧率低，但是一般比较平稳 － camera preview size 设置太高 － 网络太差，导致数据源处丢帧 处理模块 － 美颜等一些特效太多，导致 processing 时间过长，数据源 fps 较低 － 机器的 GPU 太烂，导致处理时间长 编码模块 － 设置的 fps 本身就比较低 － 客户设置的分辨率太高，codec 编码时间太长 网络模块 － 网络不好，推流端丢帧了，但是一般会比较波动 终端模块 － 机器性能低，导致各个阶段的 fps 都低 － 推流时间太长，手机发热较严重，导致 CPU 降频，fps 也会降低

描述 需要从以下模块去逐步排查问题：

## 直播SDK 视频帧率为什么有时候会很低 ？  
遇到这种报错信息，直接要求客户排查主播端网络状态，证明是主播网络不佳导致的断流的原因。 注：errorCode -1006 用户自己网络原因

## Android推流过程中报errorcode:-1006直接关闭推流？  
乐视 1s 手机比较暗的问题，你们可以通过配置下面这行语句来解决，你们看看先试试效果： CameraStreamingSetting.setFocusMode(CameraStreamingSetting.FOCUS_MODE_CONTINUOUS_PICTURE)

而3A算法主要指的是自动对焦(AF)、自动曝光(AE)及自动白平衡(AWB)。 自动白平衡:根据光源条件调整图片颜色的保真程度。 ==>

相机主要技术点为3A算法。

概念解释：

相机参数问题 具体原因需要深入分析。从现象来看，是特殊机型上面，本应该自动调整的参数，系统没有调整。 比如，我们现在设定了 fps 和 AF，理论上，AWB 和 AE 根据 Camera tuning 的算法应该在光线暗的环境得到相应地提升，来达到亮度的提升。 但是，从现象来看，部分机型没有提升。

## Android 部分机型推流，屏幕显示灰暗，播放端也是灰暗效果  
android.os.Build.MODEL 获取手机型号

android.os.Build.VERSION.RELEASE获取版本号

## Android获取手机的型号和系统版本  
Android 系统，硬编有两种实现方式，一种是使用 Surface 的方式硬编， 一种是使用 YUV 数据直接硬编，走的不同的代码流程，对于外部导入 YUV 数据进行硬编推流的话，必须使用后者，内部采集推流，推荐前者

HW_VIDEO_YUV_AS_INPUT_WITH_HW_AUDIO_CODEC

HW_VIDEO_SURFACE_AS_INPUT_WITH_HW_AUDIO_CODEC,

## Android 推流 type 理解  
Setting – Manage apps – 进入安装的那个应用的App info – 查看 Permissions

开启权限：

检查权限 */ private void checkPermission() { if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) { // MPermissions.requestPermissions(this, 1, Manifest.permission.CAMERA); Toast.makeText(this, "已被禁止获取摄像头权限,请在权限管理中重新设置", Toast.LENGTH_LONG).show(); }

if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED)  
{  
// MPermissions.requestPermissions(this, 2, Manifest.permission.RECORD_AUDIO); Toast.makeText(this, "已被禁止获取录音权限,请在权限管理中重新设置", Toast.LENGTH_LONG).show(); } }

/**

注意将 checkPermission 方法放在onCreate里面 推流初始化动作的前面

## Android 推流SDK检查摄像头和录音权限问题解决方案  
开启美颜功能必须的代码==> CameraStreamingSetting cameraStreamingSetting = new CameraStreamingSetting(); .setBuiltInFaceBeautyEnabled(true) // Using sdk built in face beauty algorithm .setFaceBeautySetting(new CameraStreamingSetting.FaceBeautySetting(0.8f, 0.8f, 0.6f)) // sdk built in face beauty settings .setVideoFilter(CameraStreamingSetting.VIDEO_FILTER_TYPE.VIDEO_FILTER_BEAUTY); // set the beauty on/off MediaStreamingManager.setVideoFilterType(CameraStreamingSetting.VIDEO_FILTER_TYPE.VIDEO_FILTER_BEAUTY） 另外需要检查用户自己客制化的逻辑 初始化 resume

## Android 开启美颜功能说明  
忽略错误

发现错误的时候，请求服务端，服务端调用 stream.status 方法看下流的status状态是否是disconnect（如果是disconnect就没有推流了）， 然后再响应给客户端，客户端展示主播已下线

有流状态回调接口，流状态发生变化，都会回调你们业务服务器，你们业务服务器收到有断开的流（异常断流和正常断流都会回调）， 然后决定是否要推送一波断开的消息给客户端

异常断流和正常断流我们都收到了，不好处理，你们也部分正常断流和异常断流，让我们怎么做处理？ 没有推流，sdk有没有抛出异常或则，我们怎么判断？ 三种方法：

## 异常断流和正常断流，客户端处理方式  
- 减少格式转换，例如：如果 libyuv 和 encoder 支持的输入格式是 i420，那么尽可能用 GPU 把回调的数据改为 i420
- 编码自动适配，auto 模式自动选择硬编，失败自动切软编
- 找到一切有 memory copy 的地方，减少 copy
- 找到一切后台工作线程，特别是与服务端频繁交互的线程，如 zeus，qos，减少交互频率
- 杜绝一切循环输出的 log 打印，减少不必要的 log 打印
- 不仅是在编码前推流前做帧率控制，而是要从 Camera Preview 层面做控制，比如预设帧率是 15fps，Camera Preview 层面考虑隔帧做美颜+渲染
- 减少帧率，更准确地帧率控制
- 自适应算法，忽略用户配置的 Camera Preview size，而自动选择一个接近推流 size 的 Camera Preview size
- 减少尺寸拉伸/剪裁，Camera Preview 的 size 尽可能靠近推流的 size

## 推流 SDK 功耗优化  
如果您之前没有太多音视频编码的实战经验，我们比较建议您使用demo里的设置参数。

分辨率不盲目攀高 如果限定一个码率，比如800kbps，那么分辨率越高就会让编码器越 “为难" ，可以想象，它必须拆东墙补西墙，通过减少色彩信息或者引入马赛克这种“鱼目混珠”的手段来承载足够多的像素点。 所以，同样的是2G的一个电影文件，1080p画质的版本可能不如720p画质的版本看起来更清晰。



有些玩过3D游戏的朋友可能会说，游戏的帧率越高越流畅。 这里要注意一定不要混淆场景：游戏追求高帧率的目的是为了尽可能让3D模型渲染出来的运动效果更加接近真实运动轨迹，所以帧率越高越好。 但对摄像头而言，它要采集的目标是真实世界的物体，真实世界本来就没有刷新率的说法，所以这个理论不适用。

帧率一般24-30 如果限定一个码率，比如800kbps，那么帧率越高，编码器就必须加大对单帧画面的压缩比，也就是通过降低画质来承载足够多的帧数。 如果视频源来自摄像头，24FPS已经是肉眼极限，所以一般20帧的FPS就已经可以达到很好的用户体验了。 并且七牛有控制帧率过高的接口： setFpsControllerEnable(true)

码率不是越大越好 如果不做码率大小上的限制，那么分辨率越高，画质越细腻； 帧率越高，视频也越流畅，但相应的码率也会很大，因为每秒钟需要用更多的数据来承载较高的清晰度和流畅度。 这对云服务厂商而言这是好事（收入跟流量呈正比），但对您可能意味着更多的费用开支。

## 好的画质是分辨率、帧率和码率三者之间的平衡：  

帧率：FPS（每秒钟要多少帧画面）； 以及Gop（表示多少秒一个I帧） 码率：编码器每秒编出的数据大小，单位是kbps，比如800kbps代表编码器每秒产生800kb（或100KB）的数据。 分辨率：单位英寸中所包含的像素点数； VGA：Video Graphics Array（视频图像分辨率）

分辨率、帧率和码率三者之间的关系
- 网络方面的请求和链接失败，会引起StreamingState#IOERROR；
- camera未启用；
- 推流url无效；
- 已经处于推流状态，调用开始推流；
- 推流startStreaming 调用需要在 StreamingState#READY 之后 并且需要在非UI线程中 ；

## Android 推流失败原因总结  
anr日志的存放目录：\data\anr\traces.txt adb pull \data\anr\traces.txt ./traces.txt 导出到当前目录下

## 导出ANR文件的命令  
unix-like 系统： adb shell logcat -v time thread | tee ~/log.log win 系统： adb shell logcat -v time thread > log.log 命令敲上之后，进行复现，复现完成之后，停止命令，然后把对应的 log.log 发过来。

## android 抓取log 的方法：
unix-like 系统： adb shell logcat -v time thread | tee ~/log.log win 系统： adb shell logcat -v time thread > log.log 命令敲上之后，进行复现，复现完成之后，停止命令，然后把对应的 log.log 发过来。
