/**
 * Created by yangyang on 2017/11/30.
 */
import AV from '../utils/av-weapp-min'

export default class pay {
  static async reqPayment(payload) {
    let params = {
      amount: 100,
      channel: 'wx_lite',
      metadata: {},
      openid: payload.openid,
      subject: '测试'
    }
    let charge = await AV.Cloud.run('payCreatePaymentRequest', params)
    return charge
  }
}