// pages/index/eliteCup/eliteCupSelected/eliteCupSelected.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeTotal: 1,
    correct: 0,
    error: 0,
    content: "",
    item: {},
    index: 0,
    examIndex:-1,
    //题目的集合
    allExamQuestion: [],
    //答案选项
    allRadio: ["A", "B", "C", "D"],
    id: -1,
    IsSubmit: false,
    wxid: '',
    sss:'',
    mmm:'',
    hhh:'',
    interval: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.acquireClassExam();
    console.log(this.data.index)
  },
  //考试时间倒计时
  count_down: function (countDown_time) {
    var that = this;
    var time = countDown_time.split(':')
    var hhh = parseInt(time[0])
    var mmm = parseInt(time[1])
    var sss = parseInt(time[2])
    this.setData({
      sss: (sss < 10) ? '0' + sss : sss,
      mmm: (mmm < 10) ? '0' + mmm : mmm,
      hhh: (hhh < 10) ? '0' + hhh : hhh
    })
    var Interval = setInterval(function () {
      if (sss > 0) {
        sss--
      } else {
        wx.showToast({
          title: "考试时间已到请交卷",
          icon: 'none'
        })
        clearInterval(Interval)
        wx.navigateBack({
          delta: 2
        })
      }
      if (sss == 0) {
        if (mmm > 0) {
          mmm--
          sss = 59;
        }
        if (mmm == 0 && hhh > 0) {
          hhh--
          sss = 59;
          mmm = 59;
        }
      }
      that.setData({
        sss: (sss < 10) ? '0' + sss : sss,
        mmm: (mmm < 10) ? '0' + mmm : mmm,
        hhh: (hhh < 10) ? '0' + hhh : hhh
      })
    }, 1000)
    that.setData({
      interval: Interval
    })
  },
  //获取精英杯所有题目
  acquireClassExam() {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.acquireClassExam({ wxId: wxid })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let item = res.Data;
          let remainingTime = app.utils.secondToDate(item.RemainingTime);
          this.count_down(remainingTime)
          this.setData({
            item: item,
            allExamQuestion: item.AllExamQuestion
          });
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  saveClassExam(e) {
    let item = {};
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      id: id
    })
    if (this.data.index == this.data.allExamQuestion.length -1) {
      this.setData({ IsSubmit: true });
      this.setData({ examIndex: this.data.allExamQuestion.length - 1});
      wx.showModal({
        content:"本次精英杯考试已结束",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 2
            })
          }
        }
      });
    } else {
      this.data.index += 1;
      this.data.examIndex +=1;
      let timer = setTimeout(() => {
        this.setData({ id: -1, index: this.data.index, examIndex: this.data.examIndex });
      }, 500)
    }
    item.WXId = this.data.wxid;
    item.AllExamAnswers = {};
    item.AllExamAnswers[this.data.examIndex] = [this.data.id + 1];
    item.IsSubmit = this.data.IsSubmit;
    this.examSubmit(item);
  },
  examSubmit(item) {
    app.agriknow.saveClassExam(item)
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          // let timer = setTimeout(() => {
          //   this.setData({ id: -1 });
          // }, 500)
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
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  //退出按钮
  goback(e) {
    this.setData({ content: "点击确定视为放弃比赛，成绩将不计入排名。" })
    this.dialog.showDialog();
  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  _confirmEvent() {
    switch (this.data.content) {
      case '点击确定视为放弃比赛，成绩将不计入排名。':
        this.dialog.hideDialog();
        break;
      case '是否确定交卷':
        wx.navigateTo({
          url: '/pages/index/eliteCup/eliteCupSelected/eliteCupResult/eliteCupResult'
        })
        this.dialog.hideDialog();
        break;
    }
  },
  //交卷按钮
  isHand(e) {
    this.setData({ content: "是否确定交卷" })
    this.dialog.showDialog();
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
    clearInterval(this.data.interval);
    this.gotoHomePage();
  },
  gotoHomePage: function () {//自定义页面跳转方法
    // wx.reLaunch({
    //   url: "/pages/index/index?fq=放弃",
    // })
    let item = {};
    item.WXId = this.data.wxid;
    item.AllExamAnswers = {};
    item.IsSubmit = true;
    this.examSubmit(item);
    wx.navigateBack({
      delta: 2
    })
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