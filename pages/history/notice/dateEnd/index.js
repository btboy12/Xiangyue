// pages/history/notice/dateEnd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: ["牛逼", "强", "巨牛逼", "帅得一批", "巨强", "狗逼", "弱智", "脑子可能是被猪给踢了", "聪明又伶俐", "可爱又迷人"],
    showTagCloud: false,
    tags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  tapTag() {
    this.setData({
      showTagCloud: true
    });
  },

  selectTag(tag) {
    console.info(tag);
    this.data.tags.push(tag.detail);
    this.setData({
      tags: this.data.tags
    });
  }
})