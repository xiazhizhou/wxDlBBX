// pages/profile/collectMy/collectMy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    wxid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wxinfo = app.utils.storageRead("wxinfo");
    if (wxinfo) {
      this.setData({ wxid: wxinfo.WXId });
    }
    this.acquireCollectPairs();
  },
  //获取所有收藏的题目
  acquireCollectPairs() {
    let wxid = this.data.wxid;
    app.agriknow.acquireCollectPairs({ WXId: wxid })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let item = res.Data;
          this.setData({
            list: item
          })
          console.log(this.data.list)
        } else {
          wx.showToast({
            title: res.Message,
            icon: 'none'
          })
        }
      })
  },
  delete(e) {
    let that = this;
    let questions = e.currentTarget.dataset.viewpoint;
    let wxid = this.data.wxid;
    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          app.agriknow.deleteCollectQuestionPairs({ WXId: wxid, Questions: questions })
            .then(res => {
              if (res.IsSuccess && res.Data) {
                wx.showToast({
                  title: "删除成功",
                  icon: 'none'
                })
                that.acquireCollectPairs();
              } else {
                wx.showToast({
                  title: res.Message,
                  icon: 'none'
                })
              }
            })
        }
      }
    });
  },
  practice(e){
    let specialty = e.currentTarget.dataset.viewpoint;
    wx.navigateTo({
      url: `/pages/profile/collectMy/collectLx/collectLx?specialty=${specialty}`
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
    this.acquireCollectPairs();
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