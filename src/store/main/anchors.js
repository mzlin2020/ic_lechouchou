import { request } from "../../network/request";
import localCache from '@/utils/cache'
const anchorsModule = {
  namespaced: true,
  state() {
    return {
      anchorsInfo:[],
      anchorsCount: null
    }
  },
  mutations: {
    //保存网红信息
    saveAnchorsInfo(state, anchorsInfo) {
      state.anchorsInfo = anchorsInfo
      state.anchorsCount = anchorsInfo[0].totalCount
      localCache.setCache("anchorsCount", anchorsInfo[0].totalCount)
    }
  },
  actions: {
    async getAnchorsInfoAction({commit}, payload) {
      const anchorsInfo = await request({
        url:'anchors',
        params: {
          offset: payload.offset,
          size: payload.size,
          anchorName: payload.name,
          fansNum: payload.selection
        }
      })
      // console.log(anchorsInfo)
      // 保存数据
      commit('saveAnchorsInfo', anchorsInfo)
    }
  }
}
export default anchorsModule