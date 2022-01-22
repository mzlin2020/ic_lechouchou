import { request } from "./request";

// 关进黑屋
export const livesDarkRoom = (liveId, ifShow) => {
  request({
    url: "lives/ifShow",
    method: "put",
    params: {
      liveId,
      ifShow,
    },
  });
};

// 带货能力详情页
// 删除某件商品的数据
export const removeLiveGoodsData = (itemId) => {
  request({
    url: "lives/liveGoods",
    method: "delete",
    params: {
      itemId,
    },
  });
};

// 关进黑屋
export const liveGoodsDarkRoom = (itemId, ifShow) => {
  request({
    url: "lives/liveGoods/ifShow",
    method: "put",
    params: {
      itemId,
      ifShow,
    },
  });
};
