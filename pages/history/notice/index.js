// pages/history/notice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [],
    mask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _ = this;
    wx.request({
      url: 'http://localhost/activity',
      success({
        data
      }) {
        _.setData({
          notice: data.data
        })
      }
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

  showInfo(info) {
    this.setData({
      mask: true
    });
  },
  accept() {
    wx.request({
      url: "http://123.207.236.41:8000/TestModel/input/",
      data: {
        "id": 12,
        "name": "fuckpython"
      },
      header: {
        'content-type': 'application/json'
      },
      method: "POST"
    })
  }
})