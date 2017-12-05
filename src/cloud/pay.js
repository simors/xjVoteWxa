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
      amount: 1,
      channel: 'wx_lite',
      metadata: {},
      openid: payload.openid,
      subject: '测试'
    }
    let charge = await AV.Cloud.run('payCreatePaymentRequest', params)
    return charge
  }
}