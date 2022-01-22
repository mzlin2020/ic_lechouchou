<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 菜单栏 -->
      <el-aside :width="isFold ? '60px' : showMenu">
          <nav-menu :isFold="isFold" />
      </el-aside>

      <el-container class="page">
        <!-- 头部信息 -->
        <el-header class="page-header">
          <nav-header @clickIsFold="clickIsFold" />
        </el-header>
        <!-- 主要内容 -->
        <el-main class="page-content" v-bind="addId">
          <router-view class="mainContent" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive } from "vue";
import NavMenu from "@/components/nav-menu/nav-menu.vue";
import NavHeader from "@/components/nav-header/nav-header.vue";
import localCache from "@/utils/cache";
import router from "@/router";
import { isPC } from "@/utils/isPc";
onBeforeMount(() => {
  // 判断：如果没有token，路由跳转会登录页(bug：token过期后无法触发)
  const token = localCache.getCache("token");
  if (!token) {
    router.push("/login");
  }
});

// 获取是否要收缩菜单的isFold
let isFold = ref(false);
const clickIsFold = (data) => {
  isFold.value = data;
};

//移动端收缩菜单
//移动端时，给el-main增加一个id改变样式
let isMobile = !isPC();
let addId = null;
let showMenu = ref("210px");
if (isMobile) {
  isFold.value = false;
  showMenu.value = "0px";
  addId = reactive({
    id: "change-dedault-padding",
  });
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
/* 头部 */
.el-header {
  height: 48px !important;
  border-bottom: 1px solid #eee;
}
.el-header {
  /*使内容都居中*/
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
/* 内容 */
.page-content {
  height: calc(100% - 48px);
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
/* 手机端去除el-main默认padding */
#change-dedault-padding {
  --el-main-padding: 0px;
}
.mainContent {
  background-color: #fff;
  border-radius: 5px;
}
/* 侧边栏 */
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer; /*鼠标手指形状*/
  /* background-color: #001529; */
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
