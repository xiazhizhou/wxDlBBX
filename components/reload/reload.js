// components/component-tag-name.js
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    message: {            // 属性名
      type: String,
      value: '请求失败'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    buttonText: {
      type: String,
      value: '重 试'
    },
    isShow:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    //隐藏弹框
    init(event){
      // 微信小程序中是通过triggerEvent来给父组件传递信息的
      this.triggerEvent("reload");
    }
  }
})