/**
 * name: agriknow.js
 * description: 服务器提供的服务
 * author: xiazhizhou
 * date: 2018-11-21
 */
import request from './request.js';
import IsWW from '../config.js';

class agriknow {
  constructor() {
    this._baseUrl = `${IsWW.requestUrl}/FuelProfession/`,
    this._baseUrl2 = `${IsWW.requestUrl}/Compute/`,
    this._userUrl = `${IsWW.requestUrl}/Account/`,
    this.examUrl = `${IsWW.requestUrl}/Exam/`,
    this.ranking = `${IsWW.requestUrl}/Ranking/`,
    this.system = `${IsWW.requestUrl}/System/`,
    this.translate = `${IsWW.requestUrl}/Translate/`,
    this.news = `${IsWW.requestUrl}/News/`,
    this._request = new request,
    this.errorToast = false,
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    let msg = '请求超时，请检查你的网络', status = res.status;
    if (status === 0) {
      msg = '请求失败，请检查你的网络';
    } else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    } else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    }
    if (!this.errorToast) {
      this.errorToast = true;
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      setTimeout(() => {
        this.errorToast = false;
      }, 2000)
    }
  }
  /**
   * 查询专业列表
   */
  getFuelProfessionList(item) {
    let url = `${this._baseUrl}GetFuelProfessionList`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 根据类别获取小知识列表 GET /actionapi/FuelProfession/
   */
  getFuelKnowledgeListByType(item) {
    let url = `${this._baseUrl}GetFuelKnowledgeListByType`;
    return this._request.getRequest(url, item).then(res => res.data)
  }

  /**
   * 根据模块名称获取专业列表
   */
  getFuelProfessionListByName(item) {
    let url = `${this._baseUrl}GetFuelProfessionListByName`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 根据父ID查询常用图符下级页面数据
   */
  getIconChildPageInfo(item) {
    let url = `${this._baseUrl}GetIconChildPageInfo`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //根据父ID和名称模糊查询图符
  getIconByPidAndName(item) {
    let url = `${this._baseUrl}GetIconByPidAndName`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //根据父ID和名称模糊查询图符
  computeByInputsAndType(item) {
    let url = `${this._baseUrl2}ComputeByInputsAndType`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //获取用户唯一标识
  getRequestWXUrl(item) {
    let url = `${this.system}GetRequestWXUrl`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //保存用户
  saveOrUpdateUserAccount(item) {
    let url = `${this._userUrl}SaveOrUpdateUserAccount`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //用户登录
  loginUserAccount(item) {
    let url = `${this._userUrl}LoginUserAccount`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //用户分享
  sharing(item) {
    let url = `${this._userUrl}Sharing`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //用户签到
  signIn(item) {
    let url = `${this._userUrl}SignIn`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //喜欢开发
  likeDeveloper(item) {
    let url = `${this._userUrl}LikeDeveloper`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //喜欢开发者人数
  getLikeDeveloperNumbers(item) {
    let url = `${this._userUrl}GetLikeDeveloperNumbers`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //保存留言信息
  saveUserRegisterMessage(item) {
    let url = `${this._userUrl}SaveUserRegisterMessage`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //获取留言信息
  getUserRegisterMessage(item) {
    let url = `${this._userUrl}GetUserRegisterMessage`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取相同电厂用户
  getUserAccountBySameOrganization(item) {
    let url = `${this._userUrl}GetUserAccountBySameOrganization?organization=${item}`;
    return this._request.postRequest(url).then(res => res.data)
  }
  /**
   * 获取使用人数
   */
  getCurrentUserNumbers(item){
    let url = `${this._userUrl}GetCurrentUserNumbers`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 题库容器
   */
  //精英赛获取所有题目
  acquireClassExam(item) {
    let url = `${this.examUrl}AcquireClassExam`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //精英赛提交答案
  saveClassExam(item) {
    let url = `${this.examUrl}SaveClassExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //保存题目
  saveOrUpdateExamQuestion(item) {
    let url = `${this.examUrl}SaveOrUpdateExamQuestion`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 获取练习题目
   */
  acquireTraingExam(item) {
    let url = `${this.examUrl}AcquireTraingExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 精英杯赛后练习
   */
  acquireHistoryClassExam(item) {
    let url = `${this.examUrl}AcquireHistoryClassExam`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 展示实时的排序
   */
  listMatchRanking(item) {
    let url = `${this.ranking}ListMatchRanking`;
    return this._request.postRequest(url, item).then(res => res.data)
  }

  /**
   * 用户个人排名
   */
  listAccountRanking(item) {
    let url = `${this.ranking}ListAccountRanking`;
    return this._request.getRequest(url, item).then(res => res.data)
  }

  /**
   * 获取竞赛模式接口
   */
  //获取竞赛模式题目
  acquireCompetitionExam(item) {
    let url = `${this.examUrl}AcquireCompetitionExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 获取竞赛模式接口
   */
  //竞赛提交答案
  saveCompetitionExam(item) {
    let url = `${this.examUrl}SaveCompetitionExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }

  /**
   * 获取随机模式接口
   */
  //获取随机题目
  acquireRandomExam(item) {
    let url = `${this.examUrl}AcquireRandomExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  //保存随机题目
  saveRandomExam(item) {
    let url = `${this.examUrl}SaveRandomExam`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 获取所有收藏的题目
   */
  acquireCollectPairs(item) {
    let url = `${this.examUrl}AcquireCollectPairs`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 获取收藏题目
   */
  acquireCollectQuestionPairs(item) {
    let url = `${this.examUrl}AcquireCollectQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  
  /**
   * 获取所有的错误题目
   */
  acquireErrorPairs(item) {
    let url = `${this.examUrl}AcquireErrorPairs`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  /**
   * 获取错误题目
   */
  acquireErrorQuestionPairs(item) {
    let url = `${this.examUrl}AcquireErrorQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 保存收藏题目
   */
  saveCollectQuestionPairs(item) {
    let url = `${this.examUrl}SaveCollectQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 保存错误题目
   */
  saveErrorQuestionPairs(item) {
    let url = `${this.examUrl}SaveErrorQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 删除收藏题目
   */
  deleteCollectQuestionPairs(item) {
    let url = `${this.examUrl}DeleteCollectQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  /**
   * 删除错误题目
   */
  deleteErrorQuestionPairs(item) {
    let url = `${this.examUrl}DeleteErrorQuestionPairs`;
    return this._request.postRequest(url, item).then(res => res.data)
  }
  
  /**
   * 辅助功能
   */
  //获取更新日志
  getSystemUpdate(item) {
    let url = `${this.system}GetSystemUpdate`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取精英赛题库规则说明
  getClassesExamRuleDescription(item) {
    let url = `${this.system}GetClassesExamRuleDescription`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取竞赛题库规则说明
  getCompetitionExamRuleDescription(item) {
    let url = `${this.system}GetCompetitionExamRuleDescription`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取练习题库规则说明 
  getTraingExamRuleDescription(item) {
    let url = `${this.system}GetTraingExamRuleDescription`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取随机题库规则说明
  getRandomExamRuleDescription(item) {
    let url = `${this.system}GetRandomExamRuleDescription`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取警告信息
  getAlertDescription(item) {
    let url = `${this.system}GetAlertDescription`;
    return this._request.getRequest(url, item).then(res => res.data)
  }
  //获取指定url数据
  getRequestUrlByties(item) {
    let url = `${this.system}GetRequestUrlByties?url=${item}`;
    return this._request.postRequest(url).then(res => res.data)
  }
  /**
   * 专业英语
   */
  getEnglishChinese(item) {
    let url = `${this.translate}GetEnglishChinese`;
    return this._request.postRequest(url, item).then(res => res.data)
  }

  /**
   * 新闻
   */
  acquireNewsInfo(item) {
    let url = `${this.news}AcquireNewsInfo`;
    return this._request.postRequest(url, item).then(res => res.data)
  }

}
export default agriknow