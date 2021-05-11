import request from '@/utils/request'

export default {
  // 获取用户列表
  userList() {
    return request({
      url: '/user',
      method: 'get'
    })
  },
  // 删除用户
  delUser({ id }) {
    return request({
      url: `/user/${id}`,
      method: 'delete'
    })
  },
  // 获取用户增长
  userGrowth() {
    return request({
      url: '/user/growth',
      method: 'get'
    })
  }
}
