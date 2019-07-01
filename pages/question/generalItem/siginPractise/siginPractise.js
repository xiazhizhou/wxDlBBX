// pages/question/generalItem/siginPractise/siginPractise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_loadmore: false,
    list: [],
    item: {},
    //题目的集合
    itemExam: null,
    extotal: null,
    //答案选项
    allRadio: ["A", "B", "C", "D"],
    id: -1,
    wxid: '',
    switchs: false,
    hidder: false,
    items: -1,
    showRightAnswer: -1,
    questionType: '',
    specialty: '',
    mode: '',
    pageSize: 1,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let wxinfo = app.utils.storageRead("wxinfo");
    if (wxinfo) {
      this.setData({ wxid: wxinfo.WXId });
    }
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.mode
    })
    this.setData({
      questionType: options.questionType,
      specialty: options.specialty,
      mode: options.mode
    })
    if (options.index != undefined) {
      this.setData({
        pageIndex: Number(options.index)
      })
    } 
    this.acquireTraingExams(options.specialty, options.questionType, this.data.pageSize, this.data.pageIndex);
  },
  //获取练习模式所有题目v2
  acquireTraingExams(professionName, questionType, pageSize, pageIndex) {
    app.agriknow.acquireTraingExam({ ProfessionType: professionName, QuestionType: questionType, PageSize: pageSize, PageIndex: pageIndex })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let it = res.Data.ExamQuestions[0];
          this.setData({
            extotal: res.Data.TotalExamQuestion,
            itemExam: it
          })
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 提交答案
   */
  saveTraingExam(e) {
    //选择的答案
    let items = e.currentTarget.dataset.viewpoint + 1;
    let id = e.currentTarget.dataset.id;
    let showRightAnswer = (this.data.itemExam.ShowRightAnswer[0]);
    this.setData({
      id: id,
      items: items,
      switchs: true,
      showRightAnswer: showRightAnswer
    })
    if (items == showRightAnswer) {
      this.data.examList[this.data.pageIndex - 1].answerState = 1
    } else {
      this.data.examList[this.data.pageIndex - 1].answerState = 2
    }
    this.setData({
      examList: this.data.examList,
      isExamBool: true
    })
  },
  getExam(e){
    wx.reLaunch({
      url: '/pages/authorize/authorize'
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
    if (res.from === 'button') {
    }
    return {
      title: '大神，快帮我看看，这道题选什么',
      path: `/pages/question/generalItem/siginPractise/siginPractise?mode=好友求助&questionType=${this.data.questionType}&specialty=${this.data.specialty}&index=${this.data.pageIndex}`,
      success: (res) => {
        console.log("转发成功", res);
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