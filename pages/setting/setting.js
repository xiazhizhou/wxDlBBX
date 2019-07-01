// pages/setting/setting.js
//获取应用实例 也就是小程序App
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    last_scrollTop: 0,
    toView: 0,
    navActive: 0,
    lastActive: 0,
    s_height: '',
    height_arr: [],
    name: "",
    list: [],

    arrList: [],
    plateList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdataList();
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
    if (app.utils.storageRead("Config-defuil")) {
      let list = app.utils.storageRead("Config-defuil");
      this.setData({ zjarr: list });
    }
  },
  //专业列表
  getdataList() {
    app.agriknow.getFuelProfessionList({})
      .then(res => {
        if (res.status && res.result) {
          let list = res.result;
          this.setmenu(list);
          this.setStormenu(list);
          this.setData({
            list: list
          })
          console.log(this.data.list)
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
      .catch(res => {

      })
  },
  tap: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)

    this.setData({
      toView: index,
      navActive: index
    });
  },
  // 后台获取的菜单数组和缓存的数组菜单对比，相等给选中样式
  setStormenu(list) {
    if (app.utils.storageRead("Config-defuil")) {
      let arrList = app.utils.storageRead("Config-defuil");
      for (let item of list) {
        for (let it of item.ChildName) {
          for (var j = 0; j < arrList.length; j++) {
            var n = arrList[j].Icon;
            if (n == it.Icon) {
              it.$isChecked = false;
              this.setData({
                list: this.data.list
              })

            }
          }
        }
      }
    }
  },
  // 给获取的数据在加一个字段为$isCheck
  setmenu(list) {
    for (let item of list) {
      for (let it of item.ChildName) {
        it.$isChecked = true;
        it.Url = '/pages/index' + it.Url + '/' + it.Url.substring(6);
        it.Urls = it.Url + "?name=" + it.Name;
      }
    }
  },
  setActive(items) {
    for (let item of this.data.list) {
      for (let it of item.ChildName) {
        if (it.Icon == items.Icon) {
          it.$isChecked = true
          this.setData({
            list: this.data.list
          })
        }
      }
    }
  },
  itemClick(e) {
    let items = e.currentTarget.dataset.viewpoint;
    let check = this.getCheck(items);
    let arr = [];
    if (!check) {
      for (let item of this.data.list) {
        for (let it of item.ChildName) {
          if (it.Icon == items.Icon) {
            it.$isChecked = !it.$isChecked;
            this.setData({
              list: this.data.list
            })
            break;
          }
        }
      }
      if (app.utils.storageRead("Config-defuil")) {
        let arr = app.utils.storageRead("Config-defuil");
        if (arr.length >= 11) {
          wx.showToast({
            title: "最多只能添加11个菜单",
            icon: 'none'
          })
          this.setActive(items);
          return;
        } else {
          this.setData({
            arrList: arr
          })
          arr.push(e.currentTarget.dataset.viewpoint);
        }

      } else {
        if (this.data.arrList.length >= 11) {
          wx.showToast({
            title: "最多只能添加11个菜单",
            icon: 'none'
          })
          this.setActive(items);
          return
        } else {
          this.data.arrList.push(e.currentTarget.dataset.viewpoint);
        }
      }
    }
    app.utils.storageWrite("Config-defuil", this.data.arrList);
    if (app.utils.storageRead("Config-defuil")) {
      let list = app.utils.storageRead("Config-defuil");
      this.setData({ zjarr: list });
    }
  },
  getCheck(items) {
    let check = false;
    if (app.utils.storageRead("Config-defuil")) {
      let arrList = app.utils.storageRead("Config-defuil");
      for (let i = 0; i < arrList.length; i++) {
        if (arrList[i].Icon == items.Icon) {
          check = true;
          arrList.splice(i, 1)
          this.setData({
            arrList: arrList
          })
          this.setActive(items);
        }
      }
    }
    return check;
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
    this.getdataList();
    wx.stopPullDownRefresh(); //停止当前页面下拉刷新滚动
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