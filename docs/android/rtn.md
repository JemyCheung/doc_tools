# 实时音视频
基于webrtc实现了音视频的连麦互动，同时我们在连麦的流媒体服务端获取到每个人的音视频之后，支持合流转推到我们的直播云服务进行直播  
## 基础点  
- 实时音视频支持以track模式进行音视频数据交互，比如两个人连麦，user1和user2可以分别publish自己的audio和video，
那么user1可以只订阅user2的音频或者视频，或者音视频都订阅。相反user2也可以订阅user1。

- 直播sdk只能做直播，实时音视频的sdk可以做连麦和直播。但是两者没有强行关联。在连麦时，在客户端仅调用合流API，我们服务端可以转推到直播云  

在连麦时，比如user1和user2，都publish了自己的音视频。在我们流媒体服务端是有四路tracks，分别是user1的
video1和audio1，user2的video2和audio2。这个时候在客户端(Android/iOS/web)可以调用合流，发指令到我们服务端，指定合成
tracks[video1,audio1,video2,audio2]中任意track，合流后会转推到直播云产品进行直播

## 场景划分
新接入或者产品切换到实时音视频(连麦/webrtc)时有很多场景，下面是针对各个场景的一个方案

### 原有直播sdk转rtn
原直播jar包：pldroid-media-streaming-xxx.jar。只有这个jar包都是单纯的只有直播功能。无法实现连麦。
需要切换产品

