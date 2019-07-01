// pages/index/more/threephase/threephase.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    powerStatus: true,
    elecStatus: false,
    pressureStatus: false,
    dyValue: "",
    dlValue: "",
    gsValue: "",
    list: [],
    gl2Value: "",
    dy2Value: "",
    gs2Value: "",
    list2: [],
    gl3Value: "",
    dl3Value: "",
    gs3Value: "",
    list3: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
  },
  // 选项卡切换
  switchTab(event) {
    this.setData({
      dyValue: "",
      dlValue: "",
      gsValue: "",
      list: [],
      gl2Value: "",
      dy2Value: "",
      gs2Value: "",
      list2: [],
      gl3Value: "",
      dl3Value: "",
      gs3Value: "",
      list3: []
    })
    switch (event.currentTarget.id) {
      case 'power':
        this.setData({ elecStatus: false });
        this.setData({ pressureStatus: false });
        this.setData({ powerStatus: true });
        break;
      case 'electricity':
        this.setData({ powerStatus: false });
        this.setData({ pressureStatus: false });
        this.setData({ elecStatus: true });
        break;
      case 'pressure':
        this.setData({ powerStatus: false });
        this.setData({ elecStatus: false });
        this.setData({ pressureStatus: true });
        break;
    }
  },
  bindKeyInput: function (e) {
    switch (e.currentTarget.id) {
      case 'dyValue':
        this.setData({
          dyValue: e.detail.value
        })
        break;
      case 'dlValue':
        this.setData({
          dlValue: e.detail.value
        })
        break;
      case 'gsValue':
        this.setData({
          gsValue: e.detail.value
        })
        break;
      case 'gl2Value':
        this.setData({
          gl2Value: e.detail.value
        })
        break;
      case 'dy2Value':
        this.setData({
          dy2Value: e.detail.value
        })
        break;
      case 'gs2Value':
        this.setData({
          gs2Value: e.detail.value
        })
        break;
      case 'gl3Value':
        this.setData({
          gl3Value: e.detail.value
        })
        break;
      case 'dl3Value':
        this.setData({
          dl3Value: e.detail.value
        })
        break;
      case 'gs3Value':
        this.setData({
          gs3Value: e.detail.value
        })
        break;
    }
  },
  /**
   * 提交数据时必填验证
   */
  validateData: function (n) {
    let cue = "";
    switch (n) {
      case '1':
        if (app.utils.isEmpty(this.data.dyValue)) {
          cue += "电压不能为空！";
        } else {
          if (!(this.data.dyValue > 0)) {
            cue = "电压不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.dlValue)) {
          cue += "电流不能为空！";
        } else {
          if (!(this.data.dlValue > 0)) {
            cue = "电流不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.gsValue)) {
          cue += "功率因数不能为空！";
        } else {
          if (!(this.data.gsValue > 0 && this.data.gsValue <= 1)) {
            cue = "功率因数不能超出取值范围！";
          }
        }
        break;
      case '2':
        if (app.utils.isEmpty(this.data.gl2Value)) {
          cue += "功率不能为空！";
        } else {
          if (!(this.data.gl2Value > 0)) {
            cue = "功率不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.dy2Value)) {
          cue += "电压不能为空！";
        } else {
          if (!(this.data.dy2Value > 0)) {
            cue = "电压不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.gs2Value)) {
          cue += "功率因数不能为空！";
        } else {
          if (!(this.data.gs2Value > 0 && this.data.gs2Value <= 1)) {
            cue = "功率因数不能超出取值范围！";
          }
        }
        break;
      case '3':
        if (app.utils.isEmpty(this.data.gl3Value)) {
          cue += "功率不能为空！";
        } else {
          if (!(this.data.gl3Value > 0)) {
            cue = "功率不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.dl3Value)) {
          cue += "电流不能为空！";
        } else {
          if (!(this.data.dl3Value > 0)) {
            cue = "电流不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.gs3Value)) {
          cue += "功率因数不能为空！";
        } else {
          if (!(this.data.gs3Value > 0 && this.data.gs3Value <= 1)) {
            cue = "功率因数不能超出取值范围！";
          }
        }
        break;
    }
    return cue;
  },
  compute: function (event) {
    let Inputs = [];
    let Type;
    let error;
    switch (event.currentTarget.id) {
      case 'gl':
        error = this.validateData("1");
        Inputs.push(this.data.dyValue, this.data.dlValue, this.data.gsValue);
        Type = 30;
        break;
      case 'dl':
        error = this.validateData("2");
        Inputs.push(this.data.gl2Value, this.data.dy2Value, this.data.gs2Value);
        Type = 31;
        break;
      case 'dy':
        error = this.validateData("3");
        Inputs.push(this.data.gl3Value, this.data.dl3Value, this.data.gs3Value);
        Type = 32;
        break;
    }
    if (app.utils.isEmpty(error)) {
      app.agriknow.computeByInputsAndType({
        Type: Type,
        Inputs: Inputs
      })
        .then(res => {
          if (res.status && res.result) {
            let list = res.result;
            switch (event.currentTarget.id) {
              case 'gl':
                this.setData({
                  list: list
                })
                break;
              case 'dl':
                this.setData({
                  list2: list
                })
                break;
              case 'dy':
                this.setData({
                  list3: list
                })
                break;
            }
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
  clear(event) {
    if (event.currentTarget.id == "gl") {
      this.setData({
        dyValue: "",
        dlValue: "",
        gsValue: "",
        list: [],
      });
    }
    if (event.currentTarget.id == "dl") {
      this.setData({
        gl2Value: "",
        dy2Value: "",
        gs2Value: "",
        list2: [],
      });
    }
    if (event.currentTarget.id == "dy") {
      this.setData({
        gl3Value: "",
        dl3Value: "",
        gs3Value: "",
        list3: []
      });
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