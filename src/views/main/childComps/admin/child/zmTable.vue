<template>
  <div class="zm-table">
    <!-- 表头 -->
    <div class="header">
      <slot name="header">
        <div class="title">用户列表</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table :data="dataInfo" style="width: 100%"  highlight-current-row>
      <!-- 选择列 -->
      <!-- <el-table-column type="selection" width="80" align="center" /> -->
      <!-- 序号列 -->
      <el-table-column type="index" label="序号" align="center" width="80" />
      <!-- 其他列 -->
      <template v-for="propItem in tableList" :key="propItem.prop">
        <!-- 注：每一个el-table-column相当于一列 -->
        <el-table-column
          :prop="propItem.prop"
          :label="propItem.label"
          width="proItem.minWidth"
          align="center"
          :show-overflow-tooltip="propItem.isFold"
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
// import { isPC } from "@/utils/isPc";
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
  { prop: "username", label: "用户账号", minWidth: "120", isFold: true },
  { prop: "name", label: "昵称", minWidth: "100", isFold: true },
  { prop: "permissions", label: "权限等级", minWidth: "80", isFold: true },
  { prop: "regTime", label: "创建时间", minWidth: "120", slotName: "regTime", isFold: true },
  { prop: "action1", label: "操作", minWidth: "120", slotName: "action1", isFold: false },
  { prop: "action1", label: "操作", minWidth: "120", slotName: "action2", isFold: false },
];

// 查看哪一个行被选中
// const handleCurrentChange = (currentRow) => {
//   console.log("哪一个选项被相中", currentRow);
// };

// 移动端适配
// let ispc = isPC();
</script>

<style scoped>
.zm-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}

.handler {
  align-items: center;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
}
</style>
