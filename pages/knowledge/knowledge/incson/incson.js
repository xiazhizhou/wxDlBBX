// pages/knowledge/knowledge/incson/incson.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list2: [],
    list3:[],
    list4:[],
    powerStatus: true,
    elecStatus: false,
    pressureStatus: false,
    swStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: options.name
    })
    let list = [
      { code: "220J", value: "1800",txt:"2000",color: "" },
      { code: "110", value: "950", txt: "1000",color: "" },
      { code: "110J", value: "850", txt: "900",color: "" },
      { code: "60", value: "550", txt: "550",color: "" },
      { code: "35", value: "300", txt: "300",color: "" },
      { code: "20", value: "180", txt: "180",color: "" },
      { code: "15", value: "150", txt: "150",color: "" },
      { code: "10", value: "125", txt: "125",color: "" },
      { code: "6", value: "100", txt: "100",color: "" },
      { code: "1-3", value: "75", txt: "75",color: "" },
      { code: "0.4", value: "20", txt: "20",color: "" },
      { code: "符号(颜色)", value: "A1", txt: "A2", color: "#0099ff", colorh: "#fb667a" },
      { code: "图号.4", value: "3.1.14-1", txt: "3.1.14-1", color: "#0099ff", colorh: "#fb667a" }
    ]
    let list2 = [
      { code: "220J", value: "2550", txt: "1900",kv:"4100",kv2:"3600",kv3:"5500"},
      { code: "110", value: "1700", txt: "1050",kv: "3250", kv2: "2650", kv3: "5000"},
      { code: "110J", value: "1600", txt: "950",kv: "3150", kv2: "2650", kv3: "5000"},
      { code: "60", value: "1300", txt: "650", kv: "2850", kv2: "2350", kv3: "4500"},
      { code: "35", value: "1050", txt: "400", kv: "2600", kv2: "2100", kv3: "4000"},
      { code: "20", value: "930", txt: "280", kv: "2480", kv2: "1380", kv3: "4000"},
      { code: "15", value: "900", txt: "250", kv: "2450", kv2: "1950", kv3: "4000"},
      { code: "10", value: "875", txt: "225", kv: "2425", kv2: "1925", kv3: "4000"},
      { code: "6", value: "850", txt: "200", kv: "2400", kv2: "1900", kv3: "4000"},
      { code: "1-3", value: "825", txt: "175", kv: "2375", kv2: "1875", kv3: "4000"},
      { code: "0.4", value: "800", txt: "100", kv: "2300", kv2: "1875", kv3: "3650"}
    ]
    let list3 = [
      { code: "750J", value: "5600/5950", txt: "7200/8000", kv: "6250/6700"},
      { code: "500", value: "3800", txt: "4300", kv: "4050"},
      { code: "330J", value: "2500", txt: "2800", kv: "3250"},
      { code: "220J", value: "1800", txt: "2000", kv: "2250"},
      { code: "110", value: "1000", txt: "1100", kv: "1750"},
      { code: "110J", value: "900", txt: "1000", kv: "1650"},
      { code: "60", value: "650", txt: "650", kv: "1400"},
      { code: "35", value: "400", txt: "400", kv: "1150"},
      { code: "1.5-20", value: "300", txt: "300", kv: "1050"},
      { code: "1-10", value: "200", txt: "200", kv: "950"},
      { code: "0.4", value: "75", txt: "75", kv: "825"}
    ]
    let list4 = [
      { code: "750J", value: "5600/5950", txt: "1200/1200", kv: "7500/7950" },
      { code: "500", value: "3900", txt: "7500", kv: "5800" },
      { code: "330J", value: "2600", txt: "5000", kv: "4500" },
      { code: "220J", value: "1900", txt: "4300", kv: "3800" },
      { code: "110", value: "1100", txt: "3500", kv: "3000" },
      { code: "110J", value: "1000", txt: "3400", kv: "2900" },
      { code: "60", value: "750", txt: "3100", kv: "2600" },
      { code: "35", value: "500", txt: "2900", kv: "2400" },
      { code: "1.5-20", value: "400", txt: "2800", kv: "2300" },
      { code: "1-10", value: "300", txt: "2700", kv: "2200" },
      { code: "0.4", value: "175", txt: "2500", kv: "2000" }
    ]
    this.setData({
      list: list
    });
    this.setData({
      list2: list2
    });
    this.setData({
      list3: list3
    });
    this.setData({
      list4: list4
    });
  },
  // 选项卡切换
  switchTab(event) {
    switch (event.currentTarget.id) {
      case 'power':
        this.setData({ powerStatus: true });
        this.setData({ elecStatus: false });
        this.setData({ pressureStatus: false });
        this.setData({ swStatus: false });
        break;
      case 'electricity':
        this.setData({ elecStatus: true });
        this.setData({ powerStatus: false });
        this.setData({ pressureStatus: false });
        this.setData({ swStatus: false });
        break;
      case 'pressure':
        this.setData({ pressureStatus: true });
        this.setData({ powerStatus: false });
        this.setData({ elecStatus: false });
        this.setData({ swStatus: false });
        break;
      case 'sw':
        this.setData({ swStatus: true });
        this.setData({ pressureStatus: false });
        this.setData({ powerStatus: false });
        this.setData({ elecStatus: false });
        break;
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