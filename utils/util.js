/**
 * name: util.js
 * description: 公用方法类
 * author: xiazhizhou
 * date: 2018-11-21
 */
class Utils {
  constructor() {
    this.dtime = "_deadtime"
  }
  /**
   * 时间格式化
   */
  formatTime(date, formatStr) {
    const fullyear = date.getFullYear() //获取完整的年份
    const year = date.getYear(); //获取当前年份(2位)  
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = date.getDay()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, fullyear);
    str = str.replace(/yy|YY/, (year % 100) > 9 ? (year % 100).toString() : '0' + (year % 100));
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);
    str = str.replace(/w|W/g, Week[week]);
    str = str.replace(/dd|DD/, day > 9 ? day.toString() : '0' + day);
    str = str.replace(/d|D/g, day);
    str = str.replace(/hh|HH/, hour > 9 ? hour.toString() : '0' + hour);
    str = str.replace(/h|H/g, hour);
    str = str.replace(/mm/, minute > 9 ? minute.toString() : '0' + minute);
    str = str.replace(/m/g, minute);
    str = str.replace(/ss|SS/, second > 9 ? second.toString() : '0' + second);
    str = str.replace(/s|S/g, second);
    return str;
  }
  /**
   * 
   */
  formatTimes(date) {
    const fullyear = date.getFullYear() //获取完整的年份
    const year = date.getYear(); //获取当前年份(2位)  
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = date.getDay()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return hour + "-" + minute + "-" + second;
  }

  /**
   * 将毫秒转化为时分秒
   */
  formatDuring(mss) {
    // var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  }
  /**
   * 将秒转化为时分秒
   */
  formatDuring(mss) {
    let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (mss % (1000 * 60)) / 1000;
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  }
  /**
   * 秒转化成时分秒
   */
  secondToDate(result) {
    let h = Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
  }
  /**
   * 秒转化成分
   */
  mToDate(result) {
    let m = Math.floor((result / 60));
    return result = m;
  }
  ShowCountDown(year, month, day, divname) {
    var now = new Date();
    var endDate = new Date(year, month - 1, day);
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6)); 
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
  }
  timeCountDown(result) {
    setInterval(function () {
      result = result - 1;
      let minute = parseInt(result / 60);
      let second = parseInt(result % 60);
      return result = minute+':'+second;
    }, 1000);
  }
  /**
   * 检查值为空
   * 
   * @param {any} value 值
   * @returns {boolean} 
   */
  isEmpty(value) {
    return value == null || typeof value === 'string' && value.length === 0;
  }

  /**
   * 检查值不为空
   * 
   * @pulic
   * @param {any} value 值
   * @returns {boolean} 
   * 
   * @memberOf Utils
   */
  isNotEmpty(value) {
    return !Utils.isEmpty(value);
  }

  /**
  * 本地存储设置值
  * 
  * @static
  * @param {string} key
  * @param {any} value
  * 
  * @memberOf Utils
  */
  storageWrite(key, value) {
    if (value) value = JSON.stringify(value);
    wx.setStorageSync(key, value);
  }

  /**
   * 本地存储读取值
   * 
   * @static
   * @param {string} key
   * @returns {T} 
   * 
   * @memberOf Utils
   */
  storageRead(key) {
    let value = wx.getStorageSync(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    } else {
      return null;
    }
  }

  /**
   * 本地存储删除值
   * 
   * @static
   * @param {string} key
   * 
   * @memberOf Utils
   */
  storageRemove(key) {
    wx.removeStorageSync(key);
  }

  /**
   * 本地存储删除所以值
   * 
   * @static
   * @param {string} key
   * 
   * @memberOf Utils
   */
  clearStorage(key) {
    wx.clearStorageSync();
  }

  //渐入，渐出实现 
  show(that, param, opacity) {
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }

  //滑动渐入渐出
  slideupshow(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }

  //向右滑动渐入渐出
  sliderightshow(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }

}
export default Utils
