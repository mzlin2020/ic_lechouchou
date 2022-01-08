<template>
  <div id="app">
    <!-- 国际化 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
  name: "App",
  components: {
    ElConfigProvider,
  },
  data() {
    return {
      zhCn
    }
  }
};
</script>

<style scoped>
/* 引入基本样式 */
@import url("./assets/css/base.css");
</style>
