<template>
  <div class="nav-header">
    <el-icon size="36" class="fold-Menu" color="rgb(101, 93, 218)" @click="IconClick">
      <Expand />
    </el-icon>
    <!-- 内容区 -->
    <div class="content">
      <!-- 面包屑 -->
      <div>
        <Breadcrumb />
      </div>
      <!-- 用户信息 -->
      <div class="userInfo">
        <el-icon size="20" class="user-icon" v-if="isShow"><ChatDotRound /></el-icon>
        <el-icon size="20" class="user-icon" v-if="isShow"><CollectionTag /></el-icon>
        <el-icon size="20" class="user-icon" v-if="isShow"><Bell /></el-icon>
        <el-avatar :size="35" :src="circleUrl" class="avatar"></el-avatar>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Expand, ChatDotRound, CollectionTag, Bell } from "@element-plus/icons-vue";
import UserInfo from "./user-info.vue";
import Breadcrumb from "./breadcrumb.vue";
import { defineEmits, ref } from "vue";
import { isPC } from "@/utils/isPc";
// 将是否收缩菜单的isFold传给父组件
let isFold = ref(false);
const em = defineEmits(["clickIsFold"]);
const IconClick = () => {
  isFold.value = !isFold.value;
  em("clickIsFold", isFold.value);
};

// 移动端是否显示用户信息
const isShow = isPC();

// 头像地址（暂时写死）
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
</script>
<style scoped>
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
}

/* 收缩菜单 */
.fold-Menu {
  cursor: pointer;
}
.fold-Menu:hover {
  color: rgb(101, 93, 218);
  opacity: 0.8;
}
/* 内容区 */
.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
}
/* 头像 */
.userInfo {
  display: flex;
  align-items: center;
}
.user-icon {
  margin: 0 10px;
  cursor: pointer;
}
.avatar {
  margin-right: 10px;
}
</style>
