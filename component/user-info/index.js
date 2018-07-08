// component/user-info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: "Bool",
      value: false,
      observer(v) {
        this.setData({
          isShow: v
        });
      }
    },
    info: {
      type: "Object",
      value: {
        name: "家里蹲大学",
        sex: false,
        nature: ["外向", "爱聊天", "感性"],
        hobby: ["音乐", "运动"]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideInfo() {
      this.setData({
        isShow: false
      });
    }
  }
})