let utils = require('../../../utils/util.js')
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
    { name: '我包', value: 'i' },
    { name: 'AA', value: 'dutch' },
    { name: '对方掏', value: 'you' },
    { name: '无', value: 'none' },
  ],
    fold:false,
    typename:'请选择',
    payname:'请选择',
    payfold:false,
    date:'2018-10-2',
    enddate:'2018-10-3',
    brief:'aaa',
    created:false
  },

  onLoad: function (options) {

    let time = utils.formatTime(new Date()).split(' ')[0];
    let curdate = time.replace(/\//g, "-");
    this.setData({
      date: curdate
    })


  },

  toggleTypeSelect() {
    let flag = this.data.fold;
    this.setData({
      fold: !flag
    })
  },
  radioChange: function (e) {
    let name = e.detail.value;
    //console.log(name);
    let pay = ['i','dutch','you','none'];
    if(pay.indexOf(name) === -1){
      this.setData({
        typename: name,
        fold: false
      })
    }
    else{
      this.setData({
        payname: name,
        payfold: false
      })
    }
  },
  togglePaySelect() {
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
  //sendMsg
  sendMsg: function(){
    if (this.data.typename !== '请选择' && this.data.payname !== '请选择' && this.data.date!==''&& this.data.enddate!==''&& this.data.brief !== '' ){
      let sendData = {
        acttype: this.data.typename,
        pay : this.data.payname,
        start:this.data.date,
        end:this.data.enddate,
        brief : this.data.brief
      };
      this.setData({
        created: true
      })
      console.log('ok')
      //haven't use
      // wx.request({
      //   url: '/sendCreateMsg',//发送请求
      //   method:post,
      //   data:sendData,
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {//返回的数据
      //     console.log('success1');

      //   }

      // });
    }
    else{
      wx.showToast({
        title: '失败',
        duration: 2000
      })
    }
  }

})