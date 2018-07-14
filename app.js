//app.js
wx.hideTabBar();

App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: ({
        code
      }) => {
        wx.request({
          url: 'http://localhost/login',
          success({
            data
          }) {
            wx.setStorage({
              key: 'token',
              data: data.openid,
            })
          }
        })
      }
    })
  },
  onShow: function() {
    wx.navigateTo({
      url: "/pages/history/notice/dateEnd/index"
    });
  }
})