// pages/history/main/index.js
const app = getApp();

function compare(superarray, subarray, key) {
  let result = [];
  for (let item of superarray) {
    if (!subarray.find(v => v[key] === item[key])) {
      result.push(item);
    }
  }
  return result;
}

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