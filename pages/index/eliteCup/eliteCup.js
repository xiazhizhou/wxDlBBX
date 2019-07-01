// pages/index/eliteCup/eliteCup.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  //获取竞赛题库规则说明
  getClassesExamRuleDescription() {
    app.agriknow.getClassesExamRuleDescription({})
      .then(res => {
        if (res.status && res.result) {
          if (res.result.IsSuccess && res.result.Data) {
            this.setData({
              list: res.result.Data
            })
          }
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassesExamRuleDescription();
  },
  goto(e){
    switch (e.currentTarget.id) {
      case 'dt':
        wx.navigateTo({
          url: '/pages/index/eliteCup/eliteCupSelected/eliteCupSelected'
        })
        break;
      case 'ly':
        wx.navigateTo({
          url: '/pages/question/guestbook/guestbook'
        })
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