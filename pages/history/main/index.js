// pages/history/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    hasMessage: false,
    modalActions: [{
        name: "知道了"
      },
      {
        name: "去找新活动"
      }
    ],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let randStr = ["牛逼牛逼牛逼牛", "超强超强", "可爱可爱"];
    let data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        msg: randStr[parseInt(Math.random() * 3)],
        avatar: "https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/75/66/db/7566dbf3-ea0c-1cea-3cb1-8a25e332dd53/AppIcon-1x_U007emarketing-85-220-0-6.png/246x0w.jpg"
      });
    }

    this.setData({
      message: data
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (Math.random() > 0.5) {
      this.setData({
        showModal: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  toMessage() {
    this.hasMessage = (Math.random() > 0.5)
    if (this.hasMessage) {
      wx.navigateTo({
        url: "/pages/history/message/index"
      })
    } else {
      const {
        $Toast
      } = require('../../../iview/base/index');

      $Toast({
        content: '您目前暂时没有活动哦'
      });
    }
  },

  clickModal({
    detail
  }) {
    if (detail.index === 1) {
      wx.navigateTo({
        url: '/pages/main/joinactivity/index',
      })
    }
    this.setData({
      showModal: false
    });
  }
})