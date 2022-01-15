export const formItems = [
  { 
    field: 'username',
    type: 'input',
    label: '用户账号',
    placeholder: '请输入用户账号'
  },
  { 
    field: 'name',
    type: 'input',
    label: '用户昵称',
    placeholder: '请输入用户昵称'
  },
  { 
    field: 'permissions',
    type: 'select',
    label: '权限等级',
    placeholder: '请选择权限等级',
    options: [
      { title: '1', value: '高级权限' },
      { title: '2', value: '普通权限' },
    ]
  }
]

export const newUserItems = [
  { 
    field: 'username',
    type: 'input',
    label: '用户账号',
    placeholder: '请输入手机号码'
  },
  { 
    field: 'name',
    type: 'input',
    label: '用户昵称',
    placeholder: '请输入用户昵称'
  },
  { 
    field: 'password',
    type: 'input',
    label: '密码',
    placeholder: '6-12位字符'
  }
]

export const updateUserInfo = [
  { 
    field: 'name',
    type: 'input',
    label: '昵称',
    placeholder: '修改昵称'
  },
  { 
    field: 'password',
    type: 'password',
    label: '新密码',
    placeholder: '请输入新密码'
  },
  { 
    field: 'permissions',
    type: 'select',
    label: '权限等级',
    placeholder: '请选择权限等级',
    options: [
      { title: '高级权限', value: '1' },
      { title: '普通权限', value: '2' },
    ]
  }
]