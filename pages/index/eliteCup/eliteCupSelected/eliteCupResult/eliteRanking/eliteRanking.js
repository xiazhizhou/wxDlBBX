// pages/index/eliteCup/eliteCupSelected/eliteCupResult/eliteRanking/eliteRanking.js
const app = getApp();
import IsWW from '../../../../../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    professionType: "锅炉专业",
    date: '时间',
    dates: '时间',
    list: [],
    is_loadmore: false
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.listMatchRanking(this.data.date)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let myDate = new Date();
    let date = app.utils.formatTime(myDate, "YYYY-MM");
    this.setData({
      date: date
    })
    this.listMatchRanking(date);
  },
  //获取精英杯所有题目
  listMatchRanking(yearMonth) {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.listMatchRanking({ ExamType: "Classes", YearMonth: yearMonth })
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          let item = res.Data;
          item.forEach(it => {
            it.ImageUrl = IsWW.requestImgUrl + it.ImageUrl.replace(/\\/g, "/");
          })
          this.setData({
            list: item
          })
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        this.setData({ is_loadmore: true });
      })
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