// 输入框的规则
export const rules = {
  username: [
    {
      required: true,
      message: "账号不能为空~",
      trigger: "blur", //失去焦点时触发
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: "账号必须是符合规范的手机号码！",
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