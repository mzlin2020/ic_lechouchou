<template>
  <div class="cat-ability">
    <!-- 头部 -->
    <div class="header">
      <el-icon :size="25" color="#655dda" @click="back"><Back/></el-icon>
    </div>
    <!-- 主播信息 -->
    <div class="anchor-content">
      <div class="left"><AnchorImage :tableData="anchorInfo" /></div>
      <div class="right"><AnchorTable :tableData="anchorInfo"/></div>
    </div>
    <!-- 产品类别 -->
    <div class="category-table">
      <CategoryTable :tableData="categoryData" @categorySelection="categorySelection"/>
    </div>
    <!-- echart表格 -->
    <div class="chart">
      <LineEcharts/>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { Back } from "@element-plus/icons-vue"
import AnchorTable  from './child/anchorTable.vue'
import AnchorImage from './child/anchorImage.vue'
import CategoryTable from './child/categoryTable.vue'
import LineEcharts from './child/lineEcharts.vue'
import { getCatAbilityAnchorInfo, getCatAbilityData } from '@/network'
import router from '@/router'

// 获取当前页面的主播id
const route = useRoute()
const { anchorId } = route.params
// 发送网络请求获取数据
// 1.主播数据
let anchorInfo = ref(null)
// 2.直播商品类别数据
let categoryData = ref(null)
const getData = async(anchorId, catName) => {
  const data1 = await getCatAbilityAnchorInfo(anchorId)
  const data2 = await getCatAbilityData(anchorId, catName)
  anchorInfo.value = data1
  categoryData.value = data2
}
getData(anchorId)

// 获取商品类别的选择，重新发送网路请求
const categorySelection = (data) => {
  getData(anchorId, data)
}


// 返回上一页
const back = () => {
  router.go(-1)
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
/* 主播内容 */
.anchor-content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
}

/* 商品类别 */
.category-table {
  border-top: 1px solid #eee;
}

/* 图表 */
.chart {
  margin-top: 20px;
}
</style>