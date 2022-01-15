import { request } from "../../network/request";
import localCache from '@/utils/cache'
const livesModule = {
  namespaced: true,
  state() {
    return {
      livesInfo:[],
      livesCount: null
    }
  },
  mutations: {
    //保存网红信息
    saveLivesInfo(state, livesInfo) {
      state.livesInfo = livesInfo
      state.livesCount = livesInfo[0].totalCount
      localCache.setCache("livesCount", livesInfo[0].totalCount)
    }
  },
  actions: {
    async getLivesInfoAction({commit}, payload) {
      let livesInfo = await request({
        url:'lives',
        params: {
          offset: payload.offset,
          size: payload.size
        }
      })
      livesInfo = livesInfo.filter(item => {
        if(item.ifShow !== 1) {
          return false
        } else {
          return item
        }
      })
      // 保存数据
      commit('saveLivesInfo', livesInfo)
    }
  }
}
export default livesModule