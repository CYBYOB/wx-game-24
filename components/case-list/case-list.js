// components/case-list/case-list.js
Component({
  // 一般是由“父组件传入的属性” —— 类似 props 。
  properties: {
    caseList: {
      type: Array,
      value: []
    }
  },
  
  // 私有数据，可用于模板渲染
  data: {},

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  lifetimes: {
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  // 此处attached的声明会被lifetimes字段中的声明覆盖
  attached: function () { },
  ready: function() { },

  // 组件所在页面的生命周期函数
  pageLifetimes: {
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function(){
      // do sth
    },
    
    // 内部方法建议以下划线开头
    _myPrivateMethod: function(){
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },

    // 属性发生变化时
    _propertyChange: function(newVal, oldVal) {

    }
  }

})
