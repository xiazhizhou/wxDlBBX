//app.js
import agriknow from './apis/agriknow.js'
import Utils from './utils/util';
App({
  agriknow: new agriknow(),
  utils: new Utils(),
  //小程序启动之后 触发
  onLaunch: function (opts) {
    let that = this;
    // 展示本地存储能力
    let wxinfo = that.utils.storageRead("wxinfo");
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if(wxinfo){
                that.agriknow.loginUserAccount({
                  wxId: wxinfo.WXId
                })
                  .then(res => {
                    if (res.status && res.result) {
                     // console.log(res.result)
                      if (res.result.IsSuccess) {
                        that.globalData.userInfo = res.result.Data;
                        that.utils.storageRemove("userInfo");
                        that.utils.storageWrite("userInfo", that.globalData.userInfo);
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
              }
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/authorize/authorize'
          })
        }
        
      }
    })
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
    //urlPath: "https://www.baidu.com/",
    about: '此项目长期维护，如果有需要的可以在github自行下载，感觉还不错可以给作者star',
    openid: ''
  },
  //生命周期回调—监听小程序显示  小程序启动，或从后台进入前台显示时
  onShow: function () {
    console.log('App Show')
  },
  //生命周期回调—监听小程序隐藏 小程序从前台进入后台时
  onHide: function () {
    console.log('App Hide')
  },
  //错误监听函数
  onError: function () {
    console.log('App Error')
  },
  //页面不存在监听函数
  onPageNotFound: function () {
    console.log('App PageNotFound')
  },
  globalData: {
    hasLogin: false
  }
})