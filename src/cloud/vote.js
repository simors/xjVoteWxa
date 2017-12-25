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
    ACCOUNTED: 6,   // 已结算
  }

  static VOTE_SEARCH_TYPE = {
    ALL: 'all',
    PERSONAL: 'personal',
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

  static async fetchVotes(payload) {
    const params = {
    };
    ({
      searchType: params.searchType,
      status: params.status,
      orderedBy: params.orderedBy,
      lastTime: params.lastTime,
      limit: params.limit
    } = payload);

    return await AV.Cloud.run('voteFetchSet', params);
  }

  static async fetchVoteInfoById(payload) {
    let params = {
      voteId: payload.voteId,
      updateStatus: payload.updateStatus
    }
    return await AV.Cloud.run('voteFetchById', params)
  }

  static async incVotePv(payload) {
    let params = {
      voteId: payload.voteId
    }
    return await AV.Cloud.run('voteIncVotePv', params)
  }

  static async fetchVoteRank(payload) {
    let params = {
      voteId: payload.voteId
    }
    return await AV.Cloud.run('voteFetchRank', params)
  }

  static async joinVoteApply(payload) {
    let params = {
      voteId: payload.voteId,
      name: payload.name,
      declaration: payload.declaration,
      album: payload.album
    }
    return await AV.Cloud.run('voteCreatePlayerApply', params)
  }

  static async fetchVotePlayers(payload) {
    let params = {
      voteId: payload.voteId,
      lastNumber: payload.lastNumber,
      limit: payload.limit
    }
    return await AV.Cloud.run('voteFetchVotePlayers', params)
  }

  static async fetchPlayerById(payload) {
    let params = {
      playerId: payload.playerId
    }
    return await AV.Cloud.run('voteFetchPlayerById', params)
  }

  static async incPlayerPv(payload) {
    let params = {
      playerId: payload.playerId
    }
    return await AV.Cloud.run('voteIncPlayerPv', params)
  }

  static async voteForPlayer(payload) {
    let params = {
      playerId: payload.playerId
    }
    return await AV.Cloud.run('voteVoteForPlayer', params)
  }

  static async fetchGiftsByVote(payload) {
    let params = {
      voteId: payload.voteId
    }
    return await AV.Cloud.run('voteFetchGiftsByVote', params)
  }
  
  static async fetchPlayerRecvGifts(payload) {
    let params = {
      playerId: payload.playerId,
      lastTime: payload.lastTime,
      limit: payload.limit
    }
    return await AV.Cloud.run('voteListPlayerGifts', params)
  }
  
  static async disablePlayer(payload) {
    let params = {
      playerId: payload.playerId,
      disable: payload.disable
    }
    return await AV.Cloud.run('voteSetPlayerDisable', params)
  }
  
  static async searchPlayer(payload) {
    let params = {
      voteId: payload.voteId,
      searchKey: payload.searchKey
    }
    return await AV.Cloud.run('voteSearchPlayer', params)
  }
  
  static async fetchCreateVotePwd() {
    return await AV.Cloud.run('voteGetCreatePwd')
  }
}
