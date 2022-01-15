import { request } from './request'

// 注册
export const register = async(newUserData) => {
  const res = await request({
    url: 'admin_user/register',
    data: newUserData,
    method: 'post'
  })
  if(!res) {
    alert("注册失败，请检查输入是否有误")
  }else {
    alert("注册成功")
  }
}
// 删除用户
export const remove = async(username) => {
  const res = await request({
    url: 'admin_user',
    params: {
      username
    },
    method: 'delete'
  })
  if(!res) {
    alert("更新失败，请检查输入是否有误")
  }else {
    alert("修改成功")
  }
}

// 更新用户信息
export const update = async(updateUserData) => {
  const res = await request({
    url: 'admin_user',
    params: {
      username: updateUserData.username,
      name: updateUserData.name,
      password: updateUserData.password,
      permissions: updateUserData.permissions,
      isPasswordChange: updateUserData.isPasswordChange
    },
    method: 'put'
  })
  if(!res) {
    alert("更新失败，请检查输入是否有误")
  }else {
    alert("修改成功")
  }
}