/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "14592619.qcloud.la"

var config = {

    // 下面的地址配合云端 Server 工作
    host,
    // 登录地址，用于建立会话
    loginUrl: `https://${host}/login`,

    // 正式的请求地址，用于测试会话
    //requestUrl: "http://172.168.1.219/DLBBX/actionapi",
    requestUrl: "https://www.bsh-tech.com/dlbbx/actionapi",
    requestImgUrl: "https://www.bsh-tech.com/dlbbx",
   //requestImgUrl: "http://172.168.1.219/DLBBX",    // 用code换取openId
    openIdUrl: `https://${host}/openid`,

    // 测试的信道服务接口
    tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `https://${host}/static/weapp.jpg`
};

module.exports = config
