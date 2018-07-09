// component/tag-cloud/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagList: {
      type: "Array"
    },
    show: {
      type: "Bool",
      value: false,
      observer(v) {
        this.setData({
          show: v
        });
      }
    },
    delete: {
      type: "Bool",
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask() {
      this.setData({
        show: false
      });
    },
    selectTag(tag) {
      this.triggerEvent('select', tag.detail);
    },
    deleteTag() {
      this.triggerEvent('select', null);
    }
  }
})