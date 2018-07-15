//app.js
wx.hideTabBar();

function compare(superarray, subarray, key) {
  let result = [];
  for (let item of superarray) {
    if (!subarray.find(v => v[key] === item[key])) {
      result.push(item);
    }
  }
  return result;
}

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
          data: {
            code
          },
          success({
            data: {
              res
            }
          }) {
            let local_activity = [];
            let remote_activity = [];

            function complete() {
              let diff_activity = compare(local_activity, remote_activity, "id");
              if (diff_activity.length) {
                for (let activity of diff_activity) {
                  wx.request({
                    url: `${app.prefix}/activity/cancel`,
                    success(data) {
                      if (data) {
                        _.cancelActivities.push(activity)
                      } else {
                        app.endActivity = activity;
                      }
                    }
                  })
                }
              }
            }

            // let openid = JSON.parse(res).openid;
            let openid = '1';
            _.token = openid;
            if (false) {
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
            }

            let process_count = 2;
            wx.getStorage({
              key: 'activities',
              success({
                data
              }) {
                local_activity = data;
              }
            });

            wx.request({
              url: `${_.prefix}/activity/current`,
              data: {
                token: openid
              },
              success({
                data: {
                  results
                }
              }) {
                remote_activity = results;
                wx.setStorage({
                  key: 'activities',
                  data: results || []
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
    if (!this.cancelModalLock && this.cancelActivities.length) {
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
  // prefix: "http://123.207.236.41:8000",
  prefix: "http://localhost"
})