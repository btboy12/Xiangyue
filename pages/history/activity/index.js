// pages/history/activity/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: wx.getStorageSync("activities")
  },
  onLoad(){
    console.info(this.data.activities)
  },
  toMessage({
    target: {
      dataset
    }
  }) {
    console.info(dataset)
    wx.navigateTo({
      url: `/pages/history/message/index?id=${dataset.id}&name=${dataset.name}`
    })
  }
})