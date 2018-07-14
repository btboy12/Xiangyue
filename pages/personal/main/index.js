// pages/personal/personal.js
const app = getApp();

Page({
  data: {
    showTagCloud: false,
    needDelete: false,
    moddingTagIndex: null
  },
  onLoad() {
    console.info(app);
    let _ = this;
    wx.request({
      url: 'http://localhost/userinfo',
      data: {
        tokenid: app.token
      },
      success({
        data
      }) {
        data.label = data.label.split(";");
        _.setData(data);
      }
    })
  },
  navToCharacter() {
    wx.navigateTo({
      url: '/pages/personal/character/index'
    });
  },

  navToAuthentication() {
    wx.navigateTo({
      url: '/pages/personal/authentication/index'
    });
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
    let label = this.data.label;
    if (tag.detail) {
      if (this.data.moddingTagIndex != null) {
        label[this.data.moddingTagIndex] = tag.detail;
      } else {
        label.push(tag.detail);
      }
    } else {
      label.splice(this.data.moddingTagIndex, 1);
    }

    console.info(label);
    this.setData({
      label
    });
  }
})