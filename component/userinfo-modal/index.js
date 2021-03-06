Component({
  externalClasses: ['i-class', 'i-class-mask'],

  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    showOk: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    okText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    // 按钮组，有此值时，不显示 ok 和 cancel 按钮
    actions: {
      type: Array,
      value: []
    },
    // horizontal || vertical
    actionMode: {
      type: String,
      value: 'horizontal'
    }
  },

  methods: {
    handleClickItem({
      currentTarget = {}
    }) {
      const dataset = currentTarget.dataset || {};
      const {
        index
      } = dataset;
      this.triggerEvent('click', {
        index
      });
    },
    handleClickOk({
      detail
    }) {
      this.triggerEvent('ok', detail);
    },
    handleClickCancel({
      detail
    }) {
      this.triggerEvent('cancel', detail);
    }
  }
});