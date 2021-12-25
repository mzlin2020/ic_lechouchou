// 输入框的规则
export const rules = {
  username: [
    {
      required: true,
      message: "用户名不能为空~",
      trigger: "blur", //失去焦点时触发
    },
    {
      pattern: /^[a-z0-9]{6,12}$/,
      message: "用户名必须是6-12个字母或者数字！",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空~",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "密码必须是6-12个字母或者数字！",
      trigger: "blur",
    },
  ],
};