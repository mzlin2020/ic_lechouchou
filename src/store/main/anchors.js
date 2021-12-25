import { request } from "../../network/request";
const anchorsModule = {
  namespaced: true,
  state() {
    return {
      anchorsInfo:[]
    }
  },
  mutations: {
    //保存网红信息
    saveAnchorsInfo(state, anchorsInfo) {
      let filterInfo = []
      for(let item of anchorsInfo) {
        let info = {
          anchorName: item.anchorInfo.anchorName,
          avatar: item.anchorInfo.avatar,
          fansNum: item.anchorInfo.fansNum,
          pgLiveQuantity: item.liveInfo.pgLiveQuantity,
          medianPrice: item.liveInfo.medianPrice
        }
        filterInfo.push(info)
      }
      // 数据过滤完毕，直接赋值
      state.anchorsInfo = filterInfo
    }
  },
  actions: {
    async getAnchorsInfoAction({commit}, payload) {
      const anchorsInfo =await request({
        url:'anchors',
        params: {
          offset: payload.offset,
          size: payload.size
        }
      })
      // 保存数据
      commit('saveAnchorsInfo', anchorsInfo)
    }
  }
}
export default anchorsModule