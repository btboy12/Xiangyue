//app.js
wx.hideTabBar();

App({
  onLaunch: function() {

  },
  onShow: function() {
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
            console.info(openid)
            _.token = openid;
          }
        })
      }
    })
  },
  prefix: "http://192.168.123.1",
  socket_prefix: "ws://192.168.123.1"
})