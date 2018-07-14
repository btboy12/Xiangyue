// component/tag-cloud/index.js
const tag_cloud_all_tags = {
  character: ["积极", "热情", "率真", "幽默", "独立", "稳重", "温和", "包容", "细心"],
  hobby: ["游戏", "音乐", "影视", "二次元", "摄影", "科技", "艺术", "运动"]
};
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    excludeTags: {
      type: "Array",
      value: []
    },
    show: {
      type: "Bool",
      value: false,
      observer(v) {
        let dataToSet = {
          show: v
        };
        if (v) {
          dataToSet.tagList = {
            character: tag_cloud_all_tags.character.filter((v) => {
              return this.data.excludeTags.indexOf(v) < 0
            }),
            hobby: tag_cloud_all_tags.hobby.filter((v) => {
              return this.data.excludeTags.indexOf(v) < 0
            }),
          }
        }
        this.setData(dataToSet);
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
  data: {
    tagList: {
      character: [],
      hobby: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMask(event) {
      this.setData({
        show: false
      });
    },
    transparent(event) {
      console.info("transparent");
    },
    selectTag(tag) {
      console.info(tag)
      this.triggerEvent('select', tag.detail);
    },
    deleteTag() {
      this.triggerEvent('select', null);
    }
  }
})