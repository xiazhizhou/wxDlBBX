// pages/specialty/specialty.js
//获取应用实例 也就是小程序App
const app = getApp()
import { Utils } from '../../../utils/util';

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
    name:"",
    list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdataList();
    var s_height = wx.getSystemInfoSync().windowHeight;
    this.setData({ s_height: s_height });
  },
  //专业列表
  getdataList() {
    app.agriknow.getFuelProfessionList({})
      .then(res => {
        if (res.status && res.result){ 
          let list = res.result;
          for (let i = 0; i < list.length; i++){
            list[i].ChildName.forEach(item =>{
              item.Url = '/pages/index'+item.Url+'/'+item.Url.substring(6);
              item.Urls = item.Url + "?name=" +item.Name;
            })
          }
          this.setData({
            list: list
          })
          console.log(list)
        }else{
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