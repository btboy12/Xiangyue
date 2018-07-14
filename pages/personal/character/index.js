// pages/personal/character/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: [],
    testFinish: false,
    show_cancel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let test = require("./character_test");
    for (let i = test.length, cache = null, ptr = 0; i > 0; i--) {
      cache = test[i - 1];
      ptr = parseInt(Math.random() * i);
      test[i - 1] = test[ptr];
      test[ptr] = cache;
    };

    this.setData({
      test,
      index: 0
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

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

  select({
    target: {
      dataset: {
        result
      }
    }
  }) {
    const {
      $Message
    } = require('../../../iview/base/index');

    if (this.data.index < this.data.test.length - 1) {
      this.setData({
        index: this.data.index + 1
      });
    } else {
      console.info(this.data);
      this.setData({
        testFinish: true
      })
    }
  },

  confirm() {
    console.info("nav");
    wx.switchTab({
      url: '/pages/main/navpage/index'
    });
  }
})