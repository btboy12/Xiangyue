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
    created:true,
    //当前时间
    moment:'2018/02/23 23:11:11',
    //时间组件相关
    daystart: 0,
    hourstart: 0,
    minutestart: 0,
    monthstart: 0,
    year: 2018,
    pickerdata: {
        multiIndex: [0, 0, 0, 0, 0],
        multiArray:
        [[2018, 2019], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], [0, 10, 20, 30, 40, 50]]//年，月，日，时，分
      },
    //完整的时间
    completeData: [[2018], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], [0, 10, 20, 30, 40, 50]]

  },

  onLoad: function (options) {
    //获取当前时间
    let moment = utils.formatTime(new Date());
    let time = utils.formatTime(new Date()).split(' ')[0];
    let curdate = time.replace(/\//g, "-");
    this.setData({
      date: curdate,
      moment : moment
    });
    this._parseNow();


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
  // bindDateChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  //sendMsg,发送创建请求
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
  },
//   //bindchange绑定方法bindMultiPickerChange为多列选择后，点击“确定”后触发
//   bindMultiPickerChange:function(){

//   },
//  // bindcolumnchange绑定方法bindMultiPickerColumnChange为每一列发生变化时触发，可用于识别发生变化的列；
//   bindMultiPickerColumnChange:function(){

//   },
  //获取当前的年，和可以选择的月,天数在30天内
  _parseNow: function () {
    let nows = this.data.moment.split(' ');//格式：" 2017/02/12 23:10:22 ";
    let date = nows[0].split('/');
    let time = nows[1].split(':');
    let changeMuldata = {
      multiArray: this.data.pickerdata.multiArray,
      multiIndex: this.data.pickerdata.multiIndex
    };//
    changeMuldata.multiArray[0] = [date[0]];
    date[1] = parseInt(date[1]);
    if (30 - date[2] > 1) {
      changeMuldata.multiArray[1] = this.data.completeData[1].slice(date[1] - 1, date[1] + 1);
    }
    else {
      changeMuldata.multiArray[1] = this.data.completeData[1].slice(date[1] - 1, date[1]);
    }
    console.log(changeMuldata);
    this.setData({
      pickerdata: changeMuldata,
      hourstart: parseInt(time[0]),
      minutestart: parseInt(time[1]),
      daystart: parseInt(date[2]),
      year: parseInt(date[0]),
      month: parseInt(date[1])
    })
  },

})