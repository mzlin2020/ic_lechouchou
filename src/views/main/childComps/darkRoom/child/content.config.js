//表格配置
export const anchorsTableList = [
  { prop: "anchorName", label: "主播名", minWidth: "100" },
  { prop: "picUrl", label: "主播名", minWidth: "100" },
  { prop: "anchorType", label: "网红类型", minWidth: "100" },
  { prop: "liveTag", label: "宣传标签", minWidth: "110"  },
  { prop: "agencyName", label: "所属机构", minWidth: "110" },
  { prop: "saleAbility", label: "带货能力", minWidth: "100" },
];

export const livesTableList = [
  { prop: "liveId", label: "直播编号", minWidth: "120" },
  { prop: "anchorName", label: "主播名", minWidth: "100" },
  { prop: "liveTitle", label: "直播标题", minWidth: "120"  },
  { prop: "visitNum", label: "观看人数", minWidth: "120" },
];

// 找商品页面
export const goodsTableList = [
  { prop: "title", label: "商品名称", minWidth: "120" },
  { prop: "catName", label: "类目", minWidth: "120"  },
  { prop: "liveQuantity", label: "销量", minWidth: "120" },
  { prop: "liveCount", label: "直播场次", minWidth: "120" },
  { prop: "coopAnchorCount", label: "合作网红数", minWidth: "120" },
];

// 直播商品详情
export const liveGoodsTableList = [
    { prop: "title", label: "商品名称", minWidth: "100" },
    { prop: "catName", label: "类目", minWidth: "110", slotName: "catName" },
    { prop: "liveQuantity", label: "销量", minWidth: "100", slotName: "liveQuantity"},
    { prop: "zkFinalPrice", label: "价格", minWidth: "110", slotName: "zkFinalPrice" },
];