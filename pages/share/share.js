Page({
  data: {

  },

  shareTimeline(){
    wx.showToast({
      icon: 'none',
      title: '通过右上角分享哦',
    })
  },

  onShareAppMessage() {
    return {
      title: "干了这碗孟婆汤",
      path: '/pages/start/start'
    }
  },

  onShareTimeline() {
    return {
      title: "干了这碗孟婆汤",
    }
  }
})