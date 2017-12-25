/**
 * Created by yangyang on 2017/11/30.
 */
import AV from '../utils/av-weapp-min'

export default class pay {
  static DEAL_TYPE = {
    VOTE_PAY: 1,      // 活动支付
    RECHARGE: 2,      // 用户充值
    WITHDRAW: 3,      // 提现
    BUY_GIFT: 4,      // 购买礼品
    VOTE_PROFIT: 5,   // 活动收益
    AGENT_PAY: 6,     // 成为代理
    INVITE_AGENT: 7,  // 邀请代理收益
  }
  
  static WALLET_PROCESS_TYPE = {
    NORMAL_PROCESS: 0,      // 正常状态
    WITHDRAW_PROCESS: 1,    // 正在提现
  }
  
  static WITHDRAW_STATUS = {
    APPLYING: 1,      // 提交申请
    DONE: 2,          // 处理完成
  }
  
  static WITHDRAW_APPLY_TYPE = {
    PROFIT: 1,        // 服务单位和投资人申请收益取现
  }
  
  static async reqPayment(payload) {
    let params = {
      amount: payload.amount,
      channel: 'wx_lite',
      metadata: payload.metadata || {},
      openid: payload.openid,
      subject: payload.subject
    }
    let charge = await AV.Cloud.run('payCreatePaymentRequest', params)
    return charge
  }
  
  static async reqPayWithBalance(payload) {
    let params = {
      amount: payload.amount,
      dealType: payload.dealType,
      metadata: payload.metadata
    }
    return await AV.Cloud.run('payWithWalletBalance', params)
  }
  
  static async fetchWallet() {
    return await AV.Cloud.run('payGetWalletInfo')
  }
  
  static async fetchUserDealRecords(payload) {
    let params = {
      lastTime: payload.lastTime,
      limit: payload.limit
    }
    return await AV.Cloud.run('payFetchUserDealRecords', params)
  }
  
  static async reqWithdrawApply(payload) {
    let params = {
      amount: payload.amount,
      channel: 'wx_lite',
      applyType: pay.WITHDRAW_APPLY_TYPE.PROFIT
    }
    return await AV.Cloud.run('payCreateWithdrawApply', params)
  }
  
  static async getLastWithdrawApply() {
    return await AV.Cloud.run('payFetchUserLastWithdrawApply')
  }
  
  static async isAgentPayEnable() {
    return await AV.Cloud.run('payEnableAgentPay')
  }
  
  static async fetchAgentPrice() {
    return await AV.Cloud.run('payGetAgentPrice')
  }
}