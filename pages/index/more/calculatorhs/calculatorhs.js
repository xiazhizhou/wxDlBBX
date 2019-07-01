// pages/index/more/calculatorhs/calculatorhs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    degree: "",
    degreeValue: "",
    kcal: "",
    kcalValue: "",
    bbmt: "",
    bbmtValue: "",
    kcal1: "",
    kcalValue1: "",
    celsius: "",
    celsiusValue: "",
    hoValue: "",
    kpa: "",
    hgValue: "",
    kpa1: "",
    mbarValue: "",
    mbar: "",
    lbValue: "",
    lb: "",
    inchValue: "",
    inch: "",
    soValue: "",
    so: "",
    noValue: "",
    no: "",
    noxValue: "",
    nox: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 单位转化的值
  bindKeyInput(e) {
    let id = e.target.dataset.id;
    console.log(id)
    switch (id) {
      case "1":
        let degree = e.detail.value;
        this.setData({
          degree: degree
        })
        break;
      case "2":
        let kcal = e.detail.value;
        this.setData({
          kcal: kcal
        })
        break;
      case "3":
        let bbmt = e.detail.value;
        this.setData({
          bbmt: bbmt
        })
        break;
      case "4":
        let kcal1 = e.detail.value;
        this.setData({
          kcal1: kcal1
        })
        break;
      case "5":
        let celsius = e.detail.value;
        this.setData({
          celsius: celsius
        })
        break;
      case "6":
        let kpa = e.detail.value;
        this.setData({
          kpa: kpa
        })
        break;
      case "7":
        let kpa1 = e.detail.value;
        this.setData({
          kpa1: kpa1
        })
        break;
      case "8":
        let mbar = e.detail.value;
        this.setData({
          mbar: mbar
        })
        break;
      case "9":
        let lb = e.detail.value;
        this.setData({
          lb: lb
        })
        break;
      case "10":
        let inch = e.detail.value;
        this.setData({
          inch: inch
        })
        break;
      case "11":
        let so = e.detail.value;
        this.setData({
          so: so
        })
        break;
      case "12":
        let no = e.detail.value;
        this.setData({
          no: no
        })
        break;
      case "13":
        let nox = e.detail.value;
        this.setData({
          nox: nox
        })
        break;
    }
  },
  result(e) {
    let id = e.target.dataset.id;
    console.log(id)
    switch (id) {
      case "1":
        let degreeValue = Number(this.data.degree * 3600).toFixed(3);
        this.setData({
          degreeValue: degreeValue
        })
        break;
      case "2":
        let kcalValue = Number(this.data.kcal * 4186).toFixed(3);
        this.setData({
          kcalValue: kcalValue
        })
        break;
      case "3":
        let bbmtValue = Number(this.data.bbmt * 1.163).toFixed(3);
        this.setData({
          bbmtValue: bbmtValue
        })
        break;
      case "4":
        let kcalValue1 = Number(this.data.kcal1 * 1057).toFixed(3);
        this.setData({
          kcalValue1: kcalValue1
        })
        break;
      case "5":
        let celsiusValue = (Number(this.data.celsius) + Number(273.15)).toFixed(3);
        this.setData({
          celsiusValue: celsiusValue
        })
        break;
      case "6":
        let hoValue = Number(this.data.kpa * 6.894757).toFixed(3);
        this.setData({
          hoValue: hoValue
        })
        break;
      case "7":
        let hgValue = Number(this.data.kpa1 * 7.50062).toFixed(3);
        this.setData({
          hgValue: hgValue
        })
        break;
      case "8":
        let mbarValue = Number(this.data.mbar * 10.197162).toFixed(3);
        this.setData({
          mbarValue: mbarValue
        })
        break;
      case "9":
        let lbValue = Number(this.data.lb * 0.453592).toFixed(3);
        this.setData({
          lbValue: lbValue
        })
        break;
      case "10":
        let inchValue = Number(this.data.inch * 25.4).toFixed(3);
        this.setData({
          inchValue: inchValue
        })
        break;
      case "11":
        let soValue = Number(this.data.so * 2.86).toFixed(3);
        this.setData({
          soValue: soValue
        })
        break;
      case "12":
        let noValue = Number(this.data.no * 1.34).toFixed(3);
        this.setData({
          noValue: noValue
        })
        break;
      case "13":
        let noxValue = Number(this.data.nox * 2.05).toFixed(3);
        this.setData({
          noxValue: noxValue
        })
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