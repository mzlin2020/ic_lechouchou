<template>
  <div class="live-goods">
    <!-- 头部 -->
    <div class="header">
      <el-icon :size="25" color="#655dda" @click="back"><Back/></el-icon>
    </div>
    <!-- 标题 -->
    <h2>直播商品信息</h2>
    <div class="liveTitle">
      <div>主播: {{anchorName}}</div>
      <div>直播场次: {{liveTitle}}</div>
    </div>


    <!-- 表格 -->
        <!-- 表单 -->
    <ZmTable :dataInfo="goodsInfo" :goodsCount="count.goodsCount" v-model:page="pageInfo">
      <!-- 表头列 -->
      <template #headerHandler>
        <el-button plain type="danger" @click="darkRoom">小黑屋</el-button>
      </template>
      <!-- 图片 -->
      <template #picUrl="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.picUrl" :preview-src-list="[scope.row.picUrl]">
        </el-image>
      </template>
      <!-- 格式化价格 -->
      <template #zkFinalPrice="scope">
        <div>{{ $filter.formatMedianPrice(scope.row.zkFinalPrice) }}</div>
      </template>
      <!-- 关进黑屋列 -->
      <template #status="scope">
        <el-button plain type="danger" @click="forbidden(scope.row)" class="controlBtn">{{forboddenText}}</el-button>
      </template>
      <!-- 删除列 -->
      <template #remove="scope">
        <el-button plain type="danger" class="controlBtn" @click="removeGood(scope.row)">删除</el-button>
      </template>
    </ZmTable>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex' 
import { useRoute } from 'vue-router'
import localCache from "@/utils/cache"
import ZmTable from "./child/zmTable.vue";
import { isPC } from "@/utils/isPc";
import { Back } from "@element-plus/icons-vue"
import router from '@/router'
import { removeLiveGoodsData, liveGoodsDarkRoom } from '@/network'
import { ElMessage } from 'element-plus'

// 路由传参（获取liveId） 
const route = useRoute()
const { liveInfo } = route.params


// 主播名和直播标题
const store = useStore()
const anchorName = computed(() => store.state.lives.anchorName)
const liveTitle = computed(() => store.state.lives.liveTitle)

// 二、获取数据的网络请求与分页逻辑
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
});
// 查询商品的数量
let count = reactive({
  goodsCount: 0,
});
setTimeout(() => {
  count.goodsCount = localCache.getCache("liveGoodsCount")
}, 1000);
const goodsInfo = computed(() => store.state.lives.liveGoodsInfo);
const getGoodsInfo = (formData = {}) => {
  store.dispatch("lives/getLiveGoodsInfoAction", {
    offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
    size: pageInfo.value.pageSize,
    liveId: liveInfo,
    ...formData,
  });
};
getGoodsInfo(); //第一次调用获取数据
// pageInfo改变时，重新发送网络请求
watch(pageInfo, () => getGoodsInfo());


// 关进黑屋操作
const forbidden = data => {
  const { itemId } = data
  liveGoodsDarkRoom(itemId,0)
  ElMessage({
  message: '操作成功',
  type: 'success',
})
  setTimeout(() => {
    getGoodsInfo(); //更新
  }, 2000);
}

// 删除商品操作
const removeGood = data => {
  const { itemId } = data
  removeLiveGoodsData(itemId)
  ElMessage({
  message: '删除成功',
  type: 'success',
})
  setTimeout(() => {
    getGoodsInfo(); //更新
  }, 2000);
}

// 进入小黑屋
const darkRoom = () => {
    // 传递参数anchors
  router.push('/main/darkRoom/liveGoods')
}

// 返回上一页
const back = () => {
  router.go(-1)
}


// 四、适配移动端
let isMobile = !isPC();
let forboddenText = ref('关进黑屋')
if(isMobile) {
  forboddenText.value = '禁用'
}
</script>

<style scoped>
.header {
  height: 30px;
  display: flex; 
  padding: 5px 0 0 10px;
}
.el-icon {
  cursor: pointer;
}

.liveTitle > div{
  height: 30px;
  line-height: 30px;
}

.controlBtn:focus {
  background-color: #fef0f0 !important;
  color: #f78484 !important;
  border-color: #fbc4c4;
}
</style>