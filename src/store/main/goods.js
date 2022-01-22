import { request } from "../../network/request";
import localCache from "@/utils/cache";
const goodsModule = {
  namespaced: true,
  state() {
    return {
      goodsInfo: [], //数据
      goodsCount: null, //总个数
      darkRoomData: null, //黑屋信息
    };
  },
  mutations: {
    //保存商品信息
    saveGoodsInfo(state, goodsInfo) {
      state.goodsInfo = goodsInfo;
      state.goodsCount = goodsInfo[0].totalCount;
      localCache.setCache("goodsCount", goodsInfo[0].totalCount);
    },

    // 保存黑屋信息
    saveDarkRoomInfo(state, darkRoomInfo) {
      state.darkRoomData = darkRoomInfo;
    },
  },
  actions: {
    async getGoodsInfoAction({ commit }, payload) {
      let goodsInfo = await request({
        url: "goods",
        params: {
          offset: payload.offset,
          size: payload.size,
          title: payload.title,
          catName: payload.catName,
          min: payload.min,
          max: payload.max
        },
      });
      goodsInfo = goodsInfo.filter((item) => {
        if (item.ifShow !== 1) {
          return false;
        } else {
          return item;
        }
      });
      // 保存数据
      commit("saveGoodsInfo", goodsInfo);
    },

    // 获取黑屋直播列表
    async darkRoomData({ commit }) {
      let darkRoomInfo = await request({
        url: "goods/darkroom",
      });
      // 保存
      commit("saveDarkRoomInfo", darkRoomInfo);
    },
  },
};
export default goodsModule;