### 单纯实现连麦
直接跑起来demo就可以，参考demo接入  
[实时音视频demo](https://github.com/pili-engineering/QNRTC-Android)

### 连麦rtn实现单人直播
首先需要开通直播云服务，并在服务端已经配置好合流转推的hub，推荐转推的流名用魔法变量${roomName}
- Android demo，只实现了连麦
- 先把demo跑起来，在onLocalPublished会回调本地发布的音视频track，进行合流自己的音视频
- 调用合流API
```  
	List<QNMergeTrackOption> options = null;
	//默认，合流自己发布的数据
    @Override
    public void onLocalPublished(List<QNTrackInfo> trackInfoList) {
        updateRemoteLogText("onLocalPublished");
        mEngine.enableStatistics();
        Log.e("zw","onLocalPublished");
         options = new ArrayList<>();
        for(QNTrackInfo trackInfo:trackInfoList){
            if(trackInfo.getTrackKind() == QNTrackKind.VIDEO){ //添加视频track
                QNMergeTrackOption video = new QNMergeTrackOption();
                //指定视频在整个合流画面中的坐标点，及视频的宽高
                video.setX(0);
                video.setY(0);
                video.setWidth(480);
                video.setHeight(640);
                video.setTrackId(trackInfo.getTrackId());
                options.add(video);
            }
            if(trackInfo.getTrackKind() == QNTrackKind.AUDIO){ //添加音频track
                QNMergeTrackOption audio = new QNMergeTrackOption();
                audio.setTrackId(trackInfo.getTrackId());
                options.add(audio);
            }
        }
        mEngine.setMergeStreamLayouts(options,null); //进行合流
	}

```

### rtn连麦互动并进行直播
- 两人连麦转推一路流给观众  

在上面合流自己音视频代码的基础上，需要另一个人加入房间，并在onRemotePublished回调时合流远端用户的音视频track
```  
	// 在远端用户加入房间后，合流远端用户的音视频
    @Override
    public void onRemotePublished(String remoteUserId, List<QNTrackInfo> trackInfoList) {
        for(QNTrackInfo trackInfo:trackInfoList){
            if(trackInfo.getTrackKind() == QNTrackKind.VIDEO){
                QNMergeTrackOption video = new QNMergeTrackOption();
				//指定视频在整个合流画面中的坐标点，及视频的宽高
                video.setX(480);
                video.setY(0);
                video.setWidth(480);
                video.setHeight(640);
                video.setTrackId(trackInfo.getTrackId());
                options.add(video);
            }
            if(trackInfo.getTrackKind() == QNTrackKind.AUDIO){
                QNMergeTrackOption audio = new QNMergeTrackOption();
                audio.setTrackId(trackInfo.getTrackId());
                options.add(audio);
            }
        }
        mEngine.setMergeStreamLayouts(options,null);
    }
```

- 两主播连麦转推两路流给各自的观众  

这个只是对API setMergeStreamLayouts(options,null)的另一种调用方式，当第二个参数设置为null时是默认合流转推到
对应房间名的直播流上，可以构建任务转推到指定url。当不为null时就是指定合流任务

```
	QNMergeJob mjob = null;
    List<QNMergeTrackOption> list = null;
    List<QNMergeTrackOption> options = null;
    @Override
    public void onLocalPublished(List<QNTrackInfo> trackInfoList) {
        updateRemoteLogText("onLocalPublished");
        mEngine.enableStatistics();
        mjob = new QNMergeJob();//创建合流任务
		//指定视频在整个合流画面中的坐标点，及视频的宽高
        mjob.setWidth(240);
        mjob.setHeight(360);
        mjob.setBitrate(400*1024);
        mjob.setFps(15);//指定fps
		//指定转推的地址
        mjob.setPublishUrl("rtmp://publish.rrsd.qiniuts.com/jemy/zwtest");
		//创建jobId
        mjob.setMergeJobId("qiniutest");
		//创建音视频track
        QNMergeTrackOption video = null;
        QNMergeTrackOption audio = null;
        for (QNTrackInfo track : trackInfoList) {
            if(track.getTrackKind().equals(QNTrackKind.VIDEO)){
                video = new QNMergeTrackOption();
                video.setX(0);
                video.setY(0);
                video.setWidth(240);
                video.setHeight(360);
                video.setTrackId(track.getTrackId());
            }else{
                audio = new QNMergeTrackOption();
                audio.setTrackId(track.getTrackId());
            }
        }
		//设置合流任务 此API创建后会回调onCreateMergeJobSuccess
        mEngine.createMergeJob(mjob);
        list = new ArrayList<QNMergeTrackOption>();
        if(video!=null&&audio!=null){
            list.add(video);
            list.add(audio);
        }
    }
	//当回调合流任务创建成功后开始合流
	@Override
   public void onCreateMergeJobSuccess(String mergeJobId) {
	   mEngine.setMergeStreamLayouts(list,mergeJobId);
   }
```


## 合流部分  
每个音频、视频为单独的track。  

### 连麦

- 房间内每个人之间进行音/视频交流  
	需要相互发布自己的音/视频track，并且订阅其他人的音/视频track
- 教育场景，老师发布音/视频，学生发布音频  
	老师端采集音/视频并publish，学生端发布音频track，然后每个人都需要订阅房间内所有track(音频、视频)

### 直播/合流

   接入步骤：[服务端合流](https://doc.qnsdk.com/rtn/docs/merge_stream#2_0)  

- 控制台的配置，或者我们提供的业务服务端的sdk，都是对合流的画面总大小的设置，比如：480x960
- 合流需要客户端，调用合流的方法，具体调用姿势可以参考[客户端调用姿势](https://doc.qnsdk.com/rtn/)
- 客户端调用合流api会带参数发指令到我们服务端，配置客户端用户A画面（0,0,480,480),B用户(0,480,480,480)

   ![](http://cdn.iorange.vip/mergestream.png)


## 房间创建销毁时机
	房间只是虚拟概念，并不真实存在。只是joinroom的token中携带的一个参数，我们会根据这个参数将某一群相同roomName的人划分到一个连麦房间下  
	房间的创建时机是当有人进入房间后，销毁时机是所有人都离开房间的时候
## 房间创建销毁的回调，房间人数
    客户端会有参与连麦的人进入房间和离开房间的回调。服务端没有回调，可以主动去查询 https://doc.qnsdk.com/rtn/docs/server_overview#2_2_0
