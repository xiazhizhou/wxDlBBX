// pages/index/more/direct/direct.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    powerStatus:true,
    elecStatus:false,
    pressureStatus:false,
    yalValue:"",
    dlValue:"",
    list:[],
    glValue:"",
    dyValue:"",
    list2:[],
    glpValue:"",
    dyiValue:"",
    list3:[]
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
  switchTab(event){
    this.setData({
      yalValue: "",
      dlValue: "",
      list: [],
      glValue: "",
      dyValue: "",
      list2: [],
      glpValue: "",
      dyiValue: "",
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
      case 'yalValue':
        this.setData({
          yalValue: e.detail.value
        })
        break;
      case 'dlValue':
        this.setData({
          dlValue: e.detail.value
        })
        break;
      case 'glValue':
        this.setData({
          glValue: e.detail.value
        })
        break;
      case 'dyValue':
        this.setData({
          dyValue: e.detail.value
        })
        break;
      case 'glpValue':
        this.setData({
          glpValue: e.detail.value
        })
        break;
      case 'dyiValue':
        this.setData({
          dyiValue: e.detail.value
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
        if (app.utils.isEmpty(this.data.yalValue)) {
          cue += "电压不能为空！";
        } else {
          if (!(this.data.yalValue > 0)) {
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
        break;
      case '2':
        if (app.utils.isEmpty(this.data.glValue)) {
          cue += "功率不能为空！";
        } else {
          if (!(this.data.glValue > 0)) {
            cue = "功率不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.dyValue)) {
          cue += "电压不能为空！";
        } else {
          if (!(this.data.dyValue > 0)) {
            cue = "电压不能小于等于0！";
          }
        }
        break;
      case '3':
        if (app.utils.isEmpty(this.data.glpValue)) {
          cue += "功率不能为空！";
        } else {
          if (!(this.data.glpValue > 0)) {
            cue = "功率不能小于等于0！";
          }
        }
        if (app.utils.isEmpty(this.data.dyiValue)) {
          cue += "电流不能为空！";
        } else {
          if (!(this.data.dyiValue > 0)) {
            cue = "电流不能小于等于0！";
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
        Inputs.push(this.data.yalValue, this.data.dlValue);
        Type = 24;
        break;
      case 'dl':
        error = this.validateData("2");
        Inputs.push(this.data.glValue, this.data.dyValue);
        Type = 25;
        break;
      case 'dy':
        error = this.validateData("3");
        Inputs.push(this.data.glpValue, this.data.dyiValue);
        Type = 26;
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
    if (event.currentTarget.id == "gl"){
      this.setData({
        yalValue: "",
        dlValue: "",
        list: []
      });
    }
    if (event.currentTarget.id == "dl"){
      this.setData({
        glValue: "",
        dyValue: "",
        list2: [],
      });
    }
    if (event.currentTarget.id == "dy") {
      this.setData({
        glpValue: "",
        dyiValue: "",
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