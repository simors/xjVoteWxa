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
      // await wepy.login()
      // let wepyUser = await wepy.getUserInfo()
      // wepy.$instance.globalData.userInfo = wepyUser.userInfo;
      return leanUser
    } catch (e) {
      console.log('error in login', e)
    }
  }
}