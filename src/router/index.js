import { createRouter, createWebHashHistory } from "vue-router";
// import localCache from "@/utils/cache.js";

// 路由懒加载
const Main = () => import("@/views/main/mainPage.vue");
const Login = () => import("@/views/login/login.vue");
const System = () => import("@/views/main/childComps/system/system.vue");
const Anchors = () => import("@/views/main/childComps/anchors/anchors.vue");
const Lives = () => import("@/views/main/childComps/lives/lives.vue");
const Goods = () => import("@/views/main/childComps/goods/goods.vue");
const AdminRegister = () => import("@/views/main/childComps/admin/adminRegister.vue");
const AdminPermission = () => import("@/views/main/childComps/admin/adminPermission.vue");
const NotFound = () => import("@/views/main/childComps/NotFound/not-found.vue")

const routes = [
  {
    path: "/",
    redirect: "/main/anchors",
  },
  {
    path: "/main",
    component: Main,
    name: "main",
    children: [
      {
        path: "/main/system",
        component: System,
      },
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
        path: "/main/admin/register",
        component: AdminRegister,
      },
      {
        path: "/main/admin/permission",
        component: AdminPermission,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;

// const token = localCache.getCache('token')
// console.log(token);

// //全局守卫-登录验证
// router.beforeEach((to, from, next) => {
//   if(token || to.name === 'login') {
//       next()
//   } else {
//       next({ name:'login' })
//   }
// })
