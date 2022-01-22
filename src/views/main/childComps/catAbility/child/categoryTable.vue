<template>
  <div class="category-table">
    <div class="search">
      <ZmForm :formItems="formItems" :formData="formData" />
    </div>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="catName" label="类目" align="center" />
    <el-table-column prop="saleNum" label="带货数量" align="center" :sortable="true"/>
    <el-table-column prop="pgItemSalePrice" label="均价" align="center" :sortable="true" />
    <el-table-column prop="catSaleAbility" label="类目带货能力" align="center" :sortable="true" />
    <el-table-column prop="catSaleAbilityTrend" label="能力趋势" align="center" :sortable="true">
      <template #default="scope">
        {{scope.row.catSaleAbilityTrend >= 0 ? "上升" : "下降"}}
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup>
import { defineProps, reactive, watch, defineEmits } from 'vue'
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import { formItems } from "./search.config.js";
defineProps({
  tableData:{
    type: Array,
    default() {
      return []
    }
  }
})

// 绑定数据
const formData = reactive({
  selection: "",
});
const em = defineEmits(['categorySelection'])
watch(formData, () => {
  // 将用户的选择发送出去
  em('categorySelection', formData.selection)
})
</script>

<style scoped>
.category-table {
  padding: 20px;
}
</style>