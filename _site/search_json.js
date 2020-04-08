window.ydoc_plugin_search_json = {
  "documents": [
    {
      "title": "ydoc",
      "content": "This is home page of documents book.",
      "url": "/documents/index.html",
      "children": []
    },
    {
      "title": "播放居中画面被裁减、拉伸、留有黑边、显示不全rtmp播放延时大",
      "content": "        android:id=\"@+id/VideoView\"        android:layout_width=\"match_parent\"\n        android:layout_height=\"match_parent\"\n        android:layout_gravity=\"center\" />\n这个是预期的，1:1的视频是没法放到1:2的显示器上让它完全填充显示器还不变形的延时是多方面共同造成的。这里只讲播放器这端可以调整的部分。播放器缓存策略会缓存一部分数据，可能会导致延时增大，按下面参数试一试，或者可以再相应减少一点点测试一下// 默认的缓存大小，单位是 ms，默认值是：500  options.setInteger(AVOptions.KEY_CACHE_BUFFER_DURATION, 400);  \n\n// 最大的缓存大小，单位是 ms，默认值是：2000  \noptions.setInteger(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION, 1000);\n",
      "url": "/documents/player.html",
      "children": [
        {
          "title": "",
          "url": "/documents/player.html#",
          "content": ""
        }
      ]
    },
    {
      "title": "基本概念一组建议值对应在 sdk 中的配置",
      "content": "关于 分辨率、帧率、码率 等编码基本概念可以参考以下文档H.264 一般规范分辨率、帧率、码率的相互关系关于分档的【标清、高清、超清】，目前并不是通用标准，多数视频站点使用各自的标准，一般只是作为区分的不同视频质量的标识。\n\n画质\n码率\n分辨率\n帧率\n\n\n\n\n标清\n800 kbps\n360x640\n15\n\n\n高清\n1.2 mbps\n540x960\n20\n\n\n超清\n1.8 mbps\n720x1280\n20\n\n\nandroid// 标清StreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(15,800*1024,15,StreamingProfile.H264Profile.BASELINE);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(360,640)\n\t\t\t\t.setAVProfile(avProfile)\n\n// 高清\nStreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(20,1.2*1024*1024,20,StreamingProfile.H264Profile.BASELINE);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(540,960)\n\t\t\t\t.setAVProfile(avProfile)\n\n// 超清\nStreamingProfile.AudioProfileaProfile=newStreamingProfile.AudioProfile(44100,48*1024);\nStreamingProfile.VideoProfilevProfile=newStreamingProfile.VideoProfile(20,1.8*1024*1024,20,StreamingProfile.H264Profile.HIGH);\nStreamingProfile.AVProfileavProfile=newStreamingProfile.AVProfile(vProfile,aProfile);\nmProfile.setPreferredVideoEncodingSize(720,1280)\n\t\t\t\t.setAVProfile(avProfile)\n",
      "url": "/documents/streaming.html",
      "children": []
    },
    {
      "title": "短视频自定义分辨率大小",
      "content": "//默认选用sdk内置videoEncodeSetting.setEncodingSizeLevel(PLVideoEncodeSetting.VIDEO_ENCODING_SIZE_LEVEL.VIDEO_ENCODING_SIZE_LEVEL_480P_1); // 480x480\n\n/**\n * 如果 SDK 内置的分辨率列表不能满足需求，可以通过此方法自定义编码视频的分辨率\n * @param width 宽度\n * @param height 高度\n */\npublic PLVideoEncodeSetting setPreferedEncodingSize(int width, int height);\n\n",
      "url": "/documents/shortvideo.html",
      "children": []
    }
  ]
}