const res = require('../../utils/response')
const TagModel = require('../../models/tag')
const ArticleModel = require('../../models/create/article')

// 路由处理中间件
module.exports = {
  // 获取标签列表
  async tagList(ctx, next) {
    const tagList = await TagModel.find().lean()
    ctx.body = res(0, '获取标签列表成功', { tagList })
  },
}
