<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="text">{{ pathInfo[0] }}</el-breadcrumb-item>
      <el-breadcrumb-item class="text">{{ pathInfo[1] }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import emitter from "@/utils/eventBus.js";
import { reactive } from "vue";

//获取路径信息
let pathInfo = reactive(["系统总览", "系统介绍"]);
emitter.on("pathInfo", (info) => {
  changePathInfo(info);
});
const changePathInfo = (obj) => {
  pathInfo[0] = obj.pathName1;
  pathInfo[1] = obj.pathName2;
};
</script>

<style scoped>
</style>
