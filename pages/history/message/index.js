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
  onLoad({
    id,
    name
  }) {
    wx.setNavigationBarTitle({
      title: name
    })
    console.info(id, name);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    let _ = this;
    wx.getStorage({
      key: `message_${this.data.to}`,
      success: function({
        data
      }) {
        activity_info = info;
        _.setData({
          message: data
        });

        wx.setNavigationBarTitle({
          title: info.content
        });
      },
    })
  },

  onHide() {
    app.onReceiveMsg = null;
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
      key: `message`,
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