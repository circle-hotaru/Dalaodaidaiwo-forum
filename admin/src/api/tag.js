import request from '@/utils/request'

export default {
  // 新增标签
  addTag({ data }) {
    return request({
      url: '/tag',
      method: 'post',
      data
    })
  },
  // 更新标签
  updateTag({ id, data }) {
    return request({
      url: `/tag/${id}`,
      method: 'put',
      data
    })
  },
  // 删除标签
  delTag({ id }) {
    return request({
      url: `/tag/${id}`,
      method: 'delete'
    })
  },
  // 获取标签列表
  tagList({ params }) {
    return request({
      url: '/tag',
      method: 'get',
      params
    })
  },
  // 获取某个标签
  itemTag({ id }) {
    return request({
      url: `/tag/${id}`,
      method: 'get'
    })
  },
  // 标签比重
  tagProportion() {
    return request({
      url: '/tag/proportion',
      method: 'get'
    })
  }
}
