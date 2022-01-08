import { createStore } from "vuex";
import login from "./login/login";
import anchors from "./main/anchors"

const store = createStore({
  state() {
    return {
      name: "linming",
      valid: "", //登录界面用户输入是否符合规则
    };
  },
  mutations: {
    saveValid(state, payload) {
      state.valid = payload;
    },

  },
  modules: {
    login, //登录子模块
    anchors,
  },
});

// 刷新页面时，重新将数据保存进vuex中
export function setupStore() {
  store.dispatch("login/loadLocalLogin"); //触发login中的action中的loadLocalLogin
  
}

export default store;
