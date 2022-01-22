<template>
  <div class="dark-room">
    <!-- 表头 -->
    <div class="header">
      <h2>小黑屋</h2>
      <div class="btn">
        <el-button @click="back">退出黑屋</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table 
    :data="dataInfo"
    style="width: 100%" 
    highlight-current-row
    @current-change="handleCurrentChange">
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
        </el-table-column>
      </template>

      <!-- 放出黑屋 -->
      <el-table-column  label="状态" align="center" width="120">
        <el-button plain type="danger" @click="letOutDarkRoom" class="controlBtn">放出黑屋</el-button>
      </el-table-column>
    </el-table>

    
    <!-- 确认放出黑屋的对话框 -->
    <div class="dialog">
      <el-dialog v-model="darkRoomDialog" title="黑屋操作" :width="dialogWidth" center>
        <span>确定放出黑屋吗</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="darkRoomDialog = false">取消</el-button>
            <el-button @click="DarkRoomAction" type="primary" plain>确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import router from '@/router'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { anchorsDarkRoom, livesDarkRoom, goodsDarkRoom, liveGoodsDarkRoom } from '@/network'
import { isPC } from "@/utils/isPc";
import { anchorsTableList, livesTableList, goodsTableList, liveGoodsTableList } from './child/content.config'

// 路由传参（获取来自不同页面的参数，创建不同的黑屋） 
const route = useRoute()
let currentRoute = route.params.darkRoomName

// 网络请求,在vuex中发送并保存黑屋主播
const store = useStore()
const getDarkRoomData = () => {
  store.dispatch('anchors/darkRoomData')
  store.dispatch('lives/darkRoomData')
  store.dispatch('goods/darkRoomData')
  store.dispatch('lives/liveGoodsDarkRoomData')
}
getDarkRoomData()
// 获取数据
let dataInfo = null
let tableList = null
switch (currentRoute) {
  case 'anchors':
    dataInfo = computed(() => store.state.anchors.darkRoomData)
    tableList = anchorsTableList
    break;
  case 'lives':
    dataInfo = computed(() => store.state.lives.darkRoomData)
    tableList = livesTableList
    break;
  case 'goods':
    dataInfo = computed(() => store.state.goods.darkRoomData)
    tableList = goodsTableList
    break;
  case 'liveGoods':
    dataInfo = computed(() => store.state.lives.liveGoodsDarkRoomData)
    tableList = liveGoodsTableList
    break;
  default:
    break;
}

// 放出黑屋的逻辑
let darkRoomDialog = ref(false)
let saveCurrentRow = ref(null)
const handleCurrentChange = (currentRow) => {
  saveCurrentRow = currentRow //保存当前列信息
}
const letOutDarkRoom = () => {
  darkRoomDialog.value = true //显示对话框
}
const DarkRoomAction = () => {
  const { anchorId, liveId, itemId } = saveCurrentRow
  switch (currentRoute) {
    case 'anchors':
      anchorsDarkRoom(anchorId, 1)
      break;
    case 'lives':
      livesDarkRoom(liveId, 1)
      break;
    case 'goods':
      goodsDarkRoom(itemId, 1)
      break;
    case 'liveGoods':
      liveGoodsDarkRoom(itemId, 1)
      break;
    default:
      break;
  }
  ElMessage({
  message: '操作成功',
  type: 'success',
})
  setTimeout(() => {
    getDarkRoomData() //刷新
  }, 1000);
  darkRoomDialog.value = false //隐藏对话框
}

// 退出黑屋
const back = () => {
  router.go(-1)
}

// 适配移动端
let dialogWidth = "30%";
if (!isPC()) {
  dialogWidth = "80%";
}
</script>

<style scoped>
.header{
  padding-top: 20px;
}
.btn {
  display: flex;
  margin-left: 20px;
}
.controlBtn:focus {
  background-color: #fef0f0 !important;
  color: #f78484 !important;
  border-color: #fbc4c4;
}
</style>