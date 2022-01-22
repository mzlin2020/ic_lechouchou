<template>
  <div id="login-panel">
    <el-card class="box-card" :class="{ active: isWindowSize }">
      <login-account ref="accountRef" />
      <!-- 登录按钮 -->
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button class="loginBtn" type="primary" @click="handleLoginBtn">立即登录</el-button>
    </el-card>
  </div>
</template>

<script>
import LoginAccount from "./login-account.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default {
  components: {
    LoginAccount,
  },
  setup() {
    const accountRef = ref();
    const isKeepPassword = ref(true);
    let isWindowSize = ref(true);
    const store = useStore();
    const handleLoginBtn = () => {
      accountRef.value.loginAction(isKeepPassword.value);

      //登录失败的提示
      const valid = store.state.valid; //用户输入是否符合规则
      if (valid) {
        setTimeout(() => {
          const token = store.state.login.userInfo.token;
          if (!token) {
            ElMessage.error('账号或者密码存在错误~')
          }
        }, 1000);
      }
    };
    onMounted(() => {
      if (document.body.offsetWidth <= 500) {
        isWindowSize.value = false;
      }
    });

    return {
      handleLoginBtn,
      accountRef,
      isKeepPassword,
      onMounted,
      isWindowSize,
    };
  },
};
</script>

<style scoped>
.box-card {
  /* 偏上方 */
  margin-bottom: 20%;
  background-color: hsl(214, 25%, 24%);
  border: none;
}
.el-card {
  opacity: 0.8;
}
.active {
  width: 500px;
}
.loginBtn {
  width: 100%;
}
.account-control {
  display: flex;
  justify-content: space-between;
  margin: 8px 5px;
}
</style>
