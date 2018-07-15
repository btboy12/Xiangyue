let utils = require('../../../utils/util.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '约饭', value: '约饭' },
      { name: '学习', value: '学习' },
      { name: '玩桌游', value: '玩桌游' },
      { name: '看电影', value: '看电影' },
    ],
    payitems: [
      { name: '霸气的我掏', value: '霸气的我掏' },
      { name: 'AA', value: 'AA' },
      { name: '对方掏', value: '对方掏' },
      { name: '无', value: '无' }
    ],
    fold:false,
    typename:'请选择',
    payname: '请选择',//	付款方式0—我；1—对方；2—AA	
    payfold:false,
    // date:'2018-10-2',
    // enddate:'2018-10-3',
    start_time:'' ,
    end_time: '',
    remark:'',
    created:true,
    //活动创建相关
    // content: ,//	活动类型	
   
    // start_time:	,//string	开始时间	
    // end_time: ,//	string	结束时间	
    // announcer_id: ,//	string	发起者id	

      //当前时间
    moment:'2018/02/23 23:11:11',
    datestart:[2018,0,0,0,0],
    //起始时间
    pickerdata: {
        multiIndex: [0, 0, 0, 0, 0],
        multiArray:
        [[2018, 2019], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], [0, 10, 20, 30, 40, 50]]//年，月，日，时，分
      },
      //结束时间
    pickerEnddata: {
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
    let moment = utils.formatTime(new Date());// 2019/01/03 02:11
    let origintime = moment.split(' ');
    let time = moment.split(' ')[0].split('/').map(x=>Number(x)).join('-');
    console.log('日期：'+ time);
    let time2 = origintime[1].split(':').map(x => Number(x));//处理分钟
    time2[1] = Math.ceil(time2[1]/10)*10;
    if(time2[1] == 60){
      time2[0] += time2[0];
      time2[1] = 0;
    }
    let curdate = time.replace(/\//g, "-");
   // let setime = moment.substr(0, 16).replace(/\//g, "-");//取到分

    this.setData({
     // date: curdate,
      moment : moment,
      start_time: time +' '+ time2.slice(0,2),
      end_time: time + ' ' + time2.slice(0,2),
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
    let pay = ['霸气的我掏','对方掏','AA','无'];
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
  //sendMsg,发送创建请求
  sendMsg: function(){
    if (this.checkSendData()){
      let paykind = ['霸气的我掏', '对方掏', 'AA','无'];
      let paysend = paykind.indexOf(this.data.payname);
      let stimesend = this.parseDate(this.data.start_time);
      let etimesend = this.parseDate(this.data.end_time);
      let sendData = {
        "pay_way": this.data.payname,
        "start_time": stimesend + ':00',
        "end_time": etimesend + ':00',
       // 'announcer_id': app.token+'',
        "content": this.data.typename,
        'remark ': this.data.remark,
        // "pay_way": '对方掏',
        // "start_time": '12312',
        // "end_time": '534534',
         'announcer_id': '6',
        // "content": 'fdsfs',
        // 'remark': 'ouewi',
      };
      console.log(sendData);
     
     // haven't use
      let _this = this;
      wx.request({
        url: `${app.prefix}/activity/create`,//发送请求
        method:'post',
        data: sendData,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {//返回的数据
          let Stat = res.data//微信会自动解析？？
          console.dir(Stat);
          if (Stat.createStat && Stat.createStat == 1){
            console.log('Stat');
            _this.setData({
              created: false
            });
          }
          else{
            let err = Stat.errorInfo
            wx.showToast({
              title: err,
              icon: 'none',
              duration: 200
            })

          }
        }

      });
    }
    // else{
    //   wx.showToast({
    //     title: '失败',
    //     duration: 2000
    //   })
    // }
    // this.setData({
    //   created: false
    // });
  },
  //获取当前的年，和可以选择的月,天数在30天内,初始化起始的天数小时分完成初始化
  _parseNow: function () {
    let nows = this.data.moment.split(' ');//格式：" 2017/02/12 23:10:22 ";
    let date = nows[0].split('/');
    let time = nows[1].split(':');
    let changeMuldata = {
      multiArray: this.data.pickerdata.multiArray,
      multiIndex: this.data.pickerdata.multiIndex
    };//
    //获取结尾天数
    let _getDayEnd = function(month){
        let largeM = [1, 3, 5, 7, 8, 10, 12];//31天
        if (month == 2) {
          if (this.data.year % 4 == 0) {
            return 29;//闰年
          }
          return 28;
        }
        else if (largeM.indexOf(month) != -1) {
          return 31;
        }
        else {
          return 30;
        }
    }
    changeMuldata.multiArray[0] = [date[0]];
    date[1] = parseInt(date[1]);
    if (30 - date[2] > 1) {
      changeMuldata.multiArray[1] = this.data.completeData[1].slice(date[1] - 1, date[1] + 1);
    }
    else {
      changeMuldata.multiArray[1] = this.data.completeData[1].slice(date[1] - 1, date[1]);
    }
    let Dayend = _getDayEnd(date[1]);
    //console.log('dayend' + Dayend);初始化日
    changeMuldata.multiArray[2] = this.data.completeData[2].slice(date[2] - 1,Dayend );
    //初始化时间
    changeMuldata.multiArray[3] = this.data.completeData[3].slice(time[0]);
    let minutebegin = Math.ceil(time[1]/10);
    if (minutebegin == 6){
      changeMuldata.multiArray[3] = this.data.completeData[3].slice(time[0]+1);
      changeMuldata.multiArray[4] = this.data.completeData[4];
    }
    else{
      changeMuldata.multiArray[4] = this.data.completeData[4].slice(minutebegin);
    }
    console.log('multiArray' + changeMuldata.multiArray[2]);
    let datearr = [parseInt(date[0]), parseInt(date[1]), parseInt(date[2]),parseInt(time[0]) ,parseInt(time[1])];
    this.setData({
      pickerdata: changeMuldata,
      datestart : datearr,
      pickerEnddata: changeMuldata
    })
    console.log('传入的datestart:' + this.data.datestart);
    
  },
  //验证输入
  checkSendData: function (){
    if (this.data.typename !== '请选择' && this.data.payname !== '请选择' && this.data.start_time !== '' && this.data.end_time !== '' && this.data.start_time !== '' && this.data.end_time !== '' ){
      if(this.checkDate()){
          return true;
      }
      else{
        wx.showToast({
          title: '活动时间输入不对',
          icon:'none'
        })
      }
    } 
    else{
      wx.showToast({
        title: '输入不可为空',
        icon: 'none'
      })
      return false;
    }
  },
  //获取确认的时间
  getStartDate:function(e){
   // console.log('返回的东西' + e.detail.target + ' ' + e.detail.newDate);
    this.setData({
      start_time: e.detail.newDate
    })
  },
  getEndDate: function (e) {
    //console.log('返回的东西' + e.detail.target + ' ' + e.detail.newDate)
    this.setData({
      end_time:e.detail.newDate
    })
  },
  //验证日期时间
  checkDate : function(){
    let stime = this.data.start_time.split(' ') ,
        etime = this.data.end_time.split(' ') ;
    // console.log('s:' + stime[0].split('-').join('') + ' he ' + etime[0].split('-').join(''));
    // console.log('stime:' + stime[1].split(':').join('') + ' he ' + etime[1].split(':').join(''));
    if (stime[0].split('-').join(' ') - etime[0].split('-').join(' ') > 0){
    
      return false;
    }
    else if (stime[0].split('-').join('') - etime[0].split('-').join('') == 0){
      let testtime = stime[1].split(':'),
          testtime_end = etime[1].split(':');
      if (testtime[0] > testtime_end[0] || (testtime[1] > testtime_end[1] && testtime[0] >= testtime_end[0])){
          return false;
      }
    }
    return true;
  },
  //统一时间格式,把2018-10-1 2:20变成2018-10-01 02:20
  parseDate: function(bdate){
    let all = bdate.split(' ');
    //console.log('btime'+bdate);
    let firstdate = all[0].split('-').map((x)=>{
      if(Number(x) < 10){
        x = '0' + x;
      }
      return x;
    });
    let lastdate = all[1].split(':').map((x) => {
      if (Number(x) < 10) {
        x = '0' + x;
      }
      return x;
    });
    //console.log('ftime' + firstdate);
    return firstdate.join('-') + ' ' + lastdate.join(':');
  },
  setRemark:function(e){
    this.setData({
      remark:e.detail.value
    })
  }


})