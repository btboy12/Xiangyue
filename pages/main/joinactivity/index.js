let app = getApp();
Page({
  data:{
    activities:[{
      location: 1,//同城或同校。同城-1;同校-0	
      start_time: '2018/7/10 20:00',
      content: '一起桌游吧',
      pay_way: 0,// 0—我；1—对方；2—AA
      remark: '一起玩吧啊啊啊啊啊啊啊啊啊啊啊',//简介不超15字
      id:'',//活动id
      portrait: 'https://i.loli.net/2017/08/21/599a521472424.jpg' //头像地址
    }, {
      location: 0,
      start_time: '2018/7/10 20:00',
      content: '一起桌游吧',
      pay_way: 'AA',
      remark: '一起玩吧啊啊啊啊啊啊啊啊',
      id: '',
      portrait: ''
    }],
    //avatarsrc:'',
    join:false,
    //userId :''//用户id
  },
  //获取活动列表
  getActivityList: function (){
    //不提供userid怎么处理
   // userid = getUserId() === -1 ? 0 : getUserId();
    wx.request({
      url: '/displayActivity',
      method:'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: app.token,
      success:function(res){
        if(res.data){
          this.setData({
            activities : JSON.parse(res.data)
          })
        }else{//没有活动列表
          wx.showToast({
            title: '暂时没有活动',
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '返回列表出错',
        })
      }
      });
  },
  //获取用户id
  // getUserId: function () {
  //   let id = -1;
  //   wx.getStorage({
  //     key: 'token',
  //     success: function(res) {
  //       this.setData({
  //         userId : res.data
  //       })
  //     },
  //     fail:function(){
  //       false;
  //     }
  //   })
  // },
  onShow:function(){
    this.getActivityList();
  },
  handleChangeActivityList: function(){
    this.getActivityList();
  },
  handleJoin: function(){
    let that = this;
    wx.showModal({
      title: '你确认向ta发送申请吗？',
     // content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          that.sendJoinRequest();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  handleError:function(){
    wx.showToast({
      title: '申请失败',
    })
  },
  sendJoinRequest:function(){
    let that = this;
    wx.request({
      url: '/joinActivity',
      method: 'get',
      data: app.token,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data > 0) {
          wx.navigateTo({
            url: '../applysuccess/index',
          })
        }
        else {
          that.handleError();
        }

      },
      fail: function () {
        that.handleError();
        //for test need delet
        wx.navigateTo({
          url: '../applysuccess/index',
        })
      }
    })
  }
 
})