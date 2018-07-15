Component({
  properties: {
    activityinfo: {
      type:Object,
      value:{
        location: '同城',//同城或同校。同城-1;同校-0	
        start_time: '2018/7/10 20:00',
        content: '一起桌游吧',
        pay_way: '',// 0—我；1—对方；2—AA
        remark: '一起玩吧啊啊啊啊啊啊啊啊啊啊啊',//简介不超15字
        id: '',//活动id
        announcer_id:'',//发起者id
        portrait: ''//头像地址
      },
      observer: function (newVal) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this.setData({
          activityinfo:newVal
        });
      }
    },
    checked:{
      type:Boolean,
      value:false
    }
    // avatarsrc:{
    //   type:String,
    //   value: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    // }
  },
  methods:{
    joinThisActivity: function(){
      this.setData({
        checked: true
      })
      this.triggerEvent('click');
    },
    displayDetail: function(){
      this.triggerEvent('headclick', { announcer_id: this.data.announcer_id});
    }

  }
      

})