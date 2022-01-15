export const formItems = [
    { field: 'name',
      type: 'input',
      label: '主播名',
      placeholder: '请输入网红名称'
    },
    { 
      field: 'selection',
      type: 'select',
      label: '粉丝数',
      placeholder: '请选择粉丝数范围',
      options: [
        { title: '5000W以上', value: '5000W以上' },
        { title: '1000W-5000W', value: '1000W-5000W' },
        { title: '500W-1000W', value: '500W-1000W' },
        { title: '100W-500W', value: '100W-500W' },
        { title: '50W-100W', value: '50W-100W' },
        { title: '1W-50W', value: '1W-50W' },
        { title: '小于10000', value: '小于10000' },
      ]
    },
  ]
