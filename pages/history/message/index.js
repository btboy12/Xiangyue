// pages/history/message/index.js
const app = getApp();
let activity_info;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    modalActions: [{
        name: "确定",
        loading: false
      },
      {
        name: "再考虑一下"
      }
    ],
    showModal: false,
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    let _ = this;
    wx.getStorage({
      key: 'current-activity',
      success: function({
        data: {
          info,
          message
        }
      }) {
        activity_info = info;
        _.setData({
          message
        });

        wx.setNavigationBarTitle({
          title: info.content
        });
        wx.connectSocket({
          url: `ws://192.168.123.1:8000`,
          protocols: ['protocol8', 'protocol13'],
          header: {
            'token': app.token,
            'to': info.application
          },
          success() {
            console.info("connect success")
          },
          fail() {
            console.error("connnect error")
          }
        });
        wx.onSocketMessage(function({
          data
        }) {
          let msg = _.data.message;
          msg.push({
            send: false,
            text: data
          });
          _.setData({
            message: msg
          });
          wx.setStorage({
            key: 'current-activity',
            data: {
              info: activity_info,
              message: msg
            },
          })
        })
      },
    })
  },

  onHide() {
    wx.closeSocket();
  },

  onUnload() {
    wx.closeSocket();
  },

  cancelActivity() {
    this.setData({
      showModal: true
    });
  },

  send({
    detail
  }) {
    wx.sendSocketMessage({
      data: detail.value,
    });

    let msg = this.data.message;
    msg.push({
      send: true,
      text: detail.value
    });

    this.setData({
      message: msg
    });

    wx.setStorage({
      key: 'current-activity',
      data: {
        info: activity_info,
        message: msg
      },
    })

    this.setData({
      text: ""
    });
  },

  clickModal({
    detail
  }) {
    if (detail.index === 1) {
      this.setData({
        showModal: false
      });
    } else {
      const action = [...this.data.modalActions];
      action[0].loading = true;

      this.setData({
        modalActions: action
      });

      setTimeout(() => {
        action[0].loading = false;
        this.setData({
          showModal: false,
          modalActions: action
        });
      }, 2000);
    }
  }
})