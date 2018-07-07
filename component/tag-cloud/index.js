// component/tag-cloud/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagList: {
      type: "Array"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask() {
      this.setData({
        show: false
      });
    }
  }
})