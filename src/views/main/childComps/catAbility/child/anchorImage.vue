<template>
  <div class="anchor-image">
    <template v-for="item in tableData" :key="item.ID">
      <div class="image">
        <el-image style="width: 140px; height: 140px" :src="item.picUrl" lazy></el-image>
      </div>
      <div class="name">{{ item.anchorName }}</div>
      <div class="telephone">联系方式: {{ item.telephone ? item.telephone : "未知" }}</div>
      <div class="ability">带货能力: {{ item.saleAbility }}</div>
    </template>
  </div>
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

<style scoped>
.telephone {
  margin-top: 10px;
}
.telephone,
.ability {
  font-size: 12px;
  text-align: left;
  color: #888;
}
</style>
