// pages/index/eliteCup/eliteCupSelected/eliteCupResult/eliteCupResult.js
//获取应用实例 也就是小程序App
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    content: [],
    item:null,
    isArr: false,
    contentStr: "",
    type:"",
    wxid:"",
    userInfo:null,
    time:''
  },
  _cancelEvent() {
    this.alert.hideDialog();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.utils.storageRead("userInfo");
    if (userInfo) {
      this.setData({ userInfo: userInfo });
    }
    let time = app.utils.formatTime(new Date(), 'YYYY-MM');
    this.setData({
      time: time
    })
    this.loginusercount();
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
            this.setData({
              item: item
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
    let wxinfo = app.utils.storageRead("wxinfo");
    let myDate = new Date();
    let date = app.utils.formatTime(myDate, "YYYY-MM");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
      this.setData({ wxid: wxinfo.WXId });
    }
    app.agriknow.listMatchRanking({ ExamType: "Classes", YearMonth: date })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let item = res.Data;
          let items = [];
          item.forEach(it => {
            if (it.Name == this.data.item.Name){
              items.push(it)
            }
          })
          let contentStr = "";
          if (items[0]){
            if (items[0].OrderNumber < 3) {
              contentStr = `恭喜你！！你在本次比赛中取得了${items[0].Score}分的成绩，加油！！`;
            } else {
              contentStr = `祝贺你！！你在本次比赛中取得了${items[0].Score}分的成绩，请继续努力，加油！！"`;
            }
            this.setData({ contentStr: contentStr, title: '我的成绩' });
            this.alert.showDialog();
          }else{
            this.setData({ contentStr: "暂无成绩", title: '我的成绩' });
            this.alert.showDialog();
          }
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  goto(e) {
    switch (e.target.id) {
      case 'st':
        wx.navigateTo({
          url: '/pages/index/eliteCup/eliteCupSelected/eliteCupResult/elitecupPractice/elitecupPractice'
        })
        break;
      case 'bs':
        wx.navigateTo({
          url: '/pages/index/eliteCup/eliteCupSelected/eliteCupResult/eliteRanking/eliteRanking'
        })
        break;
      case 'cj':
        this.listAccountRanking();
        break;
      case 'ly':
        wx.navigateTo({
          url: '/pages/question/guestbook/guestbook'
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.alert = this.selectComponent("#alert");
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
    if (res.from === 'button') {
    }
    return {
      title: '快来参加有奖竞赛',
      path: `/pages/index/index`,
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