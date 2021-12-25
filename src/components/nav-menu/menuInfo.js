export const menu = [
  { 
    id: 1, 
    name: "系统总览", 
    type: 1, 
    url: "/main/system", 
    icon: "Monitor",
    children: [
    { id: 12, name: "系统介绍", type: 2, url: "/main/system" }
  ] },
  { 
    id: 2, 
    name: "网红管理", 
    type: 1, 
    url: "", 
    icon: "Avatar", 
    children: [
    { id: 13, name: "网红信息", type: 2, url: "/main/anchors" }
  ] },
  { 
    id: 3, 
    name: "直播管理", 
    type: 1, 
    url: "", 
    icon: "VideoCamera", 
    children: [
    { id: 14, name: "直播信息", type: 2, url: "/main/lives" }
  ] },
  { 
    id: 4, 
    name: "商品管理", 
    type: 1, 
    url: "", 
    icon: "Goods", 
    children: [
    { id: 15, name: "商品信息", type: 2, url: "/main/goods" }
  ] },
  {
    id: 5,
    name: "系统管理",
    type: 1,
    url: "",
    icon: "Setting",
    children: [
      { id: 10, name: "用户注册", type: 2, url: "/main/admin/register" },
      { id: 11, name: "权限设置", type: 2, url: "/main/admin/permission" },
    ],
  },
];
