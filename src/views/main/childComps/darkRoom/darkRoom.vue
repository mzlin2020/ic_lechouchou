<template>
  <div class="dark-room">
    <!-- 表头 -->
    <div class="header"><h2>小黑屋</h2></div>

    <!-- 表格 -->
    <el-table 
    :data="dataInfo"
    style="width: 100%" 
    @selection-change="handleSelectionChange">
      <!-- 选择列 -->
      <el-table-column type="selection" width="50" align="center" />
      <!-- 序号列 -->
      <el-table-column type="index" label="序号" align="center" width="70"/>
      <!-- 其他列 -->
      <template v-for="propItem in tableList" :key="propItem.prop">
        <!-- 注：每一个el-table-column相当于一列 -->
        <el-table-column
          :prop="propItem.prop"
          :label="propItem.label"
          width="proItem.minWidth"
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
import { useRoute } from 'vue-router'
import { getDarkRoomAnchorsInfo } from '@/network/anchor'
let dataInfo = null
// 路由传参（获取来自不同页面的参数，创建不同的黑屋） 
const route = useRoute()
console.log(route.params.darkRoomName)

getDarkRoomAnchorsInfo().then(res => {
  dataInfo = res
  console.log(res);
})


const tableList = [
  { prop: "anchorName", label: "主播名", minWidth: "100" },
  { prop: "avatar", label: "头像", minWidth: "120", slotName: "image" },
  { prop: "fansNum", label: "粉丝数目", minWidth: "110", slotName: "fansNum" },
  { prop: "pgLiveQuantity", label: "场均带货", minWidth: "110", slotName: "pgLiveQuantity" },
  { prop: "medianPrice", label: "客单价", minWidth: "100", slotName: "medianPrice"},
  { prop: "status", label: "状态", minWidth: "120", slotName: "status"},
  { prop: "analyze", label: "分析", minWidth: "120", slotName: "analyze"},
];

// 选择某一列的信息
const handleSelectionChange = () => {
  console.log('选择了这一列');
}

</script>

<style scoped>

</style>