import request from "@/network/login.js";
import localCache from "../../utils/cache";
import router from "@/router/index";
const loginModule = {
  namespaced: true,
  state() {
    return {
      //用户信息
      userInfo: "",
    };
  },
  mutations: {
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    saveUserInfoAgain(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清空用户信息
    clearUserInfo(state) {
      state.userInfo = "";
    },
  },
  actions: {
    async loginAction({ commit }, payload) {
      //发送网络请求获取结果
      const res = await request(payload);
      const userInfo = res.data;
      // 保存vuex中(提交mutation)
      commit("saveUserInfo", userInfo);
      // 保存到本地缓存
      const { token } = userInfo;
      localCache.setCache("token", token);
      localCache.setCache("userInfo", userInfo);

      //跳转到首页
      router.push("/main/system");
    },
    // 触发浏览器刷新时，重新将token，userInfo，userMenus缓存起来
    loadLocalLogin({ commit }) {
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        // 页面刷新时再次执行该操作
        commit("saveUserInfoAgain", userInfo);
      }
    },

    // 推出登录，清空内存
    clearUserInfo({ commit }) {
      commit("clearUserInfo");
    },
  },
};

export default loginModule;
