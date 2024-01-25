const record = wx.cloud.database().collection('record');
Page({
  data: {
    info: [],
    show: null, //null不显示，true记住，false忘记
    current: 0
  },

  setLetter(e){
    let state = e.target.dataset.info;
    if(this.data.info.filter(item => item.condition === state))
    this.setData({
      show: state
    })
    if(state){
      wx.showToast({
        title: '左右滑查看更多~',
        icon: 'none',
        duration: 1000
      });
    }
  },

  delete(){
    let that = this;
    wx.showModal({
      title: '删除信息',
      content: '确定删除吗？此操作不可逆',
      success (res) {
        if (res.confirm) {
          // record.where({_id: that.data.info[that.data.show]._id}).remove();
          // that.data.info.splice(that.data.show,1);
          that.setData({
            // info: this.data.info,
            show: null
          })
          wx.showToast({
            title: '删除成功~',
            icon: 'none',
            duration: 1000
          });
        }
      }
    })
  },

  gotoMain(){
    wx.navigateBack({
      delta: 1
    })
  },

  playSound() {
    let app = getApp();
    if(app.globalData.naihePlay === true){
      app.globalData.naiheAudio.stop();
      app.globalData.naihePlay = false
    }
    else {
      app.globalData.naiheAudio.play();
      app.globalData.naihePlay = true
    }
  },

  onLoad(){
    const openid = getApp().globalData.user_openid;
    record.where({_openid: openid}).get().then(res => {
      this.setData({
        info: res.data
      })
    })
  },

  onShow(){
    let app = getApp();
    if(app.globalData.mengpoPlay === true){
      app.globalData.mengpoAudio.stop();
      app.globalData.mengpoPlay = false
      app.globalData.naiheAudio.play();
      app.globalData.naihePlay = true
    }
  }
});