import { request } from '@/network/request'
const adminModule = {
  namespaced: true,
  state() {
    return {
      // 用户信息
      userData: null
    }
  },
  mutations: {
    saveUserData(state, userData) {
      state.userData = userData
    }
  },
  actions: {
    // 获取用户信息
    async getUserDataAction({ commit }) {
      const userData = await request({
        url: 'admin_user'
      })
      commit('saveUserData', userData)
    }
  }
}
export default adminModule