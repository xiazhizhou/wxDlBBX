const app = getApp();
import IsWW from '../../config.js';
Page({
  data: {
    userInfo: null,
    item:{},
    max: 0,
    captchaImage: '../../../assets/images/xz.jpg'
  },
  onLoad: function (options) {
    var that = this;
    this.listAccountRanking();
    this.loginusercount();
  },
  listAccountRanking() {
    let userInfo = app.utils.storageRead("userInfo");
    app.agriknow.listAccountRanking({
      wxId: userInfo.WXId
    })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          let list = res.Data;
          var max = list[0].Score;
          for (var i = 0; i < list.length; i++) {
            if (max < list[i].Score) {
              max = list[i].Score
            }
          }
          this.setData({
            max: max
          })

        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  loginusercount(){
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
          }
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
      
  },
  onShow: function () {
    this.loginusercount();
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
});
