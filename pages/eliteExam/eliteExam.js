// pages/eliteExam/eliteExam.js
const app = getApp();
import IsWW from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['锅炉专业', '汽机专业', '电气专业', '热控专业', '化学专业', '安规专业'],
    index: 0,
    professionType:"锅炉专业",
    date: '时间',
    list:[]
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
    this.setData({
      professionType: this.data.array[this.data.index]
    })
    this.listMatchRanking(this.data.professionType, this.data.date)
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.listMatchRanking(this.data.professionType, this.data.date)
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
    this.listMatchRanking(this.data.professionType, date);
  },
  formatTimes(date) {
    const fullyear = date.getFullYear() //获取完整的年份
    const year = date.getYear(); //获取当前年份(2位)  
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = date.getDay()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return hour + "-" + minute + "-" + second;
  },
  //获取精英杯所有题目
  listMatchRanking(examType, yearMonth) {
    app.agriknow.listMatchRanking({ ExamType: examType, YearMonth: yearMonth })
      .then(res => {
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
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
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