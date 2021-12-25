<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <img class="logo-img" src="~@/assets/img/common/logo.svg" alt="logo" />
      <span class="title">Menu</span>
    </div>

    <!-- 菜单选项 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="isFold"
    >
      <template v-for="item in menuInfo" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon :size="10">
                <Monitor v-if="item.icon === 'Monitor'" />
                <Setting v-if="item.icon === 'Setting'" />
                <Goods v-if="item.icon === 'Goods'" />
                <VideoCamera v-if="item.icon === 'VideoCamera'" />
                <Avatar v-if="item.icon === 'Avatar'" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="getRoute(subitem.url,item.name,subitem.name)">
                <i v-if="subitem.icon" :class="item.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { reactive, defineProps } from "vue";
import { Monitor, Setting, Goods, VideoCamera, Avatar } from "@element-plus/icons-vue";
import { menu } from "./menuInfo";
import router from '@/router'
import emitter from '@/utils/eventBus.js'

// 获取菜单
const menuInfo = reactive(menu);

// 是否收缩菜单
defineProps({
  isFold: {
    type: Boolean
  }
})

// 获取路由信息,保存路径名（用于展示面包屑）
const getRoute = (url,pathName1,pathName2) => {
  // 1.切换路由
  router.push(url)
  // 2.事件总线传递路径信息
  emitter.emit('pathInfo', {pathName1, pathName2})
}
</script>

<style scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.logo-img {
  height: 100%;
  margin: 0 10px;
}
.title {
  font-size: 16px;
  font-weight: 700;
  color: white;
}

.el-menu {
  border-right: none;
}
/* 目录 */
.el-sub-menu {
  background-color: #001529 !important;
}
/* 二级菜单 ( 默认背景 ) */
.el-menu-item {
  padding-left: 50px !important;
  background-color: #0c2135 !important;
}
::v-deep .el-sub-menu__title {
  background-color: #001529 !important;
}
/* hover 高亮 */
.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
