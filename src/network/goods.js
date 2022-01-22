import { request } from "./request";

// 关进黑屋
export const goodsDarkRoom = (itemId, ifShow) => {
  request({
    url: "goods/ifShow",
    method: "put",
    params: {
      itemId,
      ifShow,
    },
  });
};

// 删除商品
export const removeGoodsData = (itemId) => {
  request({
    url: "goods/" + itemId,
    method: "delete",
  });
};
