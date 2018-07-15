// pages/main/main.js
let utils = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_time: false,
    innerWidth: '600rpx',
    innerHeight: '800rpx'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _ = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.info(res);
      },
      fail() {
        _.setData({
          first_time: true
        })
      }
    });
    this.getwidheight();
  },

  getUserInfo({
    detail
  }) {
    let _ = this;
    wx.getLocation({
      success({
        latitude,
        longitude
      }) {
        let data = {
          name: detail.userInfo.nickName,
          student_no: 0,
          school: '',
          academy: '',
          major: '',
          label: '',
          character: 0,
          gender: detail.userInfo.gender,
          geo_location: `${latitude},${longitude}`,
          portrait: detail.userInfo.avatarUrl,
          token: app.token
        }

        wx.request({
          url: `${app.prefix}/userinfo`,
          method: "post",
          data
        })

        _.setData({
          first_time: false
        });
        wx.setStorage({
          key: 'userInfo',
          data
        });
      }
    })
  },
  toCharactTest(event) {
    this.getUserInfo(event);
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // },
  getwidheight: function() {
    let _this = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        _this.setData({
          innerWidth: res.windowHeight + 'rpx',
          innerHeight: res.windowWidth + 'rpx'
        })
      }
    })
  },
  nav_join: function() {
    wx.getStorage({
      key: 'activities',
      success: function(res) {
        if (res.data.length === 0) {
          wx.navigateTo({
            url: '../joinactivity/index',
          })
        } else {
          wx.showToast({
            title: '你已经参加活动啦',
          })
        }
      }
    })

  },
  nav_create: function() {
    wx.getStorage({
      key: 'activities',
      success: function(res) {
        if (res.data.length === 0) {
          wx.navigateTo({
            url: '../createactivity/index',
          })
        } else {
          wx.showToast({
            title: '你已经参加活动啦',
          })
        }
      }
    })

  }

})