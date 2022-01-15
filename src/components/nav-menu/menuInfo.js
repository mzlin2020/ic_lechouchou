export const menu = [
  { 
    id: 1, 
    name: "系统总览", 
    type: 1, 
    url: "", 
    icon: "Monitor",
    children: [
    { id: 10, name: "系统总览", type: 2, url: "/main/system" }
  ] },
  { 
    id: 2, 
    name: "模块管理", 
    type: 1, 
    url: "", 
    icon: "Management", 
    children: [
    { id: 20, name: "网红信息", type: 2, url: "/main/anchors" },
    { id: 21, name: "直播信息", type: 2, url: "/main/lives" },
    { id: 22, name: "商品信息", type: 2, url: "/main/goods" }
  ] },
  {
    id: 3,
    name: "系统管理",
    type: 1,
    url: "",
    icon: "Setting",
    children: [
      { id: 30, name: "用户管理", type: 2, url: "/main/admin/Management" },
      { id: 31, name: "更多设置", type: 2, url: "/main/admin/permission" },
    ],
  },
];
