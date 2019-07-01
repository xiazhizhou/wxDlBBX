// pages/question/generalItem/answerResult/questionsAnalysis/questionsAnalysis.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    index: 0,
    questionType: '',
    specialty: '',
    //答案选项
    allRadio: ["A", "B", "C", "D"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      questionType: options.questionType,
      specialty: options.specialty
    })
    if (options.index != undefined) {
      this.setData({
        index: Number(options.index)
      })
    }
    let randomSelec = app.utils.storageRead("randomSelec");
    if (randomSelec) {
      this.setData({ item: randomSelec });
    }
    //this.acquireTraingExam(options.specialty, options.questionType)
  },
  //获取随机模式所有题目
  acquireTraingExam(professionName, questionType) {
    app.agriknow.acquireRandomExam({ ProfessionType: professionName, QuestionType: questionType })
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          let item = res.Data;
          item.forEach(item => {
            item.answerState = 0;
          })
          this.setData({
            item: item
          });
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
   * 上一题
   */
  previous(e) {
    if (this.data.index == 0) {
      wx.showToast({
        title: '没有上一题了',
        icon: 'none'
      })
      this.setData({ index: 0, examIndex: -1 });
    } else {
      this.data.index -= 1;
      this.setData({ index: this.data.index });
    }
  },
  /**
   * 下一题
   */
  next(e) {
    if (this.data.index == this.data.item.length - 1) {
      wx.showToast({
        title: '没有下一题了',
        icon: 'none'
      })
      this.setData({ index: this.data.item.length - 1 });
    } else {
      this.data.index += 1;
      this.setData({ index: this.data.index });
    }
    console.log(this.data.index)
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