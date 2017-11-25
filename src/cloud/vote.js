/**
 * Created by yangyang on 2017/11/24.
 */
import AV from '../utils/av-weapp-min'

export default class vote {
  static VOTE_STATUS = {
    EDITING: 1,     // 正在编辑
    PAYING: 2,      // 待支付
    WAITING: 3,     // 未开始
    STARTING: 4,    // 正在进行
    DONE: 5,        // 已结束
  }
  
  static async fetchGifts() {
    try {
      let awards = await AV.Cloud.run('voteFetchGifts')
      return awards
    } catch (e) {
      console.error('error in fetch awards', e)
      throw e
    }
  }
  
  static async createVote(payload) {
    let vote = await AV.Cloud.run('voteCreateVote', payload)
    return vote
  }
  
  static async createOrUpdateVote(payload) {
    let vote = await AV.Cloud.run('voteCreateOrUpdateVote', payload)
    return vote
  }
}