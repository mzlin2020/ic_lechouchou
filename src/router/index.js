import { createRouter, createWebHistory } from "vue-router";

// 路由懒加载
const Main = () => import("@/views/main/mainPage.vue");
const Login = () => import("@/views/login/login.vue");
// const System = () => import("@/views/main/childComps/system/system.vue");
const Anchors = () => import("@/views/main/childComps/anchors/anchors.vue");
const Lives = () => import("@/views/main/childComps/lives/lives.vue");
const Goods = () => import("@/views/main/childComps/goods/goods.vue");
const AdminManagement = () => import("@/views/main/childComps/admin/adminManagement.vue");
const AdminPermission = () => import("@/views/main/childComps/admin/adminPermission.vue");
const NotFound = () => import("@/views/main/childComps/NotFound/not-found.vue");
const DarkRoom = () => import("@/views/main/childComps/darkRoom/darkRoom.vue");
const CatAbility = () => import("@/views/main/childComps/catAbility/catAbility.vue");
const LiveGoods = () => import("@/views/main/childComps/liveGoods/liveGoods.vue");

const routes = [
  // 默认跳转到网红页
  {
    path: "/",   
    component: Anchors,
    redirect: "/main/anchors",
  },
  {
    path: "/main",
    component: Main,
    name: "main",
    children: [
      //嵌套路由
      {
        path: "/main/anchors",
        component: Anchors,
      },
      {
        path: "/main/lives",
        component: Lives,
      },
      {
        path: "/main/goods",
        component: Goods,
      },
      {
        path: "/main/admin/management",
        component: AdminManagement,
      },
      {
        path: "/main/admin/permission",
        component: AdminPermission,
      },
      {
        path: "/main/darkRoom/:darkRoomName",
        component: DarkRoom,
      },
      {
        path: "/main/catAbility/:anchorId",
        component: CatAbility,
      },
      {
        path: "/main/liveGoods/:liveInfo",
        component: LiveGoods,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;

// //全局守卫-登录验证
// router.beforeEach((to, from, next) => {
//   if(token || to.name === 'login') {
//       next()
//   } else {
//       next({ name:'login' })
//   }
// })
