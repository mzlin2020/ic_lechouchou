import { createStore } from "vuex";
import login from "./login/login";
import anchors from "./main/anchors";
import admin from "./main/admin";
import lives from "./main/lives";
import goods from "./main/goods";

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
    anchors, //网红信息模块
    admin, //系统管理模块
    lives, //直播商品模块
    goods, //商品信息模块
  },
});

// 刷新页面时，重新将数据保存进vuex中
export function setupStore() {
  store.dispatch("login/loadLocalLogin"); //触发login中的action中的loadLocalLogin
  store.commit("lives/loadLiveGoodsBaseInfo"); //避免商品详情页的主播名与直播标题被刷新清空
}

export default store;
