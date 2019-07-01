// pages/index/more/discharge/advice/advice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second_height: 0,
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //创建节点选择器
    let query = wx.createSelectorQuery();
    //选择元素名
    // query.select('.page-gs').boundingClientRect(function (rect) {
    //   console.log(rect.width)
    //   that.setData({
    //     height: rect.height
    //   })
    // }).exec();
    // // 获取系统信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     // 可使用窗口宽度、高度
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // 计算主体部分高度,单位为px
    //     that.setData({
    //       second_height: res.windowHeight - that.data.height
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    that.sharing();
    return {
      title: '电力百宝箱',
      path: '/pages/index/index',
      success: (res) => {
        console.log("转发成功", res);
        //that.sharing();
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  /**
   * 用户分享
   */
  sharing() {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
    }
    app.agriknow.sharing({ wxId: wxid })
      .then(res => {
        if (res.status && res.result) {
          let msg = res.result.Message;
          this.setData({ contentStr: msg, title: '用户分享' });
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  }
})