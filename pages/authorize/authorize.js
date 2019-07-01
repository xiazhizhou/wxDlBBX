const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    screenWidth: 0,
    screenHeight: 0,
    imgwidth: 0,
    imgheight: 0,
    is_loadmore: false,
    code: ""
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.screenHeight,
          screenWidth: res.screenWidth
        });
      }
    });
    //验证登录是否过期
    wx.checkSession({
      success: function (res) {
        console.log("处于登录态");
        wx.login({
          success: function (res) {
            that.setData({ code: res.code });
          }
        })
      },
      fail: function (res) {
        console.log("需要重新登录");
        wx.login({
          success: function (res) {
            that.setData({ code: res.code });
          }
        })
      }
    })
  },
  
  image_to_base(img) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: img,
        success(res) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              resolve(res.data)
            }
          })
        }
      })
    })
  },
  //获取用户唯一标识
  getInfo(code) {
    app.agriknow.getRequestWXUrl({ requestUrl: code })
      .then(res => {
        if (res.status){
          let items = JSON.parse(res.result.Data)
          if (items.errcode){
            wx.showToast({
              title: "获取登录凭证失败",
              icon: 'none'
            })
          }else{
            //插入登录的用户的相关信息到数据库
            let item = {};
            item.WXId = items.openid;
            item.Name = app.globalData.userInfo.nickName;
            app.utils.storageRemove("wxinfo");
            app.utils.storageWrite("wxinfo", item);
            app.agriknow.getRequestUrlByties(app.globalData.userInfo.avatarUrl)
              .then(res => {
                if (res.status && res.result) {
                  item.Image = res.result.Data;
                  app.agriknow.saveOrUpdateUserAccount(item)
                    .then(res => {
                      if (res.status && res.result) {
                        wx.showToast({
                          title: '用户授权成功',
                          icon: 'none'
                        })
                        this.queryUsreInfo(item.WXId);
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
                  //授权成功后，跳转进入小程序首页
                  wx.switchTab({
                    url: '/pages/index/index'
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
          }
        }
      })
      .catch(res => {
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })
      })
  },
  bindGetUserInfo: function (e) {
    let that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      this.getInfo(this.data.code);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
           // that.getInfo(that.data.code);
          }
        }
      })
    }
  },
  queryUsreInfo(wxid){
    app.agriknow.loginUserAccount({
      wxId: wxid
    })
      .then(res => {
        if (res.status && res.result) {
          if (res.result.IsSuccess) {
            app.globalData.userInfo = res.result.Data;
            app.utils.storageWrite("userInfo", app.globalData.userInfo);
          }
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