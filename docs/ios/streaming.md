### 直播

## 推流sdk打包时，依赖库HappyDNS的bitcode报错
打包时，rebuild from bitcode不要打钩

## 推流sdk添加水印没有效果
检查下客户使用的水印图片资源是否带scale比例
scale比例：图片文件名后带有@2x或@3x

## 关于横屏推流
- 首先保证播放段画面不旋转，也就是手机本身旋转后，摄像头也要旋转
- 再调整预览画面并且修改推流参数
步骤：
- 手机旋转   设置摄像头旋转方向 PLVideoCaptureConfiguration videoOrientation
- 如果是VC旋转 调整 preview的size ； 或者直接旋转preview
- 修改 PLVideoStreamingConfiguration 的videosize为横屏 （播放段看到的size）
ps：如果是推流的过程中修改
旋转方向用PLMediaStreamingSession的类调用position
新建PLVideoStreamingConfiguration，并调用reload

## 录屏推流横竖屏设置
测试replaykit 推流，初始化进入的时候
UIInterfaceOrientation 是LandscapeRight/LandscapeLeft，sampleBufferSize 宽大于高，是横屏的效果
UIInterfaceOrientation 是Portrait，sampleBufferSize 高大于宽，是竖屏效果
所以判断应该是UIInterfaceOrientation 影响到了replaykit输出的宽高，客户提供的腾讯的 homeOrientation 应该也是这么调整的就问一下
不过这个客户也可以自己外部实现

## 视频帧旋转及优化偶现黑屏 -- 他趣
提给供他趣的灰度包，包含帧旋转
http://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.4-beta-20180831.zip
该sdk在 plus 录制第五人格时候会出现图片中效果
必现步骤：打开 用户中心，再关闭 用户中心 ，就会出现 绿屏问题
原因：分辨率发生变化。最开始 sourceRect 中 size 是 1080，1920，当关闭用户中心时，srcFrameVideoSize 变为了 750，1334，此时需要调整 sourceRect 的值。
sourceRect ：从这个区域取数据。
destRect ：把 sourceRect 区域内的数据放到这个位置
sourceRect 大于实际了的videosize，绿色相当于填充
配置：配置.pages

## 视频帧为0，日志显示failed to setup VTCompressionSession
对象没有正常的释放导致编码器设置失败，由客户调用 destroy 接口，只 dealloc 没有 destroy 还是可能导致编码器没有销毁掉

## 推流SDK v2.3.4 v2.3.5版本推流没声音，使用Demo正常
- 首先看下客户推上来的流音频帧率是否为0，如果不为0，可能是调用了静音。
- 如果音频帧为0，可以让客户按Demo的配置来设置推流参数，一般音频的配置用defaultConfiguration就可以。
- v2.3.4版本音频采集的模块有个位置会有数组越界，但内部做了个保护不会影响正常使用，但如果客户的代码里有类似Swizzle的防止数组越界的功能（发现数组越界即丢弃），就会导致永远采集不到buffer，可以让客户检查下App的代码。
建议去掉Swizzle防越界的模块，或者处理时绕过SDK。
也可以提供2.3.5的灰度版本，已修复这个问题：
真机：https://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.5.1-iphones.zip
真机+模拟器：https://sdk-release.qnsdk.com/PLMediaStreamingKit-v2.3.5.1-universal.zip

## replykit  在ios12  ios13 的bug
replykit在12 和13 的操作系统上有不同程度的问题，主要会导致录屏后没有声音的问题，应该是replykit的bug，需要外部处理下
ios12：
询问获取权限的弹窗不是每次都出现，即使每次都调用
[RPScreenRecorder sharedRecorder].microphoneEnabled = YES;
会导致音频的回调不执行，没有声音
ios13：
同时注册mic 和 app，音频回调正常，发布的音频帧正常，但是播放没有声音，控制台持续打印 [AAC Encoder] reload source ASDB, sample rate 44100hz
单独使用mic 或 app 音频帧率和播放都正常
mic 和 APP中打印的音频的samplebuffer的asbd参数不一样，应该是这个原因导致（声道数不同）

ps：弹窗正常
为了保证在每个系统上都能正常使用，可以使用外部采集   如：QRDMicrophoneSource增加音频samplebuffer回调

## 使用replaykit broadcast录屏偶现推流sdk crash：
image-2019-05-28-16-38-45-663.png
原因是replaykit回调了无效的buffer，sdk内部没有对buffer是否有效做判断，导致memmove抛出异常，可以引导客户在replaykit的回调里加上以下代码过滤掉无效buffer：
if (!CMSampleBufferDataIsReady(sampleBuffer)) return;

## 推流sdk录屏场景Demo（实时更新）
http://peioy2m4j.bkt.clouddn.com/PLMediaStreamingKitFunctionDemo.zip
