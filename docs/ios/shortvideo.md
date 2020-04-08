# 短视频
## v1.13.1之前版本上传报错

![](http://cdn.iorange.vip/s_1.jpg)

Qiniu的sdk在7.2.4版本，移除了QNConfigutation的dns属性，导致短视频上传crash，报找不到这个方法。如果是1.13.1及之前的版本，建议客户指定下QiniuSDK的版本号为7.2.3。

## 短视频转码报错：Domain=com.PLShortVideoKit.ErrorDomain Code=-4002 "Transcoding movie was failed." UserInfo={NSLocalizedRecoverySuggestion=You will be check the movie duration., NSLocalizedDescription=Transcoding movie was failed., NSLocalizedFailureReason=Read current movie was failed. Error Domain=AVFoundationErrorDomain Code=-11841 "(null)"}
具体案例：
demo中的转码页底部的截取时长，原视频时长15，设置maxduration=9，在选取9秒以后的数据转码失败

失败信息：
Domain=com.PLShortVideoKit.ErrorDomain Code=-4002 "Transcoding movie was failed." UserInfo={NSLocalizedRecoverySuggestion=You will be check the movie duration., NSLocalizedDescription=Transcoding movie was failed., NSLocalizedFailureReason=Read current movie was failed. Error Domain=AVFoundationErrorDomain Code=-11841 "(null)"}

修改：
![](http://cdn.iorange.vip/s_2.jpg)  
![](http://cdn.iorange.vip/s_3.png)

原因：修改了demo的参数，比如一个10秒的视频，想截取其中的5秒，但却把startTime设置成了7秒的时间点，7+5>10，导致编码器异常。

## self.shortVideoEditor.loopEnabled = NO;  播放完成后调用 [self.shortVideoEditor startEditing];   不能重新播放
原因：开始和结束 editing 这个动作，不涉及到seek操作，这个方法的设定就是这样  不应该包含seek操作，不然方法的意思和实际作用不符合，以上现象符合预期
解决：再次播放前seek到视频开始时间

## 短视频SDK不支持自定义倍速的原因
目前只支持现有的几种速率，如果设置其他速率，会有声音播放问题，因此 iOS 不支持和 Android 一样的速率设置。

## SDK录制 - 系统相机 - 返回SDK录制，出现预览不全
场景：录制界面，预览正常 - 调用系统相机 - 返回录制界面 - 预览缩小
调用系统相机：
```
    UIImagePickerController * imagePicker = [[UIImagePickerController alloc] init];
    [imagePicker setSourceType:sourceType];
    imagePicker.allowsEditing = allowsEditing;
    [imagePicker setDelegate:self];
    [xxx presentViewController:imagePicker animated:YES completion:nil];
```

## 现象：
![](http://cdn.iorange.vip/s_4.png)
原因：
原因是预览进入相机，采集的size发生了改变，再退回预览界面sdk没有将size重置为videoconfiguration里的配置，所以出现了预览变小的情况
现在需要在在使用姿势想进行规避，在退出系统相机后回到拍摄界面时，调用一下 reloadvideoConfiguration

## SDK录制的视频有绿边
原因： 短视频用的iOS 硬编码，设置的宽高如果不是偶数，会被系统API自动校正到偶数，这个时候，录制得到的视频和实际设置的视频像素不符合，出现绿边。
处理方法：建议用户在设置宽高参数的时候保证是偶数。宽高设置为 16 的倍数自然最好，至少保证宽高为偶数。

## SDK提供的滤镜资源
研发回复：这个其实四个版本对 bundle 中的滤镜是都支持的，只不过对外是根据版本，只提供 10种/ 33种 给到用户去用。
截图的就是我们定义的 10 种滤镜，33 种就是 bundle 里面的全部滤镜。
所以在官方Demo中的33种滤镜资源，四个版本的SDK都可以使用，没有限制。
![](http://cdn.iorange.vip/s_5.png)

## 录制时mixAudio播放背景音乐失败
可能是音频的编码格式是HE-AAC，mixAudio的播放器用的是AVAudioPlayer，该播放器不支持HE-AAC的音频，将播放器替换为AVPlayer，采集会打断AVPlayer的播放
目前需要客户自己转码音频编码格式
he-aac :<http://fengwo.gttead.cn/data/upload/bgm_file/5b28a90e507e6.mp3>
![](http://cdn.iorange.vip/s_6.png)
ps：shorteditor 继承editorplayer，继承avplayer

## 短视频SDK添加MV的问题
- 设置MV 为 10 秒，视频时长15秒，实际播放超过 10 秒，在11秒左右

正常；应该是存在，这个主要是内部播放的时候，根据 MV 来播放，但是计算 MV 的时间戳做不到很精确，导致可能时间播放的视频比设置的 MV 的时长大，但是最终导出视频的时候，是不会存在这个问题的，

- 设置 MV 之后，滑动进度条，播放画面不刷新  <https://oigovwije.qnssl.com/ScreenRecording_12-10-05-13.MP4>

这个是预期的，加了 MV 之后，不支持滑动精度条刷新

- 如果设置 MV 的时候，mv 的 timerange 设置的是 CMTimeRangeMake(CMTimeMake(2000, 1000), CMTimeMake(8000, 1000)), 既就是 MV 时长设置的是 8 秒，loop 为 NO 的情况下，播放的时长是应该是 8 秒和视频时长中小的那一个，假如用户的视频是 20 秒，那个实际上只能播放 8 秒，并且用户在seek 的时候，可以seek 的范围应该是 0 ~ 8 秒，

- 原视频执行seek，mv不会随原视频一起执行seek操作

当 MV 的时长比视频时长短的时候，是否让 MV 重复播放到视频的时长，一种是不重复，一种是重复，

- 如果选择的是不重复播放 MV，那么就会出现只要 MV 播放一遍完了，视频播放会强制重头开始播放
- 如果选择的是重复播放 MV, 这种情况下视频的最后 0.2 秒左右的时候播放不出来，这是音频 MV 播放领先视频播放 0.2 秒左右，导致 MV 比视频提前 0.2 秒结束。

现在的编辑逻辑是 MV 或者视频谁先播放完，整个播放就重头开始

## PLSAVAssetExportSession 输出的视频小于预期码率
设置的码率值是一个推荐值，不是一个确定值，在生成视频的时候，视频场景变化大小也影响视频的码率，如果视频场景变化不大，生成的视频码率本来就偏小，加上用户设置的码率太大，导致生成视频的最终码率和设置码率差距较大。

## PLSFilePreset对应实际分辨率
LowQuality：CGSizeMake(240, 320)

MediumQuality: CGSizeMake(544, 960)

HighestQuality：self.videoSize;

640x480：CGSizeMake(480, 640)

Preset960x540: CGSizeMake(544, 960)

Preset1280x720: CGSizeMake(720, 1280)

Preset1920x1080]: CGSizeMake(1088, 1920)

## PLShortVideoTranscoder处理规则
PLShortVideoTranscoder 的处理规则是的outputFilePreset 大于原始视，默认使用原始视频的videosize和码率。

## PLSRangeMediaTools 对视频videosize的处理
1.10及之前版本：不支持设置导出的videosize，以第一段PLSRangeMedia的videosize为基准，按照fill模式进行切割

1.11及之后版本：支持设置导出的videosize，如果每段视频的size和设置导出的 size不一样、按照fill模式剪切到导出的size

## 关于录制的双声道
audioConfiguration.numberOfChannels = 2;
该设置不针对采集
采集默认是44100hz 单声道，如果设置上面的参数后在麦克风原始数据的回调里自己保存音频，该资源是单声道
再有在保存为MP4 的时候在回加上channel的设置

## 合成音频码率和采样率不匹配，导出失败
![](http://cdn.iorange.vip/s_7.png)

用户的视频采样率是 22050，我们的导出使用的音频码率默认是 128k，码率和采样率不匹配，就会出现失败的情况
AVAsset+PLSExtendProperty 的属性获取视频的声道数和采样率
## Editor播放AVPlayerItem的问题
![](http://cdn.iorange.vip/s_7.png)

问题：通过这个方法组合的AVPlayerItem包含几个分辨率不同的视频，AVPlayer可以都按照自适应来正常播放，PLShortVideoEditor只能按照第一个分辨率播吗？后边不同分辨率的就适配不了了

答： 因为 PLShortVideoEditor 的 initWithPlayerItem 初始化，AVPlayerItem 的 videoComposition 会失效，所以目前 initWithPlayerItem 只支持 视频宽高一样并且具有相同 transform 的视频组合播放

## 基于TUSDK的短视频demo

七牛短视频官网地址下：<https://github.com/pili-engineering/PLShortVideoKit>
Example_TuTu 文件夹
![](http://cdn.iorange.vip/s_9.png)

## 文字大小和PLSVideoPreviewSizeKey关系
AVAssetExportSsssion 比如设置的输出视频像素 outputVideoSize 是 1080x1920，如果不旋转或者旋转 180 度，那么最终导出的视频宽高还是 1080x1920，这个时候添加贴纸，就会使用 1080x1920 这个作为 PLSVideoOutputSizeKey 的角色来计算贴纸位置，

即就是：

    ```
    float verticalRadio = 1920 / 750;
    float horizontalRadio = 1080 /375;

    float radio = 1;
    if(verticalRadio > 1 && horizontalRadio > 1) {
    radio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;
    } else {
    radio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;
    }
    ```

最终贴纸在视频中的位置就是 CGRect ={100 \_ radio，50_radio，200_radio，200_radio}
如果视频旋转90度或者270度，那么 SDK内部会将用户设置的输出视频尺寸修改为
AVAssetExportSsssion 比如设置的输出视频像素 outputVideoSize 是 1080x1920，如果不旋转或者旋转 180 度，那么最终导出的视频宽高还是 1080x1920，这个时候添加贴纸，就会使用 1080x1920 这个作为 PLSVideoOutputSizeKey 的角色来计算贴纸位置，
即就是：
```
    float verticalRadio = 1920 / 750;
    float horizontalRadio = 1080 /375;

    float radio = 1;
    if(verticalRadio > 1 && horizontalRadio > 1) {
    radio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;
    } else {
    radio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;
    }
```
最终贴纸在视频中的位置就是 CGRect ={100 \_ radio，50_radio，200_radio，200_radio}
如果视频旋转90度或者270度，那么 SDK内部会将用户设置的输出视频尺寸修改为 1920x1080，计算贴纸的时候就是下面的计算方法：
```
    float verticalRadio = 1080 / 750;
    float horizontalRadio = 1920 /375;

    float radio = 1;
    if(verticalRadio > 1 && horizontalRadio > 1) {
    radio = verticalRadio > horizontalRadio ? horizontalRadio : verticalRadio;
    } else {
    radio = verticalRadio < horizontalRadio ? verticalRadio : horizontalRadio;
    }
```
最终贴纸在视频中的位置就是 CGRect ={100 \_ radio，50_radio，200_radio，200_radio}
在设置贴纸的时候 PLSVideoOutputSizeKey 并没有被使用到，用户可以不设置这个值
如果用户没有设置 outputVideoSize， SDK 内部会自己去设置 outputVideoSize
如果用户旋转了视频，导出的视频分别率还是和不旋转设置相同的值，PLSAVAssetExportSession 会根据
@property (assign, nonatomic) PLSPreviewOrientation videoLayerOrientation
来计算最终导出视频的分辨率，
但是 PLSAVAssetExportSession 内部并不会去根据 videoLayerOrientation 修改贴纸的值，
PLSAVAssetExportSession 内部会先根据 videoLayerOrientation 计算导出视频的值，然后把这个最终视频导出分辨率的值来计算贴纸的位置，设置贴纸的position，size 不会做旋转，用户设置的什么就是什么，计算方式就是刚刚发给你的，

## 时光倒流特效耗时问题
问题：PLSReverserEffect 时光特效处理一个12秒的视频，耗时4秒

答：正常

原因：时光倒流有编解码的操作

其他无耗时感的处理：往decoder送数据的时间索引反过来，例如抖音

有些短视频的时光倒流是不需要花时间导出的，只是改变一下 AVPlayer 播放器的播放参数。
我之前看了一下，犹豫了很久，决定不去修改这个，主要是修改这个，整个短视频编辑，导出的很多东西否需要修改，涉及的地方太多，贸然修改这个影响面太大了。这个自己知道就好，没有必要和客户说。
我们现在的时光倒流特效是对视频进行了重新解码再编码，算是物理操作，所以耗时比较长。

## 代码检查设备是否支持双声道
[AVAudioSession sharedInstance].maximumInputNumberOfChannels  

## 关于水印的问题
- 图片格式要求png

- 不能放在 imagesasset 中

- 不能有@这样的特殊字符

## PLSAVAssetExportSession输出时 背景音乐参数解释
![](http://cdn.iorange.vip/s_10.png)

第一组是音频文件本身的开始时间和时长，就是对音频文件做选取的
第二组是这个音频文件添加在视频中的位置，

比如一个音频文件 30s，我们要选取这个音频文件的第 10 ~ 15s，那么 startTime 是10，duration 是 15
如果要把这选取出来的 5秒的音频加载视频的第 20~25 秒，那么 locationStartTime 是 20，locationDuration 是 5

## 是否支持H265视频的编辑输出
如果手机本身支持 h265 硬解的，则支持对 h265 的文件进行一系列的操作，比如转码，编辑等。目前只有iOS11以上的部分高端机型支持h265的硬件解码，我们处理完成后统一转成h264。

## SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK authorization status error: auth failed!
SDK鉴权失败，让客户提供包名，在<http://svauth.qnsdk.com/查下是否已授权。>

## SDK报错：Pili-ShortVideo-Authorization PLShortVideo SDK version authorization error 900. If you want to use more SDK features, please visit "<https://www.qiniu.com/products/plsv"!>
SDK鉴权检测到使用了比已授权版本更高级的功能，SDK各版本功能列表参考<https://developer.qiniu.com/pili/sdk/3731/short-video，客户包名的授权版本在http://svauth.qnsdk.com/查询。>

## 短视频SDK日志搜集
代码如下：
```
    // pili 短视频日志系统
    [PLShortVideoKitEnv initEnv];
    [PLShortVideoKitEnv enableFileLogging];
    [PLShortVideoKitEnv setLogLevel:PLShortVideoLogLevelDebug];
```
loglevel可以根据实际情况来指定，级别越高日志越详细，日志目录在沙盒/Library/Caches/Pili-ShortVideo/Logs：
![](http://cdn.iorange.vip/s_11.png)

## 短视频SDK是否支持同时编辑多个视频，同时转码多个视频输出报错怎么处理
短视频SDK建议每次处理一个视频，多个视频同时编辑输出可能会触发底层硬件编码器的报错。

## PLSVideoMixRecorder初始化耗时久
查看是否开启了回声消除 acousticEchoCancellationEnable，关掉可以减少耗时
因为回音消除这个需要硬件来做，硬件上处理需要花时间，没有办法避免

## 短视频SDK3.0.0版本 xcode10编译不过

![](http://cdn.iorange.vip/s_12.png)
原因：3.0.0版本SDK使用的是xcode11打包的，可能会影响之前版本xcode的正常编译使用。
解决方案：提供灰度包，目前有专业版本的灰度包，如果客户是其他版本的，比如基础版进阶版，可以联系SDK同学

专业版：

真机：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKitv3.0.0-for-xcode10-Release-pro-iphoneos.zip>

模拟器：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKitv3.0.0-for-xcode10-Release-pro-universal.zip>

基础版：

真机：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-iphoneos-basic_for_xcode10.zip>

模拟器：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-universal-basic_for_xcode10.zip>

## PLSAVAssetExportSession合成崩溃
![](http://cdn.iorange.vip/s_13.png)
PLSAVAssetExportSession 的 outputSettings 中，movie的PLSDurationKey是0导致的

## 短视频SDKv3.0.0版本支持模拟器编译版本灰度包
3.0.0线上版本只有专业版包含模拟器x86_64架构，其他版本需要提供灰度包

基础版：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-v3.0.0-basic-universal.zip>

精简版：<http://pr8hjn86c.bkt.clouddn.com/PLShortVideoKit-v3.0.0-short-universal.framework.zip>

灰度包需要客户手动拖入工程，需要注意的是短视频SDK依赖Qiniu上传SDK，手动拖入Qiniu或通过cocoapods引入Qiniu，否则运行会报错；另外如果要使用SDK自带的美颜功能，需要手动引入libMuseProcessor.a，Demo工程文件夹里可以找到这个包。

## 是否支持声音内录
不建议

短视频录屏的代码在PLScreenRecorderManager中，是外部封装的replykit，只采集了麦克风的声音，没有采集app

ps：虽然代码可以更改，ios13上replykit采集的麦克风和APP的声音数据中，声道数不一样，写在一起可能会有问题

## 3.1.0偶现qos数组crash
![](http://cdn.iorange.vip/s_14.png)
qos数组的问题，重载后正常，可以建议客户卸载重装，然后重新运行安装，不影响后续的正常使用

## v3.1.1版本demo合拍功能滤镜设置无效
3.1.1版本PLSVideoMixRecorder采集的音视频buffer回调不走，目前已提供灰度包，其他版本可以问研发打包，预计下个版本修复：

进阶版：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-3.1.1.1-advance.zip>

专业版：<http://peioy2m4j.bkt.clouddn.com/PLShortVideoKit-3.1.1.1-pro.zip>
