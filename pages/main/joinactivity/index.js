let app = getApp();
Page({
  data: {
    activities: [{
      location: '',//1', //同城或同校。同城-1;同校-0	
      start_time: '',//2018/7/10 20:00',
      content: '',//一起桌游吧',
      pay_way: '',//0, // 0—我；1—对方；2—AA
      remark: '',//一起玩吧啊啊啊啊啊啊啊啊啊啊啊', //简介不超15字
      id: '', //活动id
      announcer_id: '', //发起者id
      portrait: '',//https://i.loli.net/2017/08/21/599a521472424.jpg' //头像地址
    }
    //, {
    //   location: 0,
    //   start_time: '2018/7/10 20:00',
    //   content: '一起桌游吧',
    //   pay_way: 'AA',
    //   remark: '一起玩吧啊啊啊啊啊啊啊啊',
    //   id: '',
    //   announcer_id: '',
    //   portrait: ''
    // }
    ],
    //avatarsrc:'',
    join: false,
    //userId :''//用户id
    showDetail: false,
    detail_info: '', //obj
    pagenum : 0
  },
  //获取活动列表
  getActivityList: function() {
    //不提供userid怎么处理
    // userid = getUserId() === -1 ? 0 : getUserId();
    let that = this;
    wx.request({
      url: `${app.prefix}/activity/interested`,
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        'token': app.token+'',
         'page_no': that.data.pagenum
      },
      success: (res) => {
        if (res.data.result_list) {
          this.setData({
            activities: res.data.result_list
          })
        } else { //没有活动列表
          wx.showToast({
            title: '暂时没有活动',
            icon:'none'
          })
        }
        that.setData({
          pagenum : that.data.pagenum +1
        })
      },
      fail: function() {
        wx.showToast({
          title: '返回列表出错',
          icon:'none'
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
  onShow: function() {
    this.getActivityList();
  },
  handleChangeActivityList: function() {
    this.getActivityList();
  },
  handleJoin: function() {
    let that = this;
    wx.showModal({
      title: '你确认向ta发送申请吗？',
      // content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          that.sendJoinRequest();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  handleError: function() {
    wx.showToast({
      title: '申请失败',
      icon:'none'
    })
  },
  //发送申请
  sendJoinRequest: function(e) {
    let that = this;
    let id = e.detail.activity_id;
    wx.request({
      url: `${app.prefix}/activity/join`,
      method: 'get',
      data: {
        'token': app.token+'',
        'id': id+''
        },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if (res.data > 0) {
          wx.navigateTo({
            url: '../applysuccess/index',
          })
        } else {
          that.handleError();
        }

      },
      fail: function() {
        that.handleError();
        //for test need delet
        wx.navigateTo({
          url: '../applysuccess/index',
        })
      }
    })
  },
  //返回detail
  getDetail: function(e) {
    let reqid = e.detail.announcer_id;
    let that = this;
    wx.request({
      url: `${app.prefix}/activity/current`,
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{'token' : reqid},
      success: function(res) { //返回的数据
        let detail_obj = res.data //微信会自动解析吗？？
        if (detail_obj) {
          console.log('success_detail');
          that.setData({
            showDetail: true,
            detail_info: detail_obj //obj
          });
        }
      }

    })

  }



})