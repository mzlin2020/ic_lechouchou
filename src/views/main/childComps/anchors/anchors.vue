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
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </ZmForm>
    <ZmTable :dataInfo="anchorsInfo">
      <!-- 图片 -->
      <template #image="scope">
        <el-image 
        style="width: 60px; height: 60px" 
        :src="scope.row.avatar" 
        :preview-src-list="[scope.row.avatar]">
        </el-image>
      </template>
      <!-- 状态列 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '关进黑屋' }}</el-button
        >
      </template>
    </ZmTable>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import ZmForm from "@/components/zmForm-UI/zmFrom.vue";
import ZmTable from "./child/zmTable.vue";
import { formItems } from "./child/search.config.js";
import { useStore } from "vuex";

// 绑定数据
const formData = reactive({
  name: "",
  selection: "",
  status: "",
});
// 发送网络请求，获取数据(保存到vuex)
const store = useStore();
store.dispatch("anchors/getAnchorsInfoAction", {
  offset: 0,
  size: 10,
});
const anchorsInfo = computed(() => store.state.anchors.anchorsInfo);
// 重置按钮（1、清空formData 2、发送网络请求返回原先的数据）
const handleResetClick = () => {
  (formData.name = ""), (formData.selection = ""), (formData.status = "");
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