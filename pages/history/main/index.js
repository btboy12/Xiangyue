// pages/history/main/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: wx.getStorageSync("historyMessage"),
    hasMessage: false,
    modalActions: [{
        name: "知道了"
      },
      {
        name: "去找新活动"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  toMessage() {
    wx.navigateTo({
      url: "/pages/history/activity/index"
    })
  }
})