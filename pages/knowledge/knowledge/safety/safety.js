// pages/knowledge/knowledge/safety/safety.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
    let list = [
      { Type: "交流", code: "0.23", value: "深灰", colorId: "B01", color:"#43524f" },
      { Type: "交流", code: "0.4", value: "赭黄", colorId: "YR02", color: "#462c11" },
      { Type: "交流", code: "3", value: "深绿", colorId: "G05", color: "#022716" },
      { Type: "交流", code: "6", value: "深钛蓝", colorId: "PB02", color: "#010535"},
      { Type: "交流", code: "10", value: "铁红", colorId: "R01", color: "#6b1400" },
      { Type: "交流", code: "13.8~20", value: "淡绿", colorId: "G02", color: "#237044" },
      { Type: "交流", code: "35", value: "柠黄", colorId: "Y05", color: "#f1e05e" },
      { Type: "交流", code: "60", value: "橘黄", colorId: "YR04", color: "#e76612" },
      { Type: "交流", code: "110", value: "朱红", colorId: "R02", color: "#c32a01" },
      { Type: "交流", code: "154", value: "天钛蓝", colorId: "PB09", color: "#78adcf" },
      { Type: "交流", code: "220", value: "紫红", colorId: "R04", color: "#7a1000" },
      { Type: "交流", code: "330", value: "白", colorId: "", color: "#ffffff" },
      { Type: "交流", code: "500", value: "淡黄", colorId: "Y09", color: "#f5e15a"},
      { Type: "交流", code: "100", value: "中蓝", colorId: "PB03", color: "#00123a" },
      { Type: "直流", code: " ", value: "棕", colorId: "YR05", color: "#351200" },
      { Type: "直流", code: "500", value: "深紫", colorId: "P02", color: "#968caf" }
    ]
    this.setData({
      list: list
    });
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