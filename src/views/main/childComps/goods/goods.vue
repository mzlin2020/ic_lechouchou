<template>
  <div class="goods">
    <!-- 搜索框 -->
    <ZmForm :formItems="formItems" :formData="formData" :collayout="collayout">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">找商品</h2>
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
        <el-button plain type="danger" @click="forbidden(scope.row)" class="controlBtn">{{ forboddenText }}</el-button>
      </template>
      <!-- 关进黑屋列 -->
      <template #remove="scope">
        <el-button plain type="danger" class="controlBtn" @click="removeGood(scope.row)">删除</el-button>
      </template>
    </ZmTable>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import localCache from "@/utils/cache";
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import ZmTable from "./child/zmTable.vue";
import { isPC } from "@/utils/isPc";
import { formItems } from "./child/search.config.js";
import { ElMessage } from "element-plus";
import { goodsDarkRoom, removeGoodsData } from "@/network";
import router from "@/router";

// 一、搜索框逻辑
// 绑定数据
const formData = reactive({
  title: "",
  catName: "",
  min: "",
  max: "",
});

// 重置按钮
const handleResetClick = () => {
  formData.title = ""
  formData.catName = ""
  formData.min = ""
  formData.max = ""
  getGoodsInfo() 
  setTimeout(() => {
    count.goodsCount = localCache.getCache("goodsCount");
  }, 1000);
};
// 搜索按钮
const handleSearchClick = () => {
  getGoodsInfo(formData)
  setTimeout(() => {
    count.goodsCount = localCache.getCache("goodsCount");
  }, 1000);
};
// 一行显示多少个框
const collayout = {
  xl: 8,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24,
};

// 二、获取数据的网络请求与分页逻辑
const pageInfo = ref({
  currentPage: 1,
  pageSize: 10,
});

const store = useStore();
const goodsInfo = computed(() => store.state.goods.goodsInfo);
const getGoodsInfo = (formData = {}) => {
  store.dispatch("goods/getGoodsInfoAction", {
    offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
    size: pageInfo.value.pageSize,
    ...formData,
  });
};
getGoodsInfo(); //第一次调用获取数据

// 查询商品的数量
let count = reactive({
  goodsCount: localCache.getCache("goodsCount"),
});

// pageInfo改变时，重新发送网络请求
watch(pageInfo, () => getGoodsInfo());

// 关进黑屋操作
const forbidden = (data) => {
  const { itemId } = data;
  goodsDarkRoom(itemId, 0);
  ElMessage({
    message: "操作成功",
    type: "success",
  });
  setTimeout(() => {
    getGoodsInfo(); //更新
  }, 400);
};

// 删除商品操作
const removeGood = (data) => {
  const { itemId } = data;
  removeGoodsData(itemId);
  ElMessage({
    message: "删除成功",
    type: "success",
  });
  setTimeout(() => {
    getGoodsInfo(); //更新
  }, 400);
};

// 进入小黑屋
const darkRoom = () => {
  // 传递参数anchors
  router.push("darkRoom/goods");
};

// 四、适配移动端
let isMobile = !isPC();
let forboddenText = ref("关进黑屋");
if (isMobile) {
  forboddenText.value = "禁用";
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

.controlBtn:focus {
  background-color: #fef0f0 !important;
  color: #f78484 !important;
  border-color: #fbc4c4;
}
</style>
