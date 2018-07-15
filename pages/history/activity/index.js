// pages/history/activity/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: wx.getStorageSync("activities")
  },
  toMessage({
    detail: {
      data
    }
  }) {
    wx.navigateTo({
      url: `/pages/history/message/index?id=${detail.application}&name=${detail.application_name}`
    })
  }
})