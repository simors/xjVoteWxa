/**
 * Created by yangyang on 2017/11/24.
 */
import AV from '../utils/av-weapp-min'

export default class vote {
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
    try {
      let vote = await AV.Cloud.run('voteCreateVote', payload)
      return vote
    } catch (e) {
      throw e
    }
  }
}