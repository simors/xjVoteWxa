/**
 * Created by yangyang on 2017/11/20.
 */
import AV from '../utils/av-weapp-min'
import wepy from 'wepy'
import 'wepy-async-function'

export default class user {
  
  static async userLogin() {
    try {
      let leanUser = await AV.User.loginWithWeapp()
      console.log('leanUser', leanUser)
      let wepyUser = await wepy.getUserInfo({lang: 'zh_CN'})
      console.log('wepyUser', wepyUser)
      wepy.$instance.globalData.userInfo = wepyUser.userInfo
      return wepyUser.userInfo
    } catch (e) {
      console.error('error in login', e)
    }
  }
}