// pages/specialtyEnglish/specialtyEnglish.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    inputShowed: false,
    inputVal: '',
    glStatus:true,
    qjStatus:false,
    dqStatus:false,
    rkStatus:false,
    hxStatus:false,
    agStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEnglishChinese("锅炉专业", this.data.inputVal)
  },
  specialtyTab(e){
    let id = e.currentTarget.id;
    switch (id){
      case '锅炉专业':
        this.setData({
          glStatus: true,
          qjStatus: false,
          dqStatus: false,
          rkStatus: false,
          hxStatus: false,
          agStatus: false
        })
        break;
      case '汽机专业':
        this.setData({
          glStatus: false,
          qjStatus: true,
          dqStatus: false,
          rkStatus: false,
          hxStatus: false,
          agStatus: false
        })
        break;
      case '电气专业':
        this.setData({
          glStatus: false,
          qjStatus: false,
          dqStatus: true,
          rkStatus: false,
          hxStatus: false,
          agStatus: false
        })
        break;
      case '热控专业':
        this.setData({
          glStatus: false,
          qjStatus: false,
          dqStatus: false,
          rkStatus: true,
          hxStatus: false,
          agStatus: false
        })
        break;
      case '化学专业':
        this.setData({
          glStatus: false,
          qjStatus: false,
          dqStatus: false,
          rkStatus: false,
          hxStatus: true,
          agStatus: false
        })
        break;
      case '燃料专业':
        this.setData({
          glStatus: false,
          qjStatus: false,
          dqStatus: false,
          rkStatus: false,
          hxStatus: false,
          agStatus: true
        })
        break;
    }
    this.getEnglishChinese(id, this.data.inputVal)
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  inputSearch:function (e) {
    let queryName = e.detail.value
    let professionType = "";
    if (this.data.glStatus){
      professionType = "锅炉专业"
    }
    else if (this.data.qjStatus) {
      professionType = "汽机专业"
    }
    else if (this.data.dqStatus) {
      professionType = "电气专业"
    }
    else if (this.data.rkStatus) {
      professionType = "热控专业"
    }
    else if (this.data.hxStatus) {
      professionType = "化学专业"
    }
    else if (this.data.agStatus) {
      professionType = "安规专业"
    }
    if (this.data.inputVal == ""){
      this.setData({
        inputVal:' '
      })
    }else{
      this.data.inputVal = this.data.inputVal.replace(/^\s*/, '');
      this.setData({
        inputVal: this.data.inputVal
      })
    }
    this.getEnglishChinese(professionType, queryName);
    console.log(queryName)
  },
  getEnglishChinese(professionType, queryName) {
    app.agriknow.getEnglishChinese({ ProfessionType: professionType, QueryName: queryName })
      .then(res => {
        if (res.status && res.result) {
          this.setData({
            list: res.result.Data
          })
        } else {
          wx.showToast({
            title: res.result.Message,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
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