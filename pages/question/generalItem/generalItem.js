// pages/question/generalItem/generalItem.js
const app = getApp();
import IsWW from '../../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    item: {},
    max:0,
    hidden: true,
    selectedMode: "",
    question: "",
    specialty: "",
    answer: "准备",
    answerStatus: false,
    lxmsStatus: false,
    sjmsStatus: false,
    jsmsStatus: false,
    xztStatus: false,
    pdtStatus: false,
    wdtStatus: false,
    glzyStatus: false,
    qjzyStatus: false,
    dqzyStatus: false,
    rkzyStatus: false,
    hxzyStatus: false,
    agzsStatus: false,
    userInfo: null,
    hidder: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loginusercount();
    this.listAccountRanking();
    let userInfo = app.utils.storageRead("userInfo");
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
    this.getTraingExamRuleDescription();
  },
  //获取练习题库规则说明
  getTraingExamRuleDescription() {
    app.agriknow.getTraingExamRuleDescription({})
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
  listAccountRanking() {
    let userInfo = app.utils.storageRead("userInfo");
    app.agriknow.listAccountRanking({
        wxId: userInfo.WXId
      })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let list = res.Data;
          var max = list[0].Score;
          for (var i = 0; i < list.length; i++) {
            if (max < list[i].Score) {
              max = list[i].Score
            }
          }
          this.setData({
            max: max
          })

        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
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
  /**
   * 答题按钮开关
   */
  setAnswer() {
    if (this.data.selectedMode != "" && this.data.question != "" && this.data.specialty != "") {
      this.setData({
        answer: "开始答题",
        answerStatus: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //获得dialog组件
    this.alert = this.selectComponent("#alert");
  },
  gotoUrl(e) {
    switch (e.target.id) {
      case 'phburl':
        wx.navigateTo({
          url: '/pages/eliteExam/eliteExam'
        })
        break;
      case 'ctjurl':
        wx.navigateTo({
          url: '/pages/question/generalItem/gatherItem/gatherItem'
        })
        break;
    }
  },
  _goTo() {
    this.setData({
      hidder: false
    })
    wx.navigateTo({
      url: '/pages/question/higher/higher'
    })
  },
  prevImg: function() {
    var current = this.data.current;
    current = current > 0 ? current - 1 : 2 - 1;
    this.setData({
      current: current
    })
  },

  nextImg: function() {
    var current = this.data.current;
    current = current < (2 - 1) ? current + 1 : 0;
    this.setData({
      current: current
    })
  },
  /**
   * 答题模式
   */
  selectedMode(e) {
    let mode = e.target.id;
    switch (mode) {
      //练习模式
      case 'lxms':
        this.setData({
          selectedMode: "练习模式",
          lxmsStatus: true,
          sjmsStatus: false,
          jsmsStatus: false
        })
        break;
        //随机模式
      case 'sjms':
        this.setData({
          selectedMode: "随机模式",
          lxmsStatus: false,
          sjmsStatus: true,
          jsmsStatus: false
        })
        break;
        //竞赛模式
      case 'jsms':
        this.setData({
          selectedMode: "竞赛模式",
          lxmsStatus: false,
          sjmsStatus: false,
          jsmsStatus: true
        })
        break;
    }
    this.setAnswer();
  },
  /**
   * 题型选择
   */
  questionSelect(e) {
    let mode = e.target.id;
    switch (mode) {
      //选择题
      case 'xzt':
        this.setData({
          question: "RadioChoice",
          xztStatus: true,
          pdtStatus: false,
          wdtStatus: false
        })
        break;
        //判断题
      case 'pdt':
        this.setData({
          question: "TrueOrFalse",
          xztStatus: false,
          pdtStatus: true,
          wdtStatus: false
        })
        break;
        //问答题
      case 'wdt':
        this.setData({
          question: "问答题",
          xztStatus: false,
          pdtStatus: false,
          wdtStatus: true
        })
        break;
    }
    this.setAnswer();
  },
  /**
   * 专业类型
   */
  specialtySelected(e) {
    let mode = e.target.id;
    switch (mode) {
      //锅炉专业
      case 'glzy':
        this.setData({
          specialty: "锅炉专业",
          glzyStatus: true,
          qjzyStatus: false,
          dqzyStatus: false,
          rkzyStatus: false,
          hxzyStatus: false,
          agzsStatus: false
        })
        break;
        //汽机专业
      case 'qjzy':
        this.setData({
          specialty: "汽机专业",
          glzyStatus: false,
          qjzyStatus: true,
          dqzyStatus: false,
          rkzyStatus: false,
          hxzyStatus: false,
          agzsStatus: false
        })
        break;
        //电气专业
      case 'dqzy':
        this.setData({
          specialty: "电气专业",
          glzyStatus: false,
          qjzyStatus: false,
          dqzyStatus: true,
          rkzyStatus: false,
          hxzyStatus: false,
          agzsStatus: false
        })
        break;
        //热控专业
      case 'rkzy':
        this.setData({
          specialty: "热控专业",
          glzyStatus: false,
          qjzyStatus: false,
          dqzyStatus: false,
          rkzyStatus: true,
          hxzyStatus: false,
          agzsStatus: false
        })
        break;
        //化学专业
      case 'hxzy':
        this.setData({
          specialty: "化学专业",
          glzyStatus: false,
          qjzyStatus: false,
          dqzyStatus: false,
          rkzyStatus: false,
          hxzyStatus: true,
          agzsStatus: false
        })
        break;
        //安规知识
      case 'agzs':
        this.setData({
          specialty: "安规专业",
          glzyStatus: false,
          qjzyStatus: false,
          dqzyStatus: false,
          rkzyStatus: false,
          hxzyStatus: false,
          agzsStatus: true
        })
        break;
    }
    this.setAnswer();
  },
  /**
   * 选题按钮必选
   */
  validateData: function() {
    let cue = "";
    if (app.utils.isEmpty(this.data.selectedMode)) {
      cue += "请选择答题模式！";
    }
    if (app.utils.isEmpty(this.data.question)) {
      cue += "请选择题型！";
    }
    if (app.utils.isEmpty(this.data.specialty)) {
      cue += "请选择专业！";
    }
    return cue;
  },
  answerClick(e) {
    let error = this.validateData();
    if (!(app.utils.isEmpty(error))) {
      wx.showToast({
        title: error,
        icon: 'none'
      })
      return;
    } else {
      let selectedMode = this.data.selectedMode;
      let question = this.data.question;
      let specialty = this.data.specialty;
      if (selectedMode == "练习模式") {
        switch (question) {
          case 'RadioChoice':
            wx.navigateTo({
              url: `/pages/question/generalItem/selected/selected?mode=练习模式&questionType=RadioChoice&specialty=${specialty}`
            })
            break;
          case 'TrueOrFalse':
            wx.navigateTo({
              url: `/pages/question/generalItem/decide/decide?mode=练习模式&questionType=TrueOrFalse&specialty=${specialty}`
            })
            break;
          case '问答题':
            wx.navigateTo({
              url: `/pages/question/generalItem/wdtpage/wdtpage?mode=练习模式&questionType=Essay&specialty=${specialty}&type=1`
            })
            console.log("跳转问答题")
            break;
        }
      } else if (selectedMode == "随机模式") {
        switch (question) {
          case 'RadioChoice':
            wx.navigateTo({
              url: `/pages/question/generalItem/randomSelected/randomSelected?mode=随机模式&questionType=RadioChoice&specialty=${specialty}`
            })
            break;
          case 'TrueOrFalse':
            wx.navigateTo({
              url: `/pages/question/generalItem/randomDecide/randomDecide?mode=随机模式&questionType=TrueOrFalse&specialty=${specialty}`
            })
            break;
          case '问答题':
            wx.navigateTo({
              url: `/pages/question/generalItem/wdtpage/wdtpage?mode=随机模式&questionType=Essay&specialty=${specialty}&type=2`
            })
            console.log("跳转问答题")
            break;
        }
      } else if (selectedMode == "竞赛模式") {
        switch (question) {
          case 'RadioChoice':
            wx.navigateTo({
              url: `/pages/question/generalItem/competition/competition?mode=选择题&questionType=RadioChoice&specialty=${specialty}`
            })
            break;
          case 'TrueOrFalse':
            wx.navigateTo({
              url: `/pages/question/generalItem/competition/competition?mode=判断题&questionType=TrueOrFalse&specialty=${specialty}`
            })
            break;
          case '问答题':
            wx.navigateTo({
              url: `/pages/question/generalItem/competition/competition?mode=问答题&questionType=Essay&specialty=${specialty}&type=2`
            })
            console.log("跳转问答题")
            break;
        }
      }
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
          if (res.result.IsSuccess) {
            let item = res.result.Data;
            item.ImageUrl = IsWW.requestImgUrl + item.ImageUrl.replace(/\\/g, "/");
            this.setData({
              item: item
            })
          }
        } else {
          wx.showToast({
            title: res.result.error,
            icon: 'none'
          })
        }
      })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loginusercount();
    var that = this;
    let userInfo = app.utils.storageRead("userInfo");
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
    this.setData({
      answerStatus: false,
      lxmsStatus: false,
      sjmsStatus: false,
      jsmsStatus: false,
      xztStatus: false,
      pdtStatus: false,
      wdtStatus: false,
      glzyStatus: false,
      qjzyStatus: false,
      dqzyStatus: false,
      rkzyStatus: false,
      hxzyStatus: false,
      agzsStatus: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

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