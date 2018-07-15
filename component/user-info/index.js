// component/user-info/index.js
const gender_string = ["ta", "他", "她"];
const gender_string2 = ["家伙", "男孩", "女孩"];
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
    },
    genderStringify(gender) {
      return gender_string[gender]
    },
    genderStringify2(gender) {
      return gender_string2[gender]
    }
  }
})