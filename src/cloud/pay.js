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
      dealType: payload.dealType
    }
    return await AV.Cloud.run('payWithWalletBalance', params)
  }
  
  static async fetchWallet() {
    return await AV.Cloud.run('payGetWalletInfo')
  }
}