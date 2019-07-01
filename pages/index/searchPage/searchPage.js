// pages/index/searchPage/searchPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    arrList: [],
    list: []
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
  getFuelProfessionListByName(value){
    app.agriknow.getFuelProfessionListByName({ name: value })
      .then(res => {
        if (res.status && res.result) {
          console.log(res.result)
          let list = res.result;
          let lists = [];
          list.forEach(item => {
            if (item.Url == null || item.Url == ""){
              lists.push();
              return;
            }
            item.Url = '/pages/index' + item.Url + '/' + item.Url.substring(6);
            item.Urls = item.Url + "?name=" + item.Name;
            lists.push(item);
          })
          this.setData({
            list: lists
          })
          console.log(this.data.list)
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  delet(e){
    console.log(e);
    app.utils.storageRemove("config-list");
    this.setData({
      arrList: []
    })
  },
  /**
   * 数组元素去重
   */
  unique1(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  },
  inputSearch: function (e) {
    this.getFuelProfessionListByName(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arrList = app.utils.storageRead("config-list");
    if (arrList) {
      this.setData({
        arrList: arrList
      })
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