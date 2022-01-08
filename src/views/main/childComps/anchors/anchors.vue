<template>
  <div class="anchors">
    <ZmForm :formItems="formItems" :formData="formData">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">网红信息</h2>
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
      <!-- 图片 -->
      <template #image="scope">
        <el-image style="width: 60px; height: 60px" :src="scope.row.picUrl" :preview-src-list="[scope.row.picUrl]">
        </el-image>
      </template>
      <!-- 状态列 -->
      <template #status="scope">
        <el-button plain size="default" :type="scope.row.status ? 'success' : 'danger'">{{
          scope.row.status ? "启用" : "关进黑屋"
        }}</el-button>
      </template>
      <!-- 格式化粉丝数 -->
      <template #fansNum="scope">
        <div>{{ $filter.formatFansNum(scope.row.fansNum) }}</div>
      </template>
      <!-- 格式化客单价 -->
      <template #medianPrice="scope">
        <div>{{ $filter.formatMedianPrice(scope.row.medianPrice) }}</div>
      </template>
    </ZmTable>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch } from "vue";
import ZmForm from "@/components/zmForm-UI/zmFrom.vue";
import ZmTable from "./child/zmTable.vue";
import { formItems } from "./child/search.config.js";
import { useStore } from "vuex";
import localCache from "@/utils/cache";

// 绑定数据
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
