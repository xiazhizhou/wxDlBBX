// pages/index/more/datumconver/atmosphere5/atmosphere5.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kqjValue: "",
    kqgzValue: "",
    kqwhValue: "",
    list: []
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
      case 'kqjValue':
        this.setData({
          kqjValue: e.detail.value
        })
        break;
      case 'kqgzValue':
        this.setData({
          kqgzValue: e.detail.value
        })
        break;
      case 'kqwhValue':
        this.setData({
          kqwhValue: e.detail.value
        })
        break;
    }
  },
  /**
   * 提交数据时必填验证
   */
  validateData: function () {
    let cue = "";
    if (app.utils.isEmpty(this.data.kqjValue)) {
      cue += "空气干燥基水分不能为空！";
    } else {
      if (!(this.data.kqjValue > 0)) {
        cue = "空气干燥基水分不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.kqgzValue)) {
      cue += "空气干燥基灰分不能为空！";
    } else {
      if (!(this.data.kqgzValue > 0)) {
        cue = "空气干燥基灰分不能小于等于0！";
      }
    }
    if (app.utils.isEmpty(this.data.kqwhValue)) {
      cue += "空气无灰基某成分不能为空！";
    } else {
      if (!(this.data.kqwhValue > 0)) {
        cue = "空气无灰基某成分不能小于等于0！";
      }
    }
    return cue;
  },
  compute: function (event) {
    let error = this.validateData();
    if (app.utils.isEmpty(error)) {
      let Inputs = [];
      Inputs.push(this.data.kqjValue, this.data.kqgzValue, this.data.kqwhValue);
      app.agriknow.computeByInputsAndType({
        Type: 19,
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
      kqjValue: "",
      kqgzValue: "",
      kqwhValue: "",
      list: []
    });
  },
  // 参考说明
  advice(e) {
    wx.navigateTo({
      url: '/pages/index/more/datumconver/atmosphereGS/atmosphereGS'
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