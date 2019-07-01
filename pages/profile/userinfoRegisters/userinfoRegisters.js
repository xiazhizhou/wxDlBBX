// pages/profile/userinfoRegisters/userinfoRegisters.js
const app = getApp();
import IsWW from '../../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    list:[],
    item:{},
    captchaImage: '../../../assets/images/xz.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.loginusercount();
  },
  loginusercount() {
    var that = this;
    let userInfo = app.utils.storageRead("userInfo");
    app.agriknow.loginUserAccount({
      wxId: userInfo.WXId
    })
      .then(res => {
        if (res.status && res.result) {
          if (res.result.IsSuccess) {
            let item = res.result.Data;
            item.ImageUrl = IsWW.requestImgUrl + item.ImageUrl.replace(/\\/g, "/");
            this.setData({
              item: item
            })
            that.getUserAccountBySameOrganization(item.Organization)
          }
        } else {
          wx.showToast({
            title: res.result.error,
            icon: 'none'
          })
        }
      })
  },
  setting(e){
    wx.navigateTo({
      url: '/pages/profile/registers/registers'
    })
  },
  getUserAccountBySameOrganization(Organization) {
    var that = this;
    app.agriknow.getUserAccountBySameOrganization(Organization)
      .then(res => {
        if (res.status && res.result) {
          if (res.result.IsSuccess) {
            let item = res.result.Data;
            item.forEach(it => {
              it.ImageUrl = IsWW.requestImgUrl + it.ImageUrl.replace(/\\/g, "/");
            })
            this.setData({
              list: item
            })
          }
        } else {
          wx.showToast({
            title: res.result.error,
            icon: 'none'
          })
        }
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
    this.loginusercount();
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