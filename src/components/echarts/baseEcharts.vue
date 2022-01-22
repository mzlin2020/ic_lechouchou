<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import useEchart from "./hook/useEcharts";

const props = defineProps({
  width: {
    type: String,
    default() {
      return "100%";
    },
  },
  height: {
    type: String,
    default() {
      return "360px";
    },
  },
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});

// 获取dom
const echartDivRef = ref();
onMounted(() => {
  // 初始化并设置options
  const { setOptions } = useEchart(echartDivRef.value);
  setOptions(props.options);
});
</script>

<style scoped></style>
