// pages/index/more/smokedust/smokedust.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    glValue:"",
    mValue:"",
    ycValue:"",
    rValue:"",
    clValue:"",
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
      case 'glValue':
        this.setData({
          glValue: e.detail.value
        })
        break;
      case 'mValue':
        this.setData({
          mValue: e.detail.value
        })
        break;
      case 'rValue':
        this.setData({
          rValue: e.detail.value
        })
        break;
      case 'ycValue':
        this.setData({
          ycValue: e.detail.value
        })
        break;
      case 'clValue':
        this.setData({
          clValue: e.detail.value
        })
        break;
    }
  },
  /**
   * 提交数据时必填验证
   */
  validateData: function () {
    let cue = "";
    if (app.utils.isEmpty(this.data.glValue)) {
      cue += "锅炉耗煤量不能为空！";
    } else {
      if (!(this.data.glValue > 0)) {
        cue = "锅炉耗煤量不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.mValue)) {
      cue += "煤的灰分不能为空！";
    } else {
      if (!(this.data.mValue > 0)) {
        cue = "煤的灰分不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.ycValue)) {
      cue += "烟尘占灰量不能为空！";
    } else {
      if (!(this.data.ycValue > 0)) {
        cue = "烟尘占灰量不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.rValue)) {
      cue += "可燃物含量不能为空！";
    } else {
      if (!(this.data.rValue > 0 && this.data.rValue < 100)) {
        cue = "可燃物含量不能超出0~100取值范围！";
      }
    }
    if (app.utils.isEmpty(this.data.clValue)) {
      cue += "除尘效率不能为空！";
    } else {
      if (!(this.data.clValue > 0 && this.data.clValue < 100)) {
        cue = "除尘效率不能超出0~100取值范围！";
      }
    }
    return cue;
  },
  compute: function (event) {
    let error = this.validateData();
    if (app.utils.isEmpty(error)) {
      let Inputs = [];
      Inputs.push(this.data.glValue, this.data.mValue, this.data.ycValue, this.data.rValue, this.data.clValue);
      app.agriknow.computeByInputsAndType({
        Type: 23,
        Inputs: Inputs
      })
        .then(res => {
          if (res.status && res.result) {
            let list = res.result;
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
      glValue: "",
      mValue: "",
      ycValue: "",
      rValue: "",
      clValue: "",
      list: []
    });
  },
  // 参考说明
  advice(e) {
    wx.navigateTo({
      url: '/pages/index/more/smokedust/smokedustGs/smokedustGs'
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