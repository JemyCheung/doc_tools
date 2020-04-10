# 实时音视频

## track模式  
每个音频、视频为单独的track。  

### 连麦场景

- 房间内每个人之间进行音/视频交流  
	需要相互发布自己的音/视频track，并且订阅其他人的音/视频track
- 教育场景，老师发布音/视频，学生发布音频  
	老师端采集音/视频并publish，学生端发布音频track，然后每个人都需要订阅房间内所有track(音频、视频)

### 直播场景/合流

   接入步骤：[服务端合流](https://doc.qnsdk.com/rtn/docs/merge_stream#2_0)  

- 控制台的配置，或者我们提供的业务服务端的sdk，都是对合流的画面总大小的设置，比如：480x960
- 合流需要客户端，调用合流的方法，具体调用姿势可以参考[客户端调用姿势](https://doc.qnsdk.com/rtn/)
- 客户端调用合流api会带参数发指令到我们服务端，配置客户端用户A画面（0,0,480,480),B用户(0,480,480,480)

   ![](http://cdn.iorange.vip/mergestream.png)