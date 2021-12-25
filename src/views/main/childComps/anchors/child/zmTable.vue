<template>
  <div class="zm-table">
    <el-table :data="dataInfo" style="width: 100%">
      <!-- 选择列 -->
        <el-table-column
          type="selection"
          width="60"
          align="center"/>
      <!-- 序号列 -->
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60"
        />
      <!-- 其他列 -->
        <template v-for="propItem in tableList" :key="propItem.prop">
          <!-- 注：每一个el-table-column相当于一列 -->
          <el-table-column
            :prop="propItem.prop"
            :label="propItem.label"
            :min-width="propItem.minWidth"
            align="center"
            show-overflow-tooltip
          >
            <!-- 默认插槽 -->
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  dataInfo: {
    type: Array,
    default() {
      return [];
    },
  },
});

// 展示数据
const tableList = [
  { prop: "anchorName", label: "主播名", minWidth: "60" },
  { prop: "avatar", label: "头像", minWidth: "60",slotName: 'image' },
  { prop: "fansNum", label: "粉丝数目", minWidth: "60" },
  { prop: "pgLiveQuantity", label: "场均带货量", minWidth: "60" },
  { prop: "medianPrice", label: "客单价", minWidth: "60" },
  { prop: 'status', label: '状态', minWidth: '60', slotName: 'status' },
];
</script>

<style scoped>
.zm-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
