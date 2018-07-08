Component({
  properties: {
    activityinfo: {
      type:Object,
      value:{
        location:'',
        time:'',
        aim:'',
        pay:'',
        brief:''
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
    },
    avatarsrc:{
      type:String,
      value: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    }
  },
  methods:{
    joinThisActivity: function(){
      this.setData({
        checked: true
      })
      this.triggerEvent('click');
    }

  }
      

})