// pages/knowledge/knowledge/tronic/tronic.js
//获取应用实例 也就是小程序App
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:"",
    is_loadmore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getdataList(options.id);
  },
  //电子元件图符
  getdataList(id) {
    app.agriknow.getIconChildPageInfo({ pId: id })
      .then(res => {
        this.setData({ is_loadmore: false });
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
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
      .catch(res => {
        this.setData({ is_loadmore: true });
      })
  },
  // 重载事件
  _reload() {
    app.onLaunch();
    // wx.reLaunch({
    //   url: '/pages/index/more/more',
    // })
    this.getdataList(this.data.id);
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
    this.getdataList(this.data.id);
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