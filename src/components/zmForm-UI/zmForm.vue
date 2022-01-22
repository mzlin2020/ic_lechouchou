<template>
  <div class="zm-form">
    <!-- 头部插槽 -->
    <slot name="header"></slot>
    <!-- 表单部分 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="collayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <!-- v-if决定是否展示文本输入，还是密码输入 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <!-- 决定是否展示多选框 -->
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%" v-model="formData[`${item.field}`]">
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value">{{
                    option.title
                  }}</el-option>
                </el-select>
              </template>
              <!-- 决定是否显示时间范围 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
              <!-- 决定是否显示按范围搜索 -->
              <template v-else-if="item.type === 'countpicker'">
                <span>
                  <el-input style="width: 40%" :placeholder="item.placeholder1" v-model="formData[`${item.field1}`]" />
                  &nbsp;至&nbsp;
                  <el-input style="width: 40%" :placeholder="item.placeholder2" v-model="formData[`${item.field2}`]" />
                </span>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 尾部插槽 -->
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { isPC } from "@/utils/isPc";
defineProps({
  formItems: {
    type: Array,
    default() {
      return [];
    },
  },
  formData: {
    type: Object,
    required: true,
  },
  // 响应式表单
  collayout: {
    type: Object,
    default() {
      return {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      };
    },
  },
});
// 部分样式
let labelWidth = "70px";
let itemStyle = {
  padding: "0px 10px",
};
// 根据不同的平台改变样式
if (isPC()) {
  labelWidth = "70px";
  itemStyle = {
    padding: "0px 40px",
  };
}
</script>

<style></style>
