// pages/question/generalItem/wdtpage/wdtpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionType:"",
    specialty:"",
    type:"",
    list:[],
    title:''
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
      type: options.type
    })
    if (options.type == 2){
      this.acquireRandomExam(options.specialty, options.questionType);
    }else{
      this.acquireTraingExam(options.specialty, options.questionType);
    }
  },
  //获取随机所有题目
  acquireRandomExam(specialty, questionType) {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.acquireRandomExam({ ProfessionType: specialty, QuestionType: questionType })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let items = res.Data;
          this.setData({ list: items });
          app.utils.storageRemove("randomlist");
          app.utils.storageWrite("randomlist", items);
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  //获取练习模式所有题目
  acquireTraingExam(specialty, questionType) {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.acquireTraingExam({ ProfessionType: specialty, QuestionType: questionType, PageSize: 1000, PageIndex:1 })
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
  goUrl(e){
    let bindex = e.currentTarget.dataset.index;
    //let viewpoint = this.data.list;
    //viewpoint = JSON.stringify(viewpoint);
    wx.navigateTo({
      url: `/pages/question/generalItem/wdtpage/wdtdetails/wdtdetails?mode=${this.data.title}&questionType=Essay&specialty=${this.data.specialty}&type=${this.data.type}&index=${bindex}`
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