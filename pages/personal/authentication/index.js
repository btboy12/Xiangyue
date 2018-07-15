// pages/personal/authentication/index.js
const {
  $Message
} = require('../../../iview/base/index');
const app = getApp();
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
    wx.request({
      url: `${app.prefix}/userinfo`,
      data: {
        token: app.token
      },
      success({
        data
      }) {
        _.setData(data)
      }
    })
  },
  confirm() {
    wx.request({
      url: `${app.prefix}/userinfo`,
      method: "post",
      data: Object.assign(this.data, { token: app.token}),
      success() {
        $Message({
          content: '认证成功',
          type: 'success',
          duration: 1
        });
        setTimeout(wx.navigateBack, 1000);
      }
    })
  }
})