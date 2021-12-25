<template>
  <div id="login">
    <!-- 登录面板 -->
    <login-panel />

  </div>
</template>

<script>
import LoginPanel from "./childComps/login-panel.vue";
export default {
  components: {
    LoginPanel,
  },
};
</script>

<style scoped>
#login {
  /* 垂直水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img/login-bg1.jpeg");
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
}
</style>
