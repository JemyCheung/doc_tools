# 短视频
## 短视频自定义分辨率大小
```
//默认选用sdk内置
videoEncodeSetting.setEncodingSizeLevel(PLVideoEncodeSetting.VIDEO_ENCODING_SIZE_LEVEL.VIDEO_ENCODING_SIZE_LEVEL_480P_1); // 480x480

/**
 * 如果 SDK 内置的分辨率列表不能满足需求，可以通过此方法自定义编码视频的分辨率
 * @param width 宽度
 * @param height 高度
 */
public PLVideoEncodeSetting setPreferedEncodingSize(int width, int height);

```
## 拍摄视频不清晰/模糊
A:通常是视频编码的参数没有调整到位。首先通过PLCameraSetting设置采集的分辨率和码率，再通过PLVideoEncodeSetting设置视频的编码分辨率和码率。确保cameraSetting的值>=encodeSetting值。对应设置可以参考[码率与分辨率关系](http://www.lighterra.com/papers/videoencodingh264/)

## 精简版、基础版、进阶版、专业版差异及兼容升级
A:[版本功能差异](https://developer.qiniu.com/pili/sdk/3731/short-video) ，精简版向专业版升级，直接替换jar包和so文件；专业版向精简版缩减时，需要对照版本功能差异删除代码中专业版功能

## 短视频报error code = -8
A:联系您对应销售/商务，开通短视频授权。自2.2.1版本起通过PLShortVideoEnv类可以进行鉴权查询

## 短视频最短时间限制
A:没有限制，点按录制视频小于一帧，可以在onDurationTooShort这个方法的回调中，恢复进度条状态

## 最大时长
理论上来说是没有最大时长的，如果要做动态更新时长调整，可以设置setMaxRecordDuration(10000)，然后在应用层控制实际录制的时间，就可以动态调整到(0,10000]

## 短视频支持h265编码的mp4文件吗
A:不支持,只支持h264,h263也不支持

## 屏幕录制支持对单个窗口的录制吗
A:短视频sdk支持屏幕录制，可以设置屏幕录制大小，不支持对单独的view进行录制

## 是否支持全屏录制
A:支持，demo提供的只是限制ui，您在ui上做更改即可，同时应修改配置的预览分辨率和编码分辨率为全屏(eg:1280x720,demo默认480x480)

## PLShortVideoUploader ClassNotFound
A:gradle依赖 compile 'com.qiniu:qiniu-android-sdk:7.4.3'，可以用短视频封装的上传，也可以直接调用上传API [Android上传](https://developer.qiniu.com/kodo/sdk/1236/android)

## getApplicationContext()' on a null object reference
A:v3.0.0-v3.0.1有这个报错，在Application或者onCreate加上 PLShortVideoEnv.checkAuthentication(getApplicationContext(), new PLAuthenticationResultCallback() {….}

## 是否支持声音内录
A:目前 android 系统已经限制录制系统声音了，我们 sdk 只能录制麦克风采集的声音，可以将扬声器声音调大，也是能被手机录入，只是会失真
