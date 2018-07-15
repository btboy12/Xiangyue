// pages/history/notice/index.js
const app = getApp();
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
      url: `${app.prefix}/activity`,
      data: {
        token: app.token
      },
      success({
        data
      }) {
        _.setData({
          notice: data.result_list
        })
      }
    })
  },

  showInfo(info) {
    this.setData({
      mask: true
    });
  },
  accept({
    target: {
      dataset
    }
  }) {
    wx.request({
      url: `${app.prefix}/activity/state`,
      data: {
        "id": dataset.id,
        "state": 1,
        "applicant": dataset.applicant
      },
      method: "POST"
    })
  },
  reject({
    target: {
      dataset
    }
  }) {
    wx.request({
      url: `${app.prefix}/activity/state`,
      data: {
        "id": dataset.id,
        "state": 1,
        "applicant": dataset.applicant
      },
      method: "POST"
    })
  }
})