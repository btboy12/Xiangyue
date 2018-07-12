// pages/history/notice/dateEnd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: ["积极", "热情", "率真", "幽默", "独立", "稳重", "温和", "包容", "细心", "游戏", "音乐", "影视", "二次元", "摄影", "科技", "艺术", "运动"],
    showTagCloud: false,
    tags: [],
    needDelete: false,
    moddingTagIndex: null,
    good: false
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

  addTag() {
    this.setData({
      showTagCloud: true,
      needDelete: false,
      moddingTagIndex: null
    });
  },
  modTag(event) {
    this.setData({
      showTagCloud: true,
      needDelete: true,
      moddingTagIndex: event.target.dataset.index
    });
  },

  selectTag(tag) {
    if (tag.detail) {
      this.data.tags.push(tag.detail);
    } else {
      this.data.tags.splice(this.data.moddingTagIndex, 1);
    }
    this.setData({
      tags: this.data.tags
    });
  },

  tapGood() {
    this.setData({
      good: !this.data.good
    });
  }
})