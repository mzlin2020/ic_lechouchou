<template>
  <div class="goods">
    <!-- 搜索框 -->
    <ZmForm :formItems="formItems" :formData="formData" :collayout="collayout">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">找商品</h2>
      </template>

      <!-- 尾部 -->
      <template #footer>
        <div class="form-button">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </ZmForm>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import { formItems } from "./child/search.config.js";

// 一、搜索框逻辑
// 绑定数据
const formData = reactive({
  title: "",
  selection: "",
  minNum: "",
  maxNum: ""
});

// 重置按钮
const handleResetClick = () => {
  console.log('重置');
}
// 搜索按钮
const handleSearchClick = () => {
  console.log('搜索');
}
// 一行显示多少个框
const collayout = {
        xl: 8,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24,
}
</script>

<style scoped>
.form-title {
  padding-top: 20px;
}
.form-button {
  text-align: right;
  padding: 0 80px 20px 0;
}
</style>
