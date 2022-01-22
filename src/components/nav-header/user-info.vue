<template>
  <el-dropdown :hide-on-click="false">
    <span>
      <span>{{ userInfo.name }}</span>
      <el-icon class="selectMore">
        <arrow-down />
      </el-icon>
    </span>
    <!-- 下拉选项 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon size="16"><User /></el-icon>
          个人信息
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon size="16"><Setting /></el-icon>
          更多设置
        </el-dropdown-item>

        <el-dropdown-item @click="exitLogin">
          <el-icon size="16"><SwitchButton /></el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useStore } from "vuex";
import { ArrowDown, Setting, SwitchButton, User } from "@element-plus/icons-vue";
import router from "@/router";
import localCache from "@/utils/cache";
// 获取用户信息
const store = useStore();
const userInfo = store.state.login.userInfo;

// 退出登录
const exitLogin = () => {
  // 清空缓存、vuex
  localCache.clearCache();
  store.dispatch("login/clearUserInfo");
  router.push("/login");
};
</script>

<style scoped>
.el-dropdown-item {
  cursor: pointer;
}
.selectMore {
  margin-left: 5px;
  vertical-align: middle; /*图片文字居中*/
}
</style>
