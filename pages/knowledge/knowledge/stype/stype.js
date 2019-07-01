// pages/knowledge/knowledge/stype/stype.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list2:[],
    powerStatus:true,
    elecStatus:false,
    pressureStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
    let list = [
      { code: "10及以下", value: "0.70"},
      { code: "20.35", value: "1.00" },
      { code: "66.110", value: "1.50" },
      { code: "220", value: "3.00" },
      { code: "330", value: "4.00" },
      { code: "500", value: "5.00" },
      { code: "750", value: "7.20" },
      { code: "1000", value: "8.70" },
      { code: "±50及以下", value: "1.50" },
      { code: "±500", value: "6.00" },
      { code: "±660", value: "8.40" },
      { code: "±800", value: "9.30" }
    ]
    let list2 = [
      { code: "10及以下", value: "0.35" },
      { code: "20.35", value: "0.60" },
      { code: "66.110", value: "1.50" },
      { code: "220", value: "3.00" },
      { code: "330", value: "4.00" },
      { code: "500", value: "500" },
      { code: "750", value: "800" },
      { code: "1000", value: "950" },
      { code: "±50及以下", value: "1.50" },
      { code: "±500", value: "6.80" },
      { code: "±660", value: "9.00" },
      { code: "±800", value: "10.10" }
    ]
    this.setData({
      list: list
    });
    this.setData({
      list2: list2
    });
  },
  // 选项卡切换
  switchTab(event) {
    switch (event.currentTarget.id) {
      case 'power':
        this.setData({ powerStatus: true });
        this.setData({ elecStatus: false });
        this.setData({ pressureStatus: false });
        break;
      case 'electricity':
        this.setData({ elecStatus: true });
        this.setData({ powerStatus: false });
        this.setData({ pressureStatus: false });
        break;
      case 'pressure':
        this.setData({ pressureStatus: true });
        this.setData({ powerStatus: false });
        this.setData({ elecStatus: false });
        break;
    }
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