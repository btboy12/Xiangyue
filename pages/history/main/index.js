// pages/history/main/index.js
const app = getApp();
console.info(app)
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
    ],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _ = this;
    wx.request({
      url: `${app.prefix}/activity/current`,
      data: {
        token: app.token
      },
      success({
        data,
        statusCode
      }) {
        if (statusCode == 555) {
          wx.getStorage({
            key: 'current-activity',
            success({
              data
            }) {
              let end_time = Date.parse(end_time);
              if (Date.now() > end_time) {
                wx.navigateTo({
                  url: "/pages/history/notice/dateEnd/index"
                });
              } else {
                _.setData({
                  showModal: true
                });
              }
              let msg = data.message[data.message.length - 1];
            }
          })
        } else {
          wx.getStorage({
            key: 'current-activity',
            fail() {
              wx.setStorage({
                key: 'current-activity',
                data: {
                  info: data,
                  message: []
                }
              })
            }
          })
        }
      }
    })
  },

  toMessage() {
    this.hasMessage = (Math.random() > 0)
    if (this.hasMessage) {
      wx.navigateTo({
        url: "/pages/history/message/index"
      })
    } else {
      const {
        $Toast
      } = require('../../../iview/base/index');

      $Toast({
        content: '您目前暂时没有活动哦'
      });
    }
  },

  clickModal({
    detail
  }) {
    if (detail.index === 1) {
      wx.navigateTo({
        url: '/pages/main/joinactivity/index',
      })
    }
    this.setData({
      showModal: false
    });
  }
})