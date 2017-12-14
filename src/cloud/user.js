/**
 * Created by yangyang on 2017/11/20.
 */
import AV from '../utils/av-weapp-min'
import wepy from 'wepy'
import 'wepy-async-function'

export default class user {
  
  static async userLogin() {
    try {
      await AV.User.loginWithWeapp()
      let wepyUser = await wepy.getUserInfo({lang: 'zh_CN'})
      let wepyUserInfo = wepyUser.userInfo
      if (!wepyUserInfo) {
        return undefined
      }
      wepy.$instance.globalData.userInfo = wepyUserInfo
      let params = {
        nickname: wepyUserInfo.nickName,
        gender: wepyUserInfo.gender,
        avatar: wepyUserInfo.avatarUrl,
        province: wepyUserInfo.province,
        city: wepyUserInfo.city
      }
      let updateUser = await AV.Cloud.run('userUpdateInfo', params)
      return updateUser
    } catch (e) {
      console.error('error in login', e)
    }
  }
  
  static async fetchUserInfo(payload) {
    let params = {
      userId: payload.userId
    }
    return await AV.Cloud.run('userFetchUserInfo', params)
  }
}