// pages/profile/registers/registers.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxid:'',
    name:'',
    image:'',
    organization:''
  },
  bindKeyInput: function (e) {
    this.setData({
      organization: e.detail.value
    })
  },
  saveOrUpdateUserAccount(e){
    let item = {};
    item.WXId = this.data.wxid;
    item.Name = this.data.name;
    item.Image = this.data.image;
    item.Organization = this.data.organization;
    app.agriknow.saveOrUpdateUserAccount(item)
      .then(res => {
        if (res.status && res.result) {
          wx.showToast({
            title: '登记成功',
            icon: 'none'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.result.error,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.utils.storageRead("userInfo");
    if (userInfo) {
      this.setData({ wxid: userInfo.WXId, name: userInfo.Name, image: userInfo.Image, organization: userInfo.Organization });
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