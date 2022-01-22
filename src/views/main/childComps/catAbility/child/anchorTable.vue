<template>
  <el-descriptions :column="1" border>
    <template v-for="item in tableData" :key="item.ID">
      <el-descriptions-item label="所属机构" align="center" width="250px">{{
        item.agencyName ? item.agencyName : "无"
      }}</el-descriptions-item>
      <el-descriptions-item label="粉丝数" align="center">{{
        $filter.formatFansNum(item.fansNum)
      }}</el-descriptions-item>
      <el-descriptions-item label="直播场次" align="center">{{ item.total }}</el-descriptions-item>
      <el-descriptions-item label="场均带货量" align="center"> {{ item.pgLiveQuantity }} </el-descriptions-item>
      <el-descriptions-item label="带货产品平均价格" align="center">{{
        $filter.formatMedianPrice(item.medianPrice)
      }}</el-descriptions-item>
      <el-descriptions-item label="服务费" align="center">{{
        item.serviceFree ? item.serviceFree : "暂无信息"
      }}</el-descriptions-item>
    </template>
  </el-descriptions>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  tableData: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<style scoped></style>
