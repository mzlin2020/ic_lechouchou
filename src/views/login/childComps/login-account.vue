<template>
  <div class="login-account">
    <div class="login-title">
      <span>欢迎登录-</span>
      <span class="text-title2">后台管理系统</span>
    </div>
    <!-- 账号 -->
    <el-form :rules="rules" :model="account" hide-required-asterisk ref="formRef">
      <el-form-item prop="username">
        <el-input v-model="account.username" :prefix-icon="User" placeholder="账号" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="account.password" :prefix-icon="Lock" show-password placeholder="密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { rules } from "./login-rules";
import localCache from "@/utils/cache.js";
import { User, Lock } from "@element-plus/icons";

export default {
  setup() {
    const account = reactive({
      username: localCache.getCache("username") ?? "",
      password: localCache.getCache("password") ?? "",
    });
    const store = useStore();
    const formRef = ref();
    // 具体的登录逻辑（被panel组件所执行）
    const loginAction = (isKeepPassword) => {
      //  el-form中validate方法可以返回用户输入是否正确
      formRef.value.validate((valid) => {
        //保存valid到vuex中
        store.commit("saveValid", valid)
        if (valid) {
          // 用户输入符合规则
          if (isKeepPassword) {
            // 记住密码
            localCache.setCache("username", account.username);
            localCache.setCache("password", account.password);
          } else {
            // 不记住密码，清除本地缓存
            localCache.deleteCache("username");
            localCache.deleteCache("password");
          }

          // 执行登录验证
          store.dispatch("login/loginAction", { ...account });

        } else {
          console.log("用户输入不符合规则");
        }
      });
    };
    return {
      account,
      rules,
      loginAction,
      formRef,
      User, //图标
      Lock,
    };
  },
};
</script>

<style scoped>
.login-account {
  text-align: center;
}
.login-title {
  font-size: 26px;
  padding-bottom: 10%;
  color: #ccc;
}
.text-title2 {
  color: #409eff;
}
.el-input{
  opacity: 0.8;
}
</style>
