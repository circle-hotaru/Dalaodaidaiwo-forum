import request from '@/utils/request'

export default {
  // 获取文章列表
  articleList() {
    return request({
      url: '/article',
      method: 'get'
    })
  },
  // 删除文章
  delArticle({ id }) {
    return request({
      url: `/article/${id}`,
      method: 'delete'
    })
  },
  // 获取文章增长
  articleGrowth() {
    return request({
      url: '/article/growth',
      method: 'get'
    })
  }
}
