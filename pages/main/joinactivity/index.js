Page({
  data:{
    activities:[{
      location: '同城',
      time: '2018/7/10 20:00',
      aim: '一起桌游吧',
      pay: 'AA',
      brief: '一起玩吧啊啊啊啊啊啊啊啊啊啊啊'
    }, {
      location: '同校',
      time: '2018/7/10 20:00',
      aim: '一起桌游吧',
      pay: 'AA',
      brief: '一起玩吧啊啊啊啊啊啊啊啊'
    }],
    avatarsrc:'',
    join:false,
    userId :''//用户id
  },
  //获取活动列表
  getActivityList: function (){
    //不提供userid怎么处理
    userid = getUserId() === -1 ? 0 : getUserId();
    wx.request({
      url: '/displayActivity',
      method:'get',
      data:getUserId(),
      success:function(res){
        if(res){
          this.setData({
            activities : res
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
      })
  },
  //获取用户id
  getUserId: function () {
    let id = -1;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        this.setData({
          userId : res.data
        })
      },
      fail:function(){
        false;
      }
    })
  },
  onShow:function(){

  }

})