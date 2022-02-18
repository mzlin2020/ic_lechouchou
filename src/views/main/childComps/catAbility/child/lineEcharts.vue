<template>
  <div class="line-echarts">
      <div class="base-echart" ref="echartDivRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import * as echarts from 'echarts'
import { useStore } from 'vuex'

const store = useStore()

// 获取dom
const echartDivRef = ref();

let echartInstance = null
onMounted(() => {
  // 初始化
echartInstance = echarts.init(echartDivRef.value)

// 使图表具备响应式
window.addEventListener('resize', () => {
  echartInstance.resize()
})
})

const oprionAction = () => {
  //清除上一次的
  echartInstance.clear()
  const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: store.state.anchors.historyData.legend
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: store.state.anchors.historyData.xAxis
  },
  yAxis: {
    type: 'value'
  },
  series: store.state.anchors.historyData.series
}
  // 设置option(更新option)
  echartInstance.setOption(option)
}

// 网路有延迟，在此处等待一段时间后获取数据，设置设置option
setTimeout(() => {
  oprionAction()
}, 1000);

// 暴露出去
defineExpose({
  oprionAction
})
</script>

<style scoped>
.base-echart {
  width: 100%;
  height: 360px;
}
</style>