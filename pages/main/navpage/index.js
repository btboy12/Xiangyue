// pages/main/main.js
let utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_time: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _ = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.info(res);
      },
      fail() {
        _.setData({
          first_time: true
        })
      }
    })

  },

  getUserInfo({
    detail
  }) {
    this.setData({
      first_time: false
    });
    wx.setStorage({
      key: 'userInfo',
      data: detail.userInfo,
    });
  },
  toCharactTest({
    detail
  }) {
    this.setData({
      first_time: false
    })
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // },

})