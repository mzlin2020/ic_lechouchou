<template>
  <div class="zm-table">
    <el-table :data="dataInfo" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 选择列 -->
      <el-table-column type="selection" min-width="50" align="center" />
      <!-- 序号列 -->
      <el-table-column type="index" label="序号" align="center" width="60" />
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
      <!-- 带货能力分析列 -->
      <el-table-column label="分析" align="center" min-width="60">
        <el-button type="primary">带货能力</el-button>
      </el-table-column>
    </el-table>

    <!-- 表格尾部（插槽） -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :total="anchorsCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  dataInfo: {
    type: Array,
    default() {
      return [];
    },
  },
  page: {
    type: Object,
    default: () => {
      return {
        currentPage: 0,
        pageSize: 10,
      };
    },
  },
  anchorsCount: {
    type: Number,
    default: 0,
  },
});
// 展示数据
const tableList = [
  { prop: "anchorName", label: "主播名", minWidth: "60" },
  { prop: "avatar", label: "头像", minWidth: "60", slotName: "image" },
  { prop: "fansNum", label: "粉丝数目", minWidth: "60", slotName: "fansNum" },
  { prop: "pgLiveQuantity", label: "场均带货量", minWidth: "60", slotName: "pgLiveQuantity" },
  { prop: "medianPrice", label: "客单价", minWidth: "60", slotName: "medianPrice" },
  { prop: "status", label: "状态", minWidth: "60", slotName: "status" },
];

// 查看哪一个行被选中
const handleSelectionChange = () => {
  console.log("哪一个选项被相中");
};
const em = defineEmits(["update:page"]);
// 展示n/条页
const handleSizeChange = (pageSize) => {
  em("update:page", { ...props.page, pageSize });
};
//跳转到某一页
const handleCurrentChange = (currentPage) => {
  em("update:page", { ...props.page, currentPage });
};
</script>

<style scoped>
.zm-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.footer {
  margin-top: 15px;
  text-align: right;
}
</style>
