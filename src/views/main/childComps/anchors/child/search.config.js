export const formItems = [
    { field: 'name',
      type: 'input',
      label: 'anchor',
      placeholder: '请输入网红名称'
    },
    { 
      field: 'selection',
      type: 'select',
      label: '类目',
      placeholder: '请选择商品品类',
      options: [
        { title: '食品', value: '食品' },
        { title: '生鲜', value: '生鲜' },
        { title: '美妆', value: '美妆' },
        { title: '母婴', value: '母婴' },
        { title: '百货', value: '百货' },
        { title: '其他', value: '其他' },
      ]
    },
    { 
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value: '启用' },
        { title: '禁用', value: '禁用' },
      ]
    },
  ]
