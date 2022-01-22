//demo 所有的配置书写格式（无任何引用）
export const formItems = [
  {
    field: "name",
    type: "input",
    label: "用户名",
    placeholder: "请输入用户名",
  },
  { field: "password", type: "password", label: "密码", placeholder: "请输入密码" },
  {
    field: "selection",
    type: "select",
    label: "爱好",
    placeholder: "请选择喜欢的运动",
    options: [
      { title: "篮球", value: "basketball" },
      { title: "足球", value: "football" },
    ],
  },
  {
    field: "time",
    type: "datepicker",
    label: "创建时间",
    otherOptions: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      type: "daterange",
    },
  },
];
