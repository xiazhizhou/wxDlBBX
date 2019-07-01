//index.js
//获取应用实例 也就是小程序App
const app = getApp();
// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    status: "1",
    userNumbers:null,
    id: "54FB139179E84710A9720DFC7E1D6C39",
    hidden: false,
    content:[],
    isArr:false,
    contentStr:"",
    likeDevelopers:false,
    xzzStuats:false,
    jsyyStatus:false,
    cytfStatus:false,
    sbylStatus:false,
    fq:'',
    text:[],
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 14,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔
    pageIndex: 0,
    pageSize: 5,
    shops:[],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ //设置页面的标题
      title: "电力百宝箱"
    })
    if (options.fq !=undefined){
      this.setData({
        fq: options.fq
      })
    }
    this.getDefaultData();
    this.getCustomList();
    this.getCurrentUserNumbers();
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth
    });
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
    this.loadMore();
  },
  inputSearch(e){
    wx.navigateTo({
      url: '/pages/index/searchPage/searchPage'
    })
  },
  getCurrentUserNumbers(){
    let that = this;
    app.agriknow.getCurrentUserNumbers({ days: 10000 })
      .then(res => {
        if (res.status && res.result) {
          let msg = res.result.Data;
          that.setData({
            userNumbers: msg
          })
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  //设置首页默认菜单
  getDefaultData() {
    if (!(app.utils.storageRead("Config-defuil"))) {
      let plateList = [
        { Name: "汽机组效率", Icon: "BDTfont qjzxl", Color: "#23BBEA", Urls: "/pages/index/more/steamfic/steamfic?name=汽机组效率" },
        { Name: "过量空气系数", Icon: "BDTfont glkqxs", Color: "#F48222", Urls: "/pages/index/more/aircoe/aircoe?name=过量空气系数" },
        { Name: "漏风率", Icon: "BDTfont lfl", Color: "#009AFE", Urls: "/pages/index/more/rateout/rateout?name=漏风率" },
        { Name: "排污量", Icon: "BDTfont pwl", Color: "#DD455A", Urls: "/pages/index/more/discharge/discharge?name=排污量" },
        { Name: "凝汽器真空度", Icon: "BDTfont lqjzkd", Color: "#23BBEA", Urls: "/pages/index/more/condenser/condenser?name=凝汽器真空度" },
        { Name: "发电水耗", Icon: "BDTfont fdsh", Color: "#1AC165", Urls: "/pages/index/more/powerwater/powerwater?name=发电水耗" },
        { Name: "不同基准转换", Icon: "BDTfont btjzzh", Color: "#F48222", Urls: "/pages/index/more/datumconver/datumconver?name=不同基准转换" },
        { Name: "交流三相", Icon: "BDTfont jlsx", Color: "#1AC165", Urls: "/pages/index/more/threephase/threephase?name=交流三相" },
        { Name: "燃料NOX排量", Icon: "BDTfont rlNOX", Color: "#DD455A", Urls: "/pages/index/more/emission/emission?name=燃料NOX排量" },
        { Name: "差压流量计", Icon: "BDTfont cyllq", Color: "#23BBEA", Urls: "/pages/index/more/flowmeter/flowmeter?name=差压流量计" },
        { Name: "饱和压力", Icon: "BDTfont bhyl", Color: "#DD455A", Urls: "/pages/index/more/pressure/pressure?name=饱和压力" }
      ];
      app.utils.storageWrite("Config-defuil", plateList);
    }
    //this.getAlertDescription();
  },
  //获取用户菜单
  getCustomList() {
    if (app.utils.storageRead("Config-defuil")) {
      let list = app.utils.storageRead("Config-defuil");
      this.setData({ list: list });
    }
  },
  goBaidu: function (e) {
    switch (e.currentTarget.id) {
      case 'qdao':
        this.signIn();
        break;
      case 'sz':
        wx.navigateTo({
          url: '/pages/setting/setting'
        })
        break;
      case 'cal':
        wx.navigateTo({
          url: '/pages/index/more/more'
        })
        break;
      case 'gw':
        wx.navigateTo({
          url: '../out/out',
          success: function () {
            //成功后的回调；
          },
          fail: function () { },
          complete: function () { }
        })
        break;
      case 'icon':
        wx.navigateTo({
          url: '/pages/knowledge/knowledge/tronic/tronic?id=' + this.data.id
        })
        break;
      case 'phb':
        wx.navigateTo({
          url: '/pages/eliteExam/eliteExam'
        })
        break;
      case 'jsyy':
        wx.navigateTo({
          url: '/pages/index/more/more'
        })
        break;
      case 'zyyy':
        wx.navigateTo({
          url: '/pages/specialtyEnglish/specialtyEnglish'
        })
        break;
      case 'dzkfz': 
        if (this.data.likeDevelopers == false) {
          this.setData({ likeDevelopers: true });
        }else{
          this.setData({ likeDevelopers: false });
        }
        this.likeDeveloper();
        break;
      case 'wodliuy':
        wx.navigateTo({
          url: '/pages/question/guestbook/guestbook'
        })
        break;
    }
  },
  /**
   * 用户签到
   */
  signIn() {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
    }
    app.agriknow.signIn({ wxId: wxid })
      .then(res => {
        if (res.status && res.result) {
          let msg = res.result.Message;
          //msg.replace(msg.indexOf('<br/>'), '');
          
          this.setData({ contentStr: msg, title:'每日签到'});
          this.alert.showDialog();
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  //获取精英杯所有题目
  acquireClassExam() {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
    }
    app.agriknow.acquireClassExam({ wxId: wxid })
      .then(res => {
        if (res.IsSuccess && res.Data) {
          wx.navigateTo({
            url: '/pages/index/eliteCup/eliteCup'
          })
        } else {
          wx.navigateTo({
            url: '/pages/index/eliteCup/eliteCupSelected/eliteCupResult/eliteCupResult'
          })
        }
      })
  },
  /**
   * 更新提示信息
   */
  getAlertDescription(){
    app.agriknow.getAlertDescription({})
      .then(res => {
        if (res.status && res.result) {
          this.setData({
            text: res.result.Data
          })
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  // 跳转设置页面
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.alert = this.selectComponent("#alert");
  },
  _cancelEvent() {
    this.alert.hideDialog();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.utils.storageRead("Config-defuil")) {
      let list = app.utils.storageRead("Config-defuil");
      this.setData({ list: list });
    }
    setTimeout(function () {
      app.utils.slideupshow(this, 'slide_up', 0, 100)
    }.bind(this), 200);

    this.getCurrentUserNumbers();
  },
  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
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
  // 加载下一页数据
  loadMore() {
    if (!this.data.hasMore) return

    let { pageIndex, pageSize } = this.data
    const params = { PageIndex: ++pageIndex, PageSize: pageSize }

    app.agriknow.acquireNewsInfo({ PageSize: pageSize, PageIndex: pageIndex})
      .then(res => {
        if (res.status && res.result) {
          res.result.forEach(item => {
            item.imgUrlSub = item.RelativePath.substr(0, item.RelativePath.length-1);
            item.imgUrl = item.FixPath + item.imgUrlSub + "/" + item.FileName;
          })
          const totalCount = res.result.length;
          const hasMore = totalCount > 0?true:false;
          const shops = this.data.shops.concat(res.result)
          this.setData({ shops, pageIndex, hasMore })
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    // 重新加载数据
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore();
    this.getCurrentUserNumbers();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log('到底了，别拉了')
    // 在这里加载下一页的数据
    // 需要判断是否正在加载，否则会有多次触发问题
    this.loadMore()
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
          this.alert.showDialog();
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
      })
  },
  /**
  * 给开发人员点赞
  */
  likeDeveloper() {
    let wxinfo = app.utils.storageRead("wxinfo");
    let wxid = "";
    if (wxinfo) {
      wxid = wxinfo.WXId;
    }
    app.agriknow.likeDeveloper({ wxId: wxid, LikeDeveloper: this.data.likeDevelopers})
      .then(res => {
        if (res.status && res.result) {
          let msg = res.result.Message;
          this.setData({ contentStr: msg, title: '开发人员点赞' });
          this.alert.showDialog();
        } else {
          wx.showToast({
            title: res.error,
            icon: 'none'
          })
        }
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
  },
  /**
   * 跳转新闻详情
   */
  gotoNews(e){
    let item = e.currentTarget.dataset.viewpoint;
    let title = item.Title;
    let abstract = item.Abstract;
    let content = escape(item.Content);
    let imgUrl = item.imgUrl;
    wx.navigateTo({
      url: `/pages/index/newsItem/newsItem?Title=${title}&Abstract=${abstract}&content=${content}&imgUrl=${imgUrl}`
    })
  }
})