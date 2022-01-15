<template>
  <div class="anchors">
    <ZmForm :formItems="formItems" :formData="formData">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">找主播</h2>
      </template>

      <!-- 尾部 -->
      <template #footer>
        <div class="form-button">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </ZmForm>
    <ZmTable :dataInfo="anchorsInfo" v-model:page="pageInfo" :anchorsCount="count.anchorsCount">
      <!-- 表头列 -->
      <template #headerHandler>
        <el-button plain type="danger" @click="darkRoom">小黑屋</el-button>
      </template>
      <!-- 图片 -->
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.picUrl" :preview-src-list="[scope.row.picUrl]">
        </el-image>
      </template>
      <!-- 格式化粉丝数 -->
      <template #fansNum="scope">
        <div>{{ $filter.formatFansNum(scope.row.fansNum) }}</div>
      </template>
      <!-- 格式化客单价 -->
      <template #medianPrice="scope">
        <div>{{ $filter.formatMedianPrice(scope.row.medianPrice) }}</div>
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
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import ZmTable from "./child/zmTable.vue";
import { formItems } from "./child/search.config.js";
import { useStore } from "vuex";
import localCache from "@/utils/cache";
import { isPC } from "@/utils/isPc";
import { putInDarkRoom } from '@/network/anchor.js'
import { ElMessage } from 'element-plus'
import router from '@/router'


// 一、表单相关逻辑
// 表单绑定数据
const formData = reactive({
  name: "",
  selection: "",
  status: "",
});

// 双向绑定分页组件中的内容
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
});

// 二、网络请求相关

// 发送网络请求，获取数据(保存到vuex)
const store = useStore();
const anchorsInfo = computed(() => store.state.anchors.anchorsInfo);
const getAnchorsInfo = (formData = {}) => {
  store.dispatch("anchors/getAnchorsInfoAction", {
    offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
    size: pageInfo.value.pageSize,
    ...formData,
  });
};
getAnchorsInfo(); //第一次调用获取数据

// 查询网红的数量
let count = reactive({
  anchorsCount: localCache.getCache("anchorsCount"),
});

// pageInfo改变时，重新发送网络请求
watch(pageInfo, () => getAnchorsInfo());

// 重置按钮（1、清空formData 2、发送网络请求返回原先的数据）
const handleResetClick = () => {
  (formData.name = ""), (formData.selection = ""), (formData.status = "");
  getAnchorsInfo(); //复原
  setTimeout(() => {
    count.anchorsCount = localCache.getCache("anchorsCount");
  }, 1000);
};

// 搜索按钮
const handleSearchClick = async () => {
  getAnchorsInfo(formData);
  setTimeout(() => {
    count.anchorsCount = localCache.getCache("anchorsCount");
  }, 1000);
};


// 三、表格逻辑
// 关进黑屋
const forbidden = (data) => {
  const { anchorId } = data
  putInDarkRoom(anchorId,0)
  ElMessage({
  message: '操作成功',
  type: 'success',
})
  setTimeout(() => {
    getAnchorsInfo(); //更新
  }, 400);
}

// 带货分析
const analyze = (data) => {
  console.log(data);
}

// 进入黑屋
const darkRoom = () => {
  // 传递参数anchors
  router.push('darkRoom/anchors')
}

// 四、适配移动端（为了好看些）
let isMobile = !isPC();
let forboddenText = ref('关进黑屋')
let analyzeText = ref('带货能力')
if(isMobile) {
  forboddenText.value = '禁用'
  analyzeText.value = '分析'
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
