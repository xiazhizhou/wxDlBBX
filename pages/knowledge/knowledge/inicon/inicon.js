// pages/knowledge/knowledge/inicon/inicon.js
//获取应用实例 也就是小程序App
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    listArr: [],
    id: "",
    is_loadmore: false,
    status:[true,false,false]
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
          list.forEach(item => {
            item.status = false;
          })
          this.setData({
            list: list
          })
          this.getInitdata(list[0].ID);
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
  //工程流程图符 
  getFlowchart(event){
    var arr = [];
    for (var i = 0; i < this.data.list.length; i++){
      if (this.data.list[i].ID == event.currentTarget.id){
        arr[i] = true;
      }else{
        arr[i] = false;
      }
      this.setData({
        status: arr
      })
    }
    this.getInitdata(event.currentTarget.id);
  },
  //根据父ID查询常用图符下级页面数据
  getInitdata(id) {
    app.agriknow.getIconChildPageInfo({ pId: id })
      .then(res => {
        this.setData({ is_loadmore: false });
        if (res.status && res.result) {
          let list = res.result;
          this.setData({
            listArr: list
          })
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
  // 重载事件
  _reload() {
    app.onLaunch();
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