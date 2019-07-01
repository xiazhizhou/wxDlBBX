// pages/question/generalItem/gatherItem/gatherList/gatherList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //题目的集合
    item: [],
    list: [],
    index: 0,
    examIndex: -1,
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
    mode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxinfo = app.utils.storageRead("wxinfo");
    if (wxinfo) {
      this.setData({ wxid: wxinfo.WXId });
    }
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.specialty
    })
    this.setData({
      specialty: options.specialty
    })
    console.log(this.data.index)
    this.acquireCollectQuestionPairs(options.specialty)
  },
  switchChange: function (e) {
    this.setData({ switchAnswer: e.detail.value })
  },
  //获取所有错误题目
  acquireCollectQuestionPairs(professionName) {
    let wxid = this.data.wxid;
    app.agriknow.acquireErrorQuestionPairs({ WXId: wxid, ProfessionType: professionName })
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          let list = res.Data;
          list.forEach(it => {
            it.searchStatus = true;
          })
          this.setData({
            item: list
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
      this.data.examIndex -= 1;
      this.setData({ index: this.data.index, examIndex: this.data.examIndex });
    }
    this.setData({
      id: -1
    })
    console.log(this.data.examIndex)
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
      this.setData({ index: this.data.item.length - 1, examIndex: this.data.item.length - 1 });
    } else {
      this.data.index += 1;
      this.data.examIndex += 1;
      this.setData({ index: this.data.index, examIndex: this.data.examIndex });
    }
    this.setData({
      id: -1
    })
    console.log(this.data.index)
  },
  /**
   * 提交答案
   */
  saveTraingExam(e) {
    //选择的答案
    let items = e.currentTarget.dataset.viewpoint+1;
    let id = e.currentTarget.dataset.id;
    let showRightAnswer = (this.data.item[this.data.index].ShowRightAnswer[0]);
    this.setData({
      id: id,
      items: items,
      switchs: true,
      showRightAnswer: showRightAnswer
    })
    if (items == showRightAnswer) {
      this.data.item[this.data.index].answerState = 1
    } else {
      this.data.item[this.data.index].answerState = 2
    }
    if (this.data.index == this.data.item.length - 1) {
      wx.showToast({
        title: '没有下一题了',
        icon: 'none'
      })
      let timer = setTimeout(() => {
        this.setData({ id: -1, index: this.data.item.length - 1, examIndex: this.data.item.length - 1 });
      }, 500)
    } else {
      this.data.index += 1;
      this.data.examIndex += 1;
      let timer = setTimeout(() => {
        this.setData({ id: -1, index: this.data.index, examIndex: this.data.examIndex });
      }, 500)
    }
    this.setData({
      item: this.data.item
    });
  },
  getExam(e) {
    this.setData({
      hidder: true
    })
  },
  getExamHidd(e) {
    this.setData({
      hidder: false
    })
  },
  clickExem(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      index: id,
      hidder: false
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