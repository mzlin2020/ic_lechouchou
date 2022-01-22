import { request } from "../../network/request";
import localCache from "@/utils/cache";
const livesModule = {
  namespaced: true,
  state() {
    return {
      // 直播页面信息
      livesInfo: [],
      livesCount: null,
      darkRoomData: null,

      // liveGoods详情页基本信息
      anchorName: null,
      liveTitle: null,

      // liveGoods详情页信息
      liveGoodsInfo: [],
      liveGoodsCount: null,
      liveGoodsDarkRoomData: null,
    };
  },
  mutations: {
    //保存网红信息
    saveLivesInfo(state, livesInfo) {
      state.livesInfo = livesInfo;
      state.livesCount = livesInfo[0].totalCount;
      localCache.setCache("livesCount", livesInfo[0].totalCount);
    },
    // 保存黑屋信息
    saveDarkRoomInfo(state, anchorsInfo) {
      state.darkRoomData = anchorsInfo;
    },

    // 保存直播信息页基本信息
    saveLiveGoodsBaseInfo(state, payload) {
      state.anchorName = payload.anchorName;
      state.liveTitle = payload.liveTitle;
      // 将这两个基本信息保存到本地缓存
      localCache.setCache("liveGoods_anchorName", payload.anchorName);
      localCache.setCache("liveGoods_liveTitle", payload.liveTitle);
    },
    //触发刷新时，为避免这两个信息被清空，重新加载
    loadLiveGoodsBaseInfo(state) {
      state.anchorName = localCache.getCache("liveGoods_anchorName");
      state.liveTitle = localCache.getCache("liveGoods_liveTitle");
    },

    // 保存直播商品详情页
    saveLiveGoodsInfo(state, liveGoodsInfo) {
      state.liveGoodsInfo = liveGoodsInfo;
      state.liveGoodsCount = liveGoodsInfo[0].total;
      localCache.setCache("liveGoodsCount", liveGoodsInfo[0].total);
    },

    // 获取直播详情中黑屋信息列表
    saveLiveGoodsDarkRoomData(state, liveGoodsDarkRoomData) {
      state.liveGoodsDarkRoomData = liveGoodsDarkRoomData;
    },
  },
  actions: {
    // 获取直播信息列表
    async getLivesInfoAction({ commit }, payload) {
      let livesInfo = await request({
        url: "lives",
        params: {
          offset: payload.offset,
          size: payload.size,
          anchorName: payload.anchorName,
          liveTitle: payload.liveTitle
        },
      });
      // 过滤掉ifShow字段不为1的数据（关进黑屋）
      livesInfo = livesInfo.filter((item) => {
        if (item.ifShow !== 1) {
          return false;
        } else {
          return item;
        }
      });
      // 保存数据
      commit("saveLivesInfo", livesInfo);
    },

    // 获取黑屋直播列表
    async darkRoomData({ commit }) {
      let darkRoomInfo = await request({
        url: "lives/darkroom",
      });
      // 保存
      commit("saveDarkRoomInfo", darkRoomInfo);
    },

    // 获取详情页——直播商品数据
    async getLiveGoodsInfoAction({ commit }, payload) {
      let liveGoodsInfo = await request({
        url: "lives/liveGoods",
        params: {
          offset: payload.offset,
          size: payload.size,
          liveId: payload.liveId,
        },
      });
      // 过滤
      liveGoodsInfo = liveGoodsInfo.filter((item) => {
        if (item.ifShow !== 1) {
          return false;
        } else {
          return item;
        }
      });
      commit("saveLiveGoodsInfo", liveGoodsInfo);
    },
    // 获取直播商品黑屋列表
    async liveGoodsDarkRoomData({ commit }) {
      let liveGoodsDarkRoomData = await request({
        url: "lives/liveGoods/darkRoom",
      });
      // 保存
      commit("saveLiveGoodsDarkRoomData", liveGoodsDarkRoomData);
    },
  },
};
export default livesModule;
