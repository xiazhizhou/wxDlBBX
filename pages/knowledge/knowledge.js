// pages/knowledge/knowledge.js
//获取应用实例 也就是小程序App
const app = getApp()
import IsWW from '../../config.js';
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
    typeData: [],
    heightArr: [],
    containerH: 0,
    readyBoo:true,
    name: "",
    list4: [],
    list5: [],
    list6: [],
    list7: [],
    list8: [],
    list9: [],
    list10: [],
    list11: [],
    list2: [],
    list3: [],
    category: [],
    categorys: ['电力知识','发电流程','阀门','泵与风机','流量计','环保设备','液位计','压力表',
'控制原理','常用图符']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
    this.initialization();
    
  },
  ready(){
    let query = wx.createSelectorQuery().in(this);
    let heightArr = [];
    let s = 0;
    query.selectAll('.section').boundingClientRect((react) => {
      react.forEach((res) => {
        s += res.height;
        heightArr.push(s)
      });
      this.setData({
        heightArr: heightArr
      })
    });
    query.select('.content').boundingClientRect((res) => {
      //计算容器高度
      this.setData({
        containerH: res.height
      })
    }).exec()
  },
  scroll(e){
    this.setData({
      readyBoo:false
    })
    let scrollTop = e.detail.scrollTop;
    let scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length-1] - this.data.containerH){
      return;
    }else{
      for (let i = 0; i < scrollArr.length; i++){
        if (scrollTop >= 0 && scrollTop < scrollArr[0]){
          this.setData({
            toView: 0,
            navActive: 0
          });
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]){
          this.setData({
            toView: i,
            navActive: i
          });
        }
      }
    }
  },
  tap: function (e) {
    this.setData({
      readyBoo: true
    })
    var index = e.currentTarget.dataset.index;
    console.log(index)

    this.setData({
      toView: index,
      navActive: index
    });

  },
  /**
  * 
  * @param refresh 需要请求接口数据的异步操作
  * @param  
  */
  initialization() {
    Promise.all([
      this.getdataList(3),
      this.getdataList(4),
      this.getdataList(5),
      this.getdataList(6),
      this.getdataList(7),
      this.getdataList(8),
      this.getdataList(9),
      this.getdataList(10),
      this.getdataList(11),
      this.getdataList(2),
    ]).then(x => {
      this.setData({ is_loadmore: false });
    }).catch(x => {
      this.setData({ is_loadmore: true });
    })
  },
  //专业列表
  getdataList(type) {
    app.agriknow.getFuelKnowledgeListByType({ type: type })
      .then(res => {
        if (res.status && res.result) {
          let list = res.result;
          let category = [
            { categoryName: '电力知识' },
            { categoryName: '发电流程' },
            { categoryName: '阀门' },
            { categoryName: '泵与风机' },
            { categoryName: '流量计' },
            { categoryName: '环保设备' },
            { categoryName: '液位计' },
            { categoryName: '压力表' },
            { categoryName: '控制原理' },
            { categoryName: '常用图符' }
          ];
          if (type == 4) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list4: list
            })
          } else if (type == 5) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list5: list
            })
          } else if (type == 6) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list6: list
            })
          } else if (type == 7) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list7: list
            })
          } else if (type == 8) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list8: list
            })
            console.log(this.data.list8)
          } else if (type == 9) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list9: list
            })
          } else if (type == 10) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list10: list
            })
          } else if (type == 11) {
            list.forEach(item => {
              item.image = IsWW.requestImgUrl + item.URL;
              item.URL = '/pages/knowledge/knowledge/operating/operating';
              item.Urls = item.URL + "?name=" + item.NAME + "&img=" + item.image;
            })
            this.setData({
              list11: list
            })
          } else if (type == 2) {
            list.forEach(item => {
              item.URL = '/pages/knowledge' + item.URL + '/' + item.URL.substring(11);
              item.Urls = item.URL + "?name=" + item.NAME;
            })
            this.setData({
              list2: list
            })
          } else if (type == 3) {
            list.forEach(item => {
              if (item.URL == null) {
                return;
              }
              item.URL = '/pages/knowledge' + item.URL + '/' + item.URL.substring(11);
              item.Urls = item.URL + "?id=" + item.ID;
            })
            this.setData({
              list3: list
            })
          }
          category[0].ChildName = this.data.list2;
          category[1].ChildName = this.data.list4;
          category[2].ChildName = this.data.list5;
          category[3].ChildName = this.data.list6;
          category[4].ChildName = this.data.list7;
          category[5].ChildName = this.data.list8;
          category[6].ChildName = this.data.list9;
          category[7].ChildName = this.data.list10;
          category[8].ChildName = this.data.list11;
          category[9].ChildName = this.data.list3;
          this.setData({
            category: category
          })
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.ready();
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
    this.initialization();
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