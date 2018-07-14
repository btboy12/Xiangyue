// pages/history/notice/dateEnd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTagCloud: false,
    tags: [],
    needDelete: false,
    moddingTagIndex: null,
    good: false
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
  },

  confirm() {
    wx.navigateBack();
  },
  cancel() {
    wx.navigateBack();
  }
})