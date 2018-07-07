// pages/main/main.js
let utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '约饭', value: 'lunch' },
      { name: '学习', value: 'study' },
      { name: '玩桌游', value: 'game' },
      { name: '看电影', value: 'movie' },
    ],
    payitems: [
      { name: 'AA', value: 'i' },
      { name: '学习', value: 'dutch' },
      { name: '对方掏', value: 'you' },
      { name: '无', value: 'none' },
    ],
    fold:false,
    typename:'请选择',
    payname:'请选择',
    payfold:false,
    date:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let time = utils.formatTime(new Date()).split(' ')[0];
    let curdate = time.replace(/\//g,"-");
    this.setData({
      date:curdate
    })

  
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
  handleActivityChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },
  handleClick() {
    this.setData({
      position: this.data.position.indexOf('left') !== -1 ? 'right' : 'left',
    });
  },
  handleDisabled() {
    this.setData({
      disabled: !this.data.disabled
    });
  },
  toggleTypeSelect(){
    let flag = this.data.fold;
    this.setData({
      fold:!flag
    })
  },
  radioChange:function(e){
    let name = e.detail.value;
    console.log(name);
    this.setData({
      typename:name,
      fold:false
    })
  },
  togglePaySelect(){
    let flag = this.data.payfold;
    this.setData({
      payfold: !flag
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})