// pages/question/generalItem/selected/selected.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_loadmore: false,
    list:[],
    item:{},
    //题目的集合
    itemExam:null,
    extotal:null,
    //答案选项
    allRadio: ["A", "B", "C", "D"],
    id: -1,
    wxid: '',
    switchs:false,
    hidder:false,
    items:-1,
    showRightAnswer:-1,
    questionType:'',
    specialty:'',
    mode:'',
    pageSize:1,
    pageIndex:1,
    examList:[],
    isExamBool:false
  },

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
    if (options.index !=undefined){
      this.setData({
        pageIndex: Number(options.index)
      })
    }else{
      let pageIndex;
      let examList;
      var content;
      switch (options.specialty) {
        case '锅炉专业':
          pageIndex = app.utils.storageRead("pageIndex");
          examList = app.utils.storageRead("examList");
          content = `锅炉题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
        case '汽机专业':
          pageIndex = app.utils.storageRead("pageIndex2");
          examList = app.utils.storageRead("examList2");
          content = `汽机题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
        case '电气专业':
          pageIndex = app.utils.storageRead("pageIndex3");
          examList = app.utils.storageRead("examList3");
          content = `电气题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
        case '热控专业':
          pageIndex = app.utils.storageRead("pageIndex4");
          examList = app.utils.storageRead("examList4");
          content = `热控题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
        case '化学专业':
          pageIndex = app.utils.storageRead("pageIndex5");
          examList = app.utils.storageRead("examList5");
          content = `化学题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
        case '安规专业':
          pageIndex = app.utils.storageRead("pageIndex6");
          examList = app.utils.storageRead("examList6");
          content = `安规题库，您上次答到第${pageIndex-1}道题，是否继续？`;
          break;
      }
      if (pageIndex && examList) {
        this.setData({ pageIndex: pageIndex, examList: examList});
        that.isExam(content);
      }else{
        this.acquireTraingExamTotal(options.specialty, options.questionType, this.data.pageSize, this.data.pageIndex);
       
      }
    }
    this.acquireTraingExams(options.specialty, options.questionType, this.data.pageSize, this.data.pageIndex);
  },
  /**
   * 是否继续答题
   */
  isExam(content){
    let that = this;
    wx.showModal({
      content: content,
      confirmText: "继续",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {

        } else {
          let specialty = that.data.specialty;
          switch (specialty) {
            case '锅炉专业':
              app.utils.storageRemove("examList");
              app.utils.storageRemove("pageIndex");
              that.setData({ pageIndex:1});
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
            case '汽机专业':
              app.utils.storageRemove("examList2");
              app.utils.storageRemove("pageIndex2");
              that.setData({ pageIndex: 1 });
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
            case '电气专业':
              app.utils.storageRemove("examList3");
              app.utils.storageRemove("pageIndex3");
              that.setData({ pageIndex: 1 });
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
            case '热控专业':
              app.utils.storageRemove("examList4");
              app.utils.storageRemove("pageIndex4");
              that.setData({ pageIndex: 1 });
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
            case '化学专业':
              app.utils.storageRemove("examList5");
              app.utils.storageRemove("pageIndex5");
              that.setData({ pageIndex: 1 });
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
            case '安规专业':
              app.utils.storageRemove("examList6");
              app.utils.storageRemove("pageIndex6");
              that.setData({ pageIndex: 1 });
              that.acquireTraingExams(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              that.acquireTraingExamTotal(that.data.specialty, that.data.questionType, that.data.pageSize, that.data.pageIndex);
              break;
          }
        }
      }
    });
  },
  switchChange: function (e) {
    this.setData({ switchAnswer: e.detail.value })
  },
  //获取练习模式所有题目的条数
  acquireTraingExamTotal(professionName, questionType, pageSize, pageIndex) {
    app.agriknow.acquireTraingExam({ ProfessionType: professionName, QuestionType: questionType, PageSize: pageSize, PageIndex: pageIndex })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          this.setData({
            extotal: res.Data.TotalExamQuestion,
          })
          this.examListfun(this.data.extotal);
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
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
          this.acquireCollectQuestionPairs(res.Data.ExamQuestions[0]);
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 创造题集
   */
  examListfun(extotal){
    let arr = [];
    for (let i = 0; i < extotal; i++ ){
      arr.push({ index: i + 1, answerState:0 })
    }
    this.setData({
      examList: arr
    })
  },
  /**
   * 上一题
   */
  previous(e){
    if (this.data.pageIndex == 1) {
      wx.showToast({
        title: '没有上一题了',
        icon: 'none'
      })
      this.setData({ pageIndex:1 });
    } else {
      this.data.pageIndex -=1;
      this.setData({ pageIndex: this.data.pageIndex });
      this.acquireTraingExams(this.data.specialty, this.data.questionType, this.data.pageSize, this.data.pageIndex);
    }
    this.setData({
      id: -1
    })
    
  },
  /**
   * 下一题
   */
  next(e) {
    if (this.data.pageIndex == this.data.extotal) {
      wx.showToast({
        title: '没有下一题了',
        icon: 'none'
      })
      this.setData({ pageIndex: this.data.extotal });
    } else {
      this.data.pageIndex += 1;
      this.setData({ pageIndex: this.data.pageIndex });
      this.acquireTraingExams(this.data.specialty, this.data.questionType, this.data.pageSize, this.data.pageIndex);
    }
    this.setData({
      id: -1
    })
  },
  /**
   * 提交答案
   */
  saveTraingExam(e){
    //选择的答案
    let items = e.currentTarget.dataset.viewpoint+1; 
    let id = e.currentTarget.dataset.id;
    let showRightAnswer = (this.data.itemExam.ShowRightAnswer[0]);
    this.setData({
      id: id,
      items: items,
      switchs: true,
      showRightAnswer: showRightAnswer
    })
    if (items == showRightAnswer) {
      this.data.examList[this.data.pageIndex-1].answerState = 1
    } else {
      this.data.examList[this.data.pageIndex-1].answerState = 2
    }
    this.setData({
      examList: this.data.examList,
      isExamBool:true
    })
    if (this.data.pageIndex == this.data.extotal) {
      wx.showToast({
        title: '没有下一题了',
        icon: 'none'
      })
      let timer = setTimeout(() => {
        this.setData({ pageIndex: this.data.extotal });
      }, 500)
    } else {
      this.data.pageIndex += 1;
      let timer = setTimeout(() => {
        this.setData({ id: -1, pageIndex: this.data.pageIndex });
        this.acquireTraingExams(this.data.specialty, this.data.questionType, this.data.pageSize, this.data.pageIndex);
       }, 500)
    }
  },
  getExam(e){
    this.setData({
      hidder:true
    })
  },
  getExamHidd(e){
    this.setData({
      hidder: false
    })
  },
  clickExem(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      index:id,
      pageIndex: id,
      hidder: false
    })
    this.acquireTraingExams(this.data.specialty, this.data.questionType, this.data.pageSize, this.data.pageIndex);
  },
  /**
   * 获取收藏的题目
   */
  acquireCollectQuestionPairs(item){
    let wxid = this.data.wxid;
    app.agriknow.acquireCollectQuestionPairs({ WXId: wxid, ProfessionType: this.data.specialty })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let list = res.Data;
          item.answerState = 0;
          item.searchStatus = false;
          list.forEach(it => {
            if (item.OrderNumber == it.OrderNumber){
              item.searchStatus = true;
            }
          }) 
          this.setData({
            itemExam:item,
            list: list
          });
        }
      })
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
  searchC(e){
    let searchStatus = this.data.itemExam.searchStatus;
    switch (searchStatus){
      case true:
        this.data.itemExam.searchStatus = false
        this.setData({
          itemExam: this.data.itemExam
        })
        this.deleteCollectQuestionPairs([this.data.itemExam.OrderNumber]);
        break;
      case false:
        this.data.itemExam.searchStatus = true
        this.setData({
          itemExam: this.data.itemExam
        })
        this.saveCollectQuestionPairs([this.data.itemExam.OrderNumber]);
        break;
    }
    
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
    this.answerRecord();
  },
  /**
   * 答题记录
   */
  answerRecord: function () {
    if (this.data.isExamBool == true){
      let specialty = this.data.specialty;
      switch (specialty) {
        case '锅炉专业':
          app.utils.storageRemove("examList");
          app.utils.storageRemove("pageIndex");
          app.utils.storageWrite("pageIndex", this.data.pageIndex);
          app.utils.storageWrite("examList", this.data.examList);
          break;
        case '汽机专业':
          app.utils.storageRemove("examList2");
          app.utils.storageRemove("pageIndex2");
          app.utils.storageWrite("pageIndex2", this.data.pageIndex);
          app.utils.storageWrite("examList2", this.data.examList);
          break;
        case '电气专业':
          app.utils.storageRemove("examList3");
          app.utils.storageRemove("pageIndex3");
          app.utils.storageWrite("pageIndex3", this.data.pageIndex);
          app.utils.storageWrite("examList3", this.data.examList);
          break;
        case '热控专业':
          app.utils.storageRemove("examList4");
          app.utils.storageRemove("pageIndex4");
          app.utils.storageWrite("pageIndex4", this.data.pageIndex);
          app.utils.storageWrite("examList4", this.data.examList);
          break;
        case '化学专业':
          app.utils.storageRemove("examList5");
          app.utils.storageRemove("pageIndex5");
          app.utils.storageWrite("pageIndex5", this.data.pageIndex);
          app.utils.storageWrite("examList5", this.data.examList);
          break;
        case '安规专业':
          app.utils.storageRemove("examList6");
          app.utils.storageRemove("pageIndex6");
          app.utils.storageWrite("pageIndex6", this.data.pageIndex);
          app.utils.storageWrite("examList6", this.data.examList);
          break;
      }
    }
      
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