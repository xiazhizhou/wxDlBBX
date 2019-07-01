// pages/question/generalItem/randomDecide/randomDecide.js
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
    mode: '',
    score: 0,
    init: 0
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
    console.log(this.data.index)
    this.acquireTraingExam(options.specialty, options.questionType)
  },
  //获取练习模式所有题目
  acquireTraingExam(professionName, questionType) {
    app.agriknow.acquireRandomExam({ ProfessionType: professionName, QuestionType: questionType })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          this.acquireCollectQuestionPairs(res.Data);
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 获取收藏的题目
   */
  acquireCollectQuestionPairs(item) {
    let wxid = this.data.wxid;
    app.agriknow.acquireCollectQuestionPairs({ WXId: wxid, ProfessionType: this.data.specialty })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let list = res.Data;
          item.forEach(item => {
            item.answerState = 0;
            item.searchStatus = false;
          })
          item.forEach(item => {
            list.forEach(it => {
              if (item.OrderNumber == it.OrderNumber) {
                item.searchStatus = true;
              }
            })
          })
          this.setData({
            item: item,
            list: list
          });
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
  /**
   * 保存收藏题目
   */
  saveCollectQuestionPairs(questions) {
    let wxid = this.data.wxid;
    app.agriknow.saveCollectQuestionPairs({ WXId: wxid, Questions: questions })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          wx.showToast({
            title: "收藏成功",
            icon: 'none'
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
   * 删除收藏题目
   */
  deleteCollectQuestionPairs(questions) {
    let wxid = this.data.wxid;
    app.agriknow.deleteCollectQuestionPairs({ WXId: wxid, Questions: questions })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          wx.showToast({
            title: "取消收藏",
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })

  },
  searchC(e) {
    let searchStatus = this.data.item[this.data.index].searchStatus;
    switch (searchStatus) {
      case true:
        this.data.item[this.data.index].searchStatus = false
        this.setData({
          item: this.data.item
        })
        this.deleteCollectQuestionPairs([this.data.item[this.data.index].OrderNumber]);
        break;
      case false:
        this.data.item[this.data.index].searchStatus = true
        this.setData({
          item: this.data.item
        })
        this.saveCollectQuestionPairs([this.data.item[this.data.index].OrderNumber]);
        break;
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  //交卷按钮
  isHand(e) {
    this.dialog.showDialog();
  },
  _cancelEvent() {
    this.dialog.hideDialog();
  },
  _confirmEvent() {
    let question = this.data.question;
    let specialty = this.data.specialty;
    this.dialog.hideDialog();
    this.data.item.forEach(it => {
      if (it.answerState == 1) {
        this.data.init += 1;
      }
    })
    this.setData({
      init: this.data.init
    })
    this.setData({
      score: Number(this.data.init * 4),
    })
    this.saveRandomExam(specialty, this.data.score, this.data.item, specialty);
  },
  //保存随机题目
  saveRandomExam(professionName, score, item, specialty) {
    app.agriknow.saveRandomExam({ ProfessionType: professionName, Score: score })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let OverCountUsers = res.Data.OverCountUsers;
          let OverPercentage = res.Data.OverPercentage;
          app.utils.storageRemove("randomSelec");
          app.utils.storageWrite("randomSelec", item);
          wx.navigateTo({
            url: `/pages/question/generalItem/answerResult/answerResult?questionType=RadioChoice&specialty=${specialty}&OverCountUsers=${OverCountUsers}&OverPercentage=${OverPercentage}`
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   index: 0
    // })
    // this.acquireTraingExam(this.data.specialty, this.data.questionType)
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
    app.utils.storageRemove("randomSignDecide");
    app.utils.storageWrite("randomSignDecide", this.data.item);
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