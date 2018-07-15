//app.js
wx.hideTabBar();
App({
  onShow() {
    let _ = this;
    // 登录
    wx.login({
      success: ({
        code
      }) => {
        wx.request({
          url: `${_.prefix}/login`,
          // url: "http://123.207.236.41:8000/login",
          data: {
            code
          },
          success({
            data: {
              openid
            }
          }) {
            _.token = openid;
            wx.connectSocket({
              url: `ws://192.168.123.1:8000?token=${openid}`,
              protocols: ['protocol8', 'protocol13'],
              success() {
                wx.onSocketMessage(function(res) {
                  let {
                    from,
                    text
                  } = JSON.parse(res.data);
                  _.onReceiveMsg && _.onReceiveMsg(text);
                  let history_msg = [];
                  wx.getStorage({
                    key: `message_${from}`,
                    success({
                      data
                    }) {
                      history_msg = data
                    },
                    complete() {
                      history_msg.push({
                        send: false,
                        text
                      });
                      wx.setStorage({
                        key: `message_${from}`,
                        data: history_msg,
                      })
                    }
                  })
                })
              },
              fail() {
                console.error("connnect error")
              }
            });

            let local_activity = [];
            wx.getStorage({
              key: 'activities',
              success({
                data
              }) {
                local_activity = data;
              }
            });

            let remote_activity = [];
            wx.request({
              url: `${_.prefix}/activity/current`,
              data: {
                token: openid
              },
              success({
                data
              }) {
                remote_activity = data;
                wx.setStorage({
                  key: 'activities',
                  data
                });
              }
            });
          }
        });
      }
    });
  },
  onHide() {
    wx.closeSocket();
  },
  showCancelModal() {
    if (!this.cancelModalLock && this.cancelModalLock.length) {
      let info;
      [info, ...this.cancelActivities] = this.cancelActivities;
      wx.showModal({
        title: '真遗憾',
        content: `${info.name}取消了与你的活动`,
        confirmText: "别的活动",
        cancelText: "知道了"
      })
    }
  },
  cancelActivities: [],
  cancelModalLock: false,
  onReceiveMsg: null,
  prefix: "http://192.168.123.1",
})