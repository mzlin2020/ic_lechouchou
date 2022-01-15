<template>
  <div class="lives">
    <!-- 搜索框 -->
    <ZmForm :formItems="formItems" :formData="formData">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">找直播</h2>
      </template>

      <!-- 尾部 -->
      <template #footer>
        <div class="form-button">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </ZmForm>

    <!-- 表单 -->
    <ZmTable :dataInfo="livesInfo" :livesCount="count.livesCount" v-model:page="pageInfo">
      <!-- 表头列 -->
      <template #headerHandler>
        <el-button plain type="danger" @click="darkRoom">小黑屋</el-button>
      </template>
      <!-- 格式化观众数 -->
      <template #visitNum="scope">
        <div>{{ $filter.formatVisitNum(scope.row.visitNum) }}</div>
      </template>
      <!-- 格式化直播金额 -->
      <template #totalAmount="scope">
        <div>{{ $filter.formatTotalAmount(scope.row.visitNum) }}</div>
      </template>
      <!-- 关进黑屋列 -->
      <template #status="scope">
        <el-button plain type="danger" @click="forbidden(scope.row)">{{forboddenText}}</el-button>
      </template>
      <!-- 带货能力列 -->
      <template #analyze="scope">
        <el-button type="primary" @click="analyze(scope.row)">{{analyzeText}}</el-button>
      </template>
    </ZmTable>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import ZmTable from "./child/zmTable.vue";
import { formItems } from "./child/search.config.js";
import localCache from "@/utils/cache"
import { isPC } from "@/utils/isPc";
import { putInDarkRoom } from '@/network/lives.js'
import { ElMessage } from 'element-plus'
// 一、搜索框逻辑
// 绑定数据
const formData = reactive({
  anchorName: "",
  liveTitle: ""
});

// 重置按钮
const handleResetClick = () => {
  formData.anchorName = ""
  formData.liveTitle = ""
}

// 搜索按钮
const handleSearchClick = () => {
  console.log("搜索");
}

// 二、获取数据的网络请求与分页逻辑
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
});

const store = useStore();
const livesInfo = computed(() => store.state.lives.livesInfo);
const getLivesInfo = (formData = {}) => {
  store.dispatch("lives/getLivesInfoAction", {
    offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
    size: pageInfo.value.pageSize,
    ...formData,
  });
};
getLivesInfo(); //第一次调用获取数据

// 查询直播的数量
let count = reactive({
  livesCount: localCache.getCache("livesCount"),
});

// pageInfo改变时，重新发送网络请求
watch(pageInfo, () => getLivesInfo());


// 三、表格逻辑
// 关进黑屋
const forbidden = (data) => {
  const { liveId } = data
  putInDarkRoom(liveId,0)
  ElMessage({
  message: '操作成功',
  type: 'success',
})
  setTimeout(() => {
    getLivesInfo();  //更新
  }, 400);
  
}
// 直播商品
const analyze = (data) => {
  console.log(data);
}

// 进入黑屋
const darkRoom = () => {
  console.log("进入黑屋");
}

// 四、适配移动端（为了好看些）
let isMobile = !isPC();
let forboddenText = ref('关进黑屋')
let analyzeText = ref('直播商品')
if(isMobile) {
  forboddenText.value = '禁用'
  analyzeText.value = '商品'
}
</script>

<style scoped>
.form-title {
  padding-top: 20px;
}
.form-button {
  text-align: right;
  padding: 0 80px 20px 0;
}
</style>
