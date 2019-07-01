// pages/question/generalItem/answerResult/answerResult.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    items:[],
    questionType: '',
    specialty: '',
    score:0,
    init:0,
    dfl:0,
    overCountUsers:'',
    overPercentage:'',
    typeExam:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let randomSelec = app.utils.storageRead("randomSelec");
    if (randomSelec) {
      this.setData({ list: randomSelec });
    }
    if (options.typeExam==undefined){
      this.setData({ typeExam: true });
    }else{
      this.setData({ typeExam: false });
    }
    this.setData({
      questionType: options.questionType,
      specialty: options.specialty,
      overCountUsers: options.OverCountUsers,
      overPercentage: options.OverPercentage
    })
    randomSelec.forEach(item => {
      if (item.answerState == 1){
        this.data.init +=1;
      }
    })
    this.setData({
      init: this.data.init
    })
    this.setData({
      score: Number(this.data.init * 4),
    })
    this.setData({
      dfl: Number((this.data.score / 100) * 100)
    })
  },
  goto(e){
    let questionType = this.data.questionType;
    let specialty = this.data.specialty;
    wx.navigateTo({
      url: `/pages/question/generalItem/answerResult/questionsAnalysis/questionsAnalysis?questionType=${questionType}&specialty=${specialty}`
    })
  },
  goback(e){
    let questionType = this.data.questionType;
    let specialty = this.data.specialty;
    switch (questionType){
      case 'RadioChoice':
        wx.navigateBack({
          delta: 2
        })
        break;
      case 'TrueOrFalse':
        wx.navigateBack({
          delta: 2
        })
        break;
    }
  },
  gobacks(e) {
    wx.reLaunch({
      url: '/pages/authorize/authorize'
    })
  },
  saveGoto(e){
    let questionType = this.data.questionType;
    let specialty = this.data.specialty;
    let index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/question/generalItem/answerResult/questionsAnalysis/questionsAnalysis?mode=随机模式&&questionType=${questionType}&specialty=${specialty}&index=${index}`
    })
  },
  /**
   * 晒一晒
   */
  onShareAppMessage: function (res) {
    let that = this;
    let typeExam = false;
    that.sharing();
    app.utils.storageRemove("randomSelec");
    app.utils.storageWrite("randomSelec", this.data.list);
    return {
      title: '电力百宝箱',
      path: `pages/question/generalItem/answerResult/answerResult?questionType=${that.data.questionType}&specialty=${that.data.specialty}&overCountUsers=${that.data.overCountUsers}&overPercentage=${that.data.overPercentage}&typeExam=${typeExam}`,
      success: (res) => {
        console.log("转发成功", res);
        that.sharing();
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

  }
})