// component/user-info/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: "Bool",
      value: false,
      observer(v) {
        let _ = this;
        if (v) {
          wx.request({
            url: `${app.prefix}/userinfo`,
            success({data}){

            }
          })
        }
        this.setData({
          isShow: v
        });
      }
    },
    applicant: {
      type: "number",
    },
    info: {
      type: "Object"
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