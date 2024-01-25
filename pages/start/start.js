const record = wx.cloud.database().collection('record');
const letters = [
  "我有汤，你有故事吗？",
  "不只提供忘记服务喔···",
  "嘿嘿嘿嘿",
  "你在思念什么呢？"
]
let say_timer = null;
Page({
  data: {
    loading: 4, //图片是否加载完毕
    showText: false, //展示填写界面
    showResult: false, //展示成功界面
    self: true, //是否是自己
    subject: "", //如果是别人，别人昵称
    condition: true, //是否为"记住"
    memory: "", //具体内容，封顶140字符
    animation: 0, //控制动画的进程
    say: "我有汤，你有故事吗？",
    mute: false
  },

  //填写相关函数
  //#region 
  changeSubject() {
    this.setData({
      self: !(this.data.self)
    })
  },

  inputSubject(e) {
    this.setData({
      self: e.detail.value === "" ? true : false,
      subject: e.detail.value
    })
  },

  showText(e) {
    this.setData({
      showText: e.target.dataset.show
    })
  },

  changeText(e) {
    this.setData({
      memory: e.detail.value
    })
  },

  remember(e) {
    if (this.data.self === false && this.data.subject.length === 0) {
      wx.showToast({
        title: '您未填写昵称！',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    setTimeout(() => {
      //此时运行changeText函数，需要等待memory更新好

      if (this.data.memory.length === 0) {
        wx.showToast({
          title: '您未填写内容！',
          icon: 'error',
          duration: 1000
        });
        return;
      }

      //缓存数据
      let date = new Date();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      let datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`;
      this.setData({
        condition: e.target.dataset.condition,
      });

      //向服务器存储数据
      record.add({
        data: {
          time: datetime,
          subject: this.data.self ? "自己" : this.data.subject,
          condition: e.target.dataset.condition,
          memory: this.data.memory
        },
      })
      this.setData({
        showText: false,
        showResult: true
      })
    }, 1000);
  },
  //#endregion

  //展示相关函数
  gotoUser() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },

  gotoShare(){
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },

  playSound() {
    let app = getApp();
    if(app.globalData.mengpoPlay === true){
      app.globalData.mengpoAudio.stop();
      app.globalData.mengpoPlay = false
    }
    else{
      app.globalData.mengpoAudio.play();
      app.globalData.mengpoPlay = true
    }
    this.setData({
      play: !(this.data.play)
    })
  },

  onShow() {
    let app = getApp();
    if(app.globalData.naihePlay === true){
      app.globalData.naiheAudio.stop();
      app.globalData.naihePlay = false;
      app.globalData.mengpoAudio.play();
      app.globalData.mengpoPlay = true;
      this.setData({
        play: true
      })
    }
    say_timer = setInterval(() => {
      this.setData({
        say: letters[Math.floor(Math.random()*letters.length)]
      })
    }, 5000);
    setInterval(() => {
      this.setData({
        animation: this.data.animation + 1
      })
    },100);
  },
});