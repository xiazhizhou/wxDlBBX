// pages/question/generalItem/randomSign/randomSign.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //题目的集合
    item: [],
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
    let randomSignSelect = app.utils.storageRead("randomSignSelect");
    let randomSignDecide = app.utils.storageRead("randomSignDecide");
    
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.mode
    })
    
    if (options.index != undefined) {
      this.setData({
        index: Number(options.index)
      })
    }
    this.setData({
      questionType: options.questionType,
      specialty: options.specialty,
      mode: options.mode
    })
    if (options.questionType == "RadioChoice"){
      if (randomSignSelect) {
        this.setData({ item: randomSignSelect });
      }
    }else{
      if (randomSignDecide) {
        this.setData({ item: randomSignDecide });
      }
    }
  },
  /**
   * 提交答案
   */
  saveTraingExam(e) {
    //选择的答案
    let items = e.currentTarget.dataset.viewpoint + 1;
    let id = e.currentTarget.dataset.id;
    let showRightAnswer = (this.data.item[this.data.index].ShowRightAnswer[0]);
    this.setData({
      id: id,
      items: items,
      switchs: true,
      showRightAnswer: showRightAnswer
    })
    this.setData({
      item: this.data.item
    });
  },
  getExam(e) {
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
   * 求助
   */
  onShareAppMessage: function (res) {
    let that = this;
    that.sharing();
    app.utils.storageRemove("randomSignSelect");
    app.utils.storageWrite("randomSignSelect", this.data.item);
    if (res.from === 'button') {
    }
    return {
      title: '大神，快帮我看看，这道题选什么',
      path: `/pages/question/generalItem/randomSign/randomSign?mode=好友求助&questionType=${this.data.questionType}&specialty=${this.data.specialty}&index=${this.data.index}`,
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