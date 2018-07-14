// pages/personal/authentication/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _ = this;
    wx.getStorage({
      key: 'token',
      success({
        data: tokenid
      }) {
        wx.request({
          url: 'http://localhost/userinfo',
          data: {
            tokenid
          },
          success({
            data
          }) {
            _.setData(data)
          }
        })
      }
    })
  }
})