// pages/question/generalItem/competition/competitionSelected/competitionSelected.js
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
    index: 1,
    bindex: 1,
    examIndex: -1,
    //答案选项
    allRadio: ["A", "B", "C", "D"],
    allRadios: ["E", "A", "B", "C", "D"],
    id: -1,
    useReviveCard: false,
    wxid: '',
    sss: '',
    mmm: '',
    hhh: '',
    questionType: '',
    specialty: '',
    mode: '',
    showRightAnswer: -1,
    showAnStatus: false,
    switchStatus:null,
    items: null,
    interval: "",
    total: 0
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
    this.acquireCompetitionExam(options.specialty, options.questionType);
  },
  //考试时间倒计时
  count_down: function (countDown_time) {
    var that = this;
    var time = countDown_time.split(':');
    var hhh = parseInt(time[0]);
    var mmm = parseInt(time[1]);
    var sss = parseInt(time[2]);
    this.setData({
      sss: (sss < 10) ? '0' + sss : sss,
      mmm: (mmm < 10) ? '0' + mmm : mmm,
      hhh: (hhh < 10) ? '0' + hhh : hhh
    })
    var Interval = setInterval(function () {
      if (sss > 0) {
        sss--
      } else {
        clearInterval(Interval)
        let item = {};
        item.WXId = that.data.wxid;
        item.ProfessionType = that.data.specialty;
        item.QuestionType = that.data.questionType;
        item.ExamAnswers = [0];
        item.useReviveCard = that.data.useReviveCard;
        that.examInitdata(item);
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
  //获取竞赛所有题目
  acquireCompetitionExam(specialty, questionType) {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.acquireCompetitionExam({ WXId: wxid, ProfessionType: specialty, QuestionType: questionType })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let items = res.Data;
          this.setData({ item: items });
          clearInterval(this.data.interval);
          let remainingTime = app.utils.secondToDate(items.RemainingTime + 4);
          this.count_down(remainingTime);
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  saveClassExam(e) {
    clearInterval(this.data.interval);
    let item = {};
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    item.WXId = this.data.wxid;
    item.ProfessionType = this.data.specialty;
    item.QuestionType = this.data.questionType;
    item.ExamAnswers = [id + 1];
    this.setData({
      items: item.ExamAnswers[0]
    })
    item.useReviveCard = this.data.useReviveCard;
    this.examSubmit(item,id);
  },
  examSubmit(item, id) {
    let that = this;
    app.agriknow.saveCompetitionExam(item)
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          clearInterval(this.data.interval);
          this.data.item = {};
          let items = res.Data;
          let remainingTime = app.utils.secondToDate(items.RemainingTime + 4);
          this.count_down(remainingTime);
          let showRightAnswer = items.ShowLastRightAnswer[0];
          console.log(showRightAnswer)
          this.useReviveCards(that, items);
          let examAnswers = item.ExamAnswers[0];
          if (examAnswers == showRightAnswer) {
            this.data.total += 1;
            this.setData({ total: this.data.total, switchStatus: true, showAnStatus: true, showRightAnswer: showRightAnswer, id: id });
          }else{
            this.setData({ switchStatus: false, showAnStatus: true, showRightAnswer: showRightAnswer, id: id });
          }
          this.data.index += 1;
          this.data.bindex += 1;
          let timer = setTimeout(() => {
            this.setData({
              item: items,
              id: -1, showAnStatus: false, index: this.data.index, bindex: this.data.bindex
            });
          }, 500)
          
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
  //使用复活卡之后获取的题目
  examInitdata(item) {
    let that = this;
    app.agriknow.saveCompetitionExam(item)
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          clearInterval(this.data.interval);
          let items = res.Data;
          items.ShowLastRightAnswer[0] = null;
          let remainingTime = app.utils.secondToDate(items.RemainingTime + 4);
          this.count_down(remainingTime);
          this.useReviveCards(that, items);
          this.data.index += 1;
          this.data.bindex += 1;
          this.setData({
            item: items,
            switchStatus: null,showRightAnswer: -1,
            id: -1, index: this.data.index, bindex: this.data.bindex
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
  //使用复活卡
  useReviveCards(that, items) {
    if (items.RemainingLife == 0) {
      clearInterval(this.data.interval);
      if (items.ReviveCard > 0) {
        let content = `您总计回答${this.data.bindex}道题，答对${this.data.total}道题，您有复活卡${items.ReviveCard}张，是否使用复活卡？`;
        wx.showModal({
          title: '挑战结束',
          content: content,
          confirmText: "使用",
          cancelText: "返回",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('用户点击主操作');
              //使用复活卡
              let item = {};
              item.WXId = that.data.wxid;
              item.ProfessionType = that.data.specialty;
              item.QuestionType = that.data.questionType;
              item.ExamAnswers = [0];
              item.useReviveCard = true;
              that.examInitdata(item);
            } else {
              console.log('用户点击返回')
              let item = {};
              item.WXId = that.data.wxid;
              item.ProfessionType = that.data.specialty;
              item.QuestionType = that.data.questionType;
              item.ExamAnswers = [0];
              item.useReviveCard = false;
              that.noExamSubmit(item);
              wx.navigateBack({
                delta: 2
              })
            }
          }
        });
        return;
      } else {
        let content = `您总计回答${this.data.bindex}道题，答对${this.data.total}道题，您有复活卡${items.ReviveCard}张，不能使用复活卡？`;
        wx.showModal({
          title: '挑战结束',
          content: content,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              let item = {};
              item.WXId = that.data.wxid;
              item.ProfessionType = that.data.specialty;
              item.QuestionType = that.data.questionType;
              item.ExamAnswers = [0];
              item.useReviveCard = false;
              that.noExamSubmit(item);
              wx.navigateBack({
                delta: 2
              })
            }
          }
        });
        return;
      }

    }
  },
  noExamSubmit(item) {
    let that = this;
    app.agriknow.saveCompetitionExam(item)
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.IsSuccess && res.Data) {
          clearInterval(this.data.interval);
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