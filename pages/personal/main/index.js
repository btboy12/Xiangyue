// pages/personal/personal.js
const app = getApp();

Page({
  data: {

  },
  onLoad() {
    console.info(app);
    let _ = this;
    wx.request({
      url: 'http://localhost/userinfo',
      data: {
        tokenid: app.token
      },
      success({
        data
      }) {
        data.label = data.label.split(";");
        _.setData(data);
      }
    })
  },
  navToCharacter() {
    wx.navigateTo({
      url: '/pages/personal/character/index'
    });
  },

  navToAuthentication() {
    wx.navigateTo({
      url: '/pages/personal/authentication/index'
    });
  },

  addTag() {

  }
})