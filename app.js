App({
  onLaunch() {
    wx.cloud.init({
      traceUser: true,
    });
    
    wx.cloud.callFunction({
      name: 'get_openId',
      success: res => {
        this.globalData.user_openid = res.result.openid
      }
    });
    //数据库
    wx.cloud.database({
      env: "cloud1"
    });
    //音乐
    let mengpo = wx.createInnerAudioContext();
    mengpo.src = 'http://img.ieugen.com/audio/mengpo.mp3';
    mengpo.loop = true;
    this.globalData.mengpoAudio = mengpo;
    let naihe = wx.createInnerAudioContext();
    naihe.src = 'http://img.ieugen.com/audio/naihe.mp3';
    naihe.loop = true;
    this.globalData.naiheAudio = naihe;
  },
  globalData: {
    user_openid:'',
    mengpoPlay: true,
    naihePlay: false
  }
})
