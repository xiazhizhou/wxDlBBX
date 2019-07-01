// pages/question/generalItem/wdtpage/wdtdetails/wdtdetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType: "",
    specialty: "",
    type: "",
    list: [],
    title: '',
    index:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.mode
    })
    this.setData({
      title: options.mode,
      questionType: options.questionType,
      specialty: options.specialty,
      type: options.type,
      index: Number(options.index)
    })
    if (options.type == 2) {
      let randomlist = app.utils.storageRead("randomlist");
      if (randomlist) {
        this.setData({ list: randomlist });
      }
    } else {
      this.acquireTraingExam(options.specialty, options.questionType);
    }
  },
  //获取练习模式所有题目
  acquireTraingExam(specialty, questionType) {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.acquireTraingExam({ ProfessionType: specialty, QuestionType: questionType, PageSize: 1000, PageIndex: 1 })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let items = res.Data.ExamQuestions;
          this.setData({ list: items });
          console.log(this.data.list)
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 上一题
   */
  previous(e) {
    if (this.data.index == 0) {
      wx.showToast({
        title: '没有上一题了',
        icon: 'none'
      })
      this.setData({ index: 0 });
    } else {
      this.data.index -= 1;
      this.setData({ index: this.data.index });
    }
  },
  /**
   * 下一题
   */
  next(e) {
    if (this.data.index == this.data.list.length - 1) {
      wx.showToast({
        title: '没有下一题了',
        icon: 'none'
      })
      this.setData({ index: this.data.list.length - 1 });
    } else {
      this.data.index += 1;
      this.setData({ index: this.data.index });
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