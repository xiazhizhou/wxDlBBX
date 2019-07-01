// pages/question/generalItem/competition/competition.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: "未登记",
    questionType: '',
    specialty: '',
    mode: '',
    list: [],
    type: ''
  },
  //获取竞赛题库规则说明
  getCompetitionExamRuleDescription() {
    app.agriknow.getCompetitionExamRuleDescription({})
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
    this.setData({
      questionType: options.questionType,
      specialty: options.specialty,
      mode: options.mode
    })
    this.getCompetitionExamRuleDescription();
    this.loginusercount();
  },
  goto(e) {
    let selectedMode = this.data.selectedMode;
    let question = this.data.question;
    let specialty = this.data.specialty;
    switch (this.data.mode) {
      case '选择题':
        wx.navigateTo({
          url: `/pages/question/generalItem/competition/competitionSelected/competitionSelected?mode=竞赛模式&questionType=RadioChoice&specialty=${specialty}`
        })
        break;
      case '判断题':
        wx.navigateTo({
          url: `/pages/question/generalItem/competition/competitionDecide/competitionDecide?mode=竞赛模式&questionType=TrueOrFalse&specialty=${specialty}`
        })
        break;
      case '问答题':
        wx.navigateTo({
          url: `/pages/question/generalItem/wdtpage/wdtpage?mode=竞赛模式&questionType=Essay&specialty=${specialty}&type=2`
        })
        console.log("跳转问答题")
        break;
    }
  },
  loginusercount() {
    var that = this;
    let userInfo = app.utils.storageRead("userInfo");
    app.agriknow.loginUserAccount({
      wxId: userInfo.WXId
    })
      .then(res => {
        if (res.status && res.result) {
          console.log(res.result)
          if (res.result.IsSuccess) {
            console.log(res.result.Data)
            let item = res.result.Data;
            if (item.Organization){
              that.setData({
                loginStatus:"已登记"
              })
            }
          }
        } else {
          wx.showToast({
            title: res.result.error,
            icon: 'none'
          })
        }
      })

  },
  registers(e){
    wx.navigateTo({
      url: `/pages/profile/userinfoRegisters/userinfoRegisters`
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