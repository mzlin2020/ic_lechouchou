<template>
  <div class="admin-register">
    <ZmForm :formItems="formItems" :formData="formData">
      <!-- 标题 -->
      <template #header>
        <h2 class="form-title">用户管理</h2>
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
    <zmTable :dataInfo="dataInfo">
      <!-- 表头列 -->
      <template #headerHandler>
        <el-button type="primary" @click="showDialog">创建用户</el-button>
      </template>
      <!-- 更新时间列 -->
      <template #regTime="scope">
        <div>{{ $filter.formatTime(scope.row.regTime) }}</div>
      </template>
      <!-- 操作列 -->
      <template #action1="scope">
        <el-button type="text" @click="editUser(scope.row)">
          <el-icon size="16"><Edit /></el-icon>
          修改
        </el-button>
      </template>
      <!-- 操作列 -->
      <template #action2="scope">
        <el-button type="text" @click="BoforeDeleteUser(scope.row)">
          <el-icon size="16"><Delete /></el-icon>
          删除
        </el-button>
      </template>
    </zmTable>

    <!-- 创建用户对话框 -->
    <div class="dialog">
      <el-dialog v-model="dislogVisible" title="注册用户" :width="dialogWidth" center>
        <ZmForm :formItems="newUserItems" :formData="newUserData" :collayout="collayout" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dislogVisible = false">取消</el-button>
            <el-button @click="registerUser" type="primary" plain>确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 修改的对话框 -->
    <div class="dialog">
      <el-dialog v-model="isUpdateUser" title="信息修改" :width="dialogWidth" center>
        <ZmForm :formItems="updateUserInfo" :formData="updateUserData" :collayout="collayout" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isUpdateUser = false">取消</el-button>
            <el-button @click="updateInfo" type="primary" plain>确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 确认删除的对话框 -->
    <div class="dialog">
      <el-dialog v-model="isRemoveUserDialog" title="删除用户" :width="dialogWidth" center>
        <span>是否确定删除该用户</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isRemoveUserDialog = false">取消</el-button>
            <el-button @click="removeUser" type="primary" plain>确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import ZmForm from "@/components/zmForm-UI/zmForm.vue";
import zmTable from "./child/zmTable.vue";
import { register, update, remove } from "@/network/admin";
import { Delete, Edit } from "@element-plus/icons-vue";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { isPC } from "@/utils/isPc";
import { formItems, newUserItems, updateUserInfo } from "./child/search.config.js";

// 一、搜索框的逻辑代码
// 获取用户数据
const store = useStore();
const getUserData = () => {
  store.dispatch("admin/getUserDataAction");
};
getUserData();
const dataInfo = computed(() => store.state.admin.userData);

// 输入框中双向绑定的数据(搜索框与创建用户)
const formData = reactive({
  username: "",
  name: "",
  permissions: "",
});
// 重置
const handleResetClick = () => {
  formData.username = "";
  formData.name = "";
  formData.permissions = "";
  getUserData();
};
//搜索
const handleSearchClick = () => {
  console.log("搜索");
};

// 二、表格的逻辑代码
// 删除
let isRemoveUserDialog = ref(false);
let willingRmoveUsername = ref("");
const BoforeDeleteUser = (row) => {
  // 获取用户账号,并根据账号去服务器进行删除
  let { username } = row;
  willingRmoveUsername.value = username;
  isRemoveUserDialog.value = true;
};
const removeUser = () => {
  remove(willingRmoveUsername.value);
  isRemoveUserDialog.value = false;
  setTimeout(() => {
    //更新
    getUserData();
  }, 1000);
};


// 编辑
const updateUserData = reactive({
  username: "",
  name: "",
  password: "",
  permissions: "",
  row: "",
  isPasswordChange: false,
});
const isUpdateUser = ref(false);
const editUser = (row) => {
  isUpdateUser.value = true;
  const { name, permissions, password, username } = row;
  (updateUserData.name = name), (updateUserData.permissions = permissions);
  updateUserData.username = username;
  updateUserData.password = password;
  updateUserData.row = row;
};
const updateInfo = () => {
  isUpdateUser.value = false;
  // 判断用户是否改了密码
  if (updateUserData.password !== updateUserData.row.password) {
    updateUserData.isPasswordChange = true;
  }
  console.log("---", updateUserData);
  update(updateUserData);
  setTimeout(() => {
    //更新
    getUserData();
  }, 1000);
};

// 三、对话框逻辑(创建用户)
let dislogVisible = ref(false);
const showDialog = () => {
  dislogVisible.value = true;
};
const newUserData = reactive({
  username: "",
  name: "",
  password: "",
});
const collayout = {
  xl: 1,
};
// 注册用户
const registerUser = async () => {
  dislogVisible.value = false;
  register(newUserData);
  setTimeout(() => {
    //更新
    getUserData();
  }, 1000);
};
// 四、适配移动端
let dialogWidth = "30%";
if (!isPC()) {
  dialogWidth = "80%";
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
