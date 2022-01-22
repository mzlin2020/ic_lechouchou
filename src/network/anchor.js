import { request } from "./request";

// 关进黑屋
export const anchorsDarkRoom = (anchorId, ifShow) => {
  request({
    url: "anchors/ifShow",
    method: "put",
    params: {
      anchorId,
      ifShow,
    },
  });
};

// 获取带货能力的网络请求
export const getCatAbilityAnchorInfo = (anchorId) => {
  return request({
    url: "anchors/detail/" + anchorId,
  });
};

// 获取带货能力产品类别的网络请求
export const getCatAbilityData = (anchorId, catName) => {
  return request({
    url: "anchors/catAbility",
    params: {
      anchorId,
      catName,
    },
  });
};
