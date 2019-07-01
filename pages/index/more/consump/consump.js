// pages/index/more/consump/consump.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cslValue:"",
    jsValue:"",
    sdValue:"",
    zqValue:"",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
  },
  bindKeyInput: function (e) {
    switch (e.currentTarget.id) {
      case 'cslValue':
        this.setData({
          cslValue: e.detail.value
        })
        break;
      case 'jsValue':
        this.setData({
          jsValue: e.detail.value
        })
        break;
      case 'sdValue':
        this.setData({
          sdValue: e.detail.value
        })
        break;
      case 'zqValue':
        this.setData({
          zqValue: e.detail.value
        })
        break;
    }
  },
  /**
   * 提交数据时必填验证
   */
  validateData: function () {
    let cue = "";
    if (app.utils.isEmpty(this.data.cslValue)) {
      cue += "纯酸量不能为空！";
    }else{
      if (!(this.data.cslValue > 0)) {
        cue = "纯酸量不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.jsValue)) {
      cue += "进水平均碱度不能为空！";
    }else{
      if (!(this.data.jsValue > 0)) {
        cue = "进水平均碱度不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.sdValue)) {
      cue += "进水平均酸度不能为空！";
    }else{
      if (!(this.data.sdValue > 0)) {
        cue = "进水平均酸度不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.zqValue)) {
      cue += "周期制水量不能为空！";
    } else {
      if (!(this.data.zqValue >0)) {
        cue = "周期制水量不能小于等于0！";
      }
    }
    return cue;
  },
  compute: function (event) {
    let error = this.validateData();
    if (app.utils.isEmpty(error)) {
      let Inputs = [];
      Inputs.push(this.data.cslValue, this.data.jsValue, this.data.sdValue, this.data.zqValue);
      app.agriknow.computeByInputsAndType({
        Type: 43,
        Inputs: Inputs
      })
        .then(res => {
          if (res.status && res.result) {
            let list = res.result;
            console.log(list)
            this.setData({
              list: list
            })
          } else {
            wx.showToast({
              title: res.error,
              icon: 'none'
            })
          }
        })
        .catch(res => {
          wx.showToast({
            title: "失败",
            icon: 'none'
          })
        })
    } else {
      wx.showToast({
        title: error,
        icon: 'none'
      })
      return;
    }
  },
  clear() {
    this.setData({
      cslValue: "",
      jsValue: "",
      sdValue: "",
      zqValue: "",
      list: []
    });
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