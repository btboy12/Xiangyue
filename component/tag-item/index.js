// component/tag-item/index.js
const color_set = ["#FEDFE1", "#B5CAA0", "#A5DEE4", "#DAC9A6"];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: "String"
    },
    color: {
      type: "String"
    }
  },

  ready() {
    if (!this.properties.color) {
      this.setData({
        color: color_set[parseInt(Math.random() * color_set.length)]
      });
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
    onTap() {
      this.triggerEvent('click', this.data.title);
    }
  }
})