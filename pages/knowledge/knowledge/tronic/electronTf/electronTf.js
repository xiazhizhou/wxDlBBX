// pages/knowledge/knowledge/tronic/electronTf/electronTf.js
//获取应用实例 也就是小程序App
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    shop:[],
    is_loadmore: false,
    id: "",
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
    this.setData({
      id: options.id
    })
    this.setData({
      name: options.name
    })
    this.getdataList(options.id, options.name);
  },
  //专业列表
  getdataList(id,name) {
    app.agriknow.getIconByPidAndName({ pId: id, name: name })
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.status && res.result) {
          let list = res.result;
          this.setData({
            list: list
          })
          for(var i = 0;i < list.length; i++){
            this.data.shop.push(list[i].IMG)
          }
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        this.setData({ is_loadmore: true });
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 重载事件
  _reload() {
    app.onLaunch();
    this.getdataList(this.data.id,this.data.name);
  },
  previewHandle(e) {
    console.log(e)
    wx.previewImage({
      current: e.target.dataset.src.IMG,
      urls: this.data.shop
    })
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