const res = require('../../../utils/response')
const ArticleModel = require('../../../models/create/article')
const ActionModel = require('../../../models/create/action')
const UserModel = require('../../../models/user')
const TagModel = require('../../../models/tag')
const xss = require('xss')

// 路由处理中间件
module.exports = {

  // 获取用户文章列表
  async userAritcleList(ctx, next) {
    // 获取查询用户ID 和 登录用户的信息
    const { id } = ctx.request.params
    const { _id, haslogin } = ctx.state.user

    // 分页处理
    let { page = 1, pageSize = 5 } = ctx.request.query
    page = Number(page)
    pageSize = Number(pageSize)
    const skip = (page - 1) * pageSize

    // 按时间从晚到早排序然后再分页, _id字段是包含了时间意义的
    const articleList = await ArticleModel.find({ user: id })
      .select('+content_html')
      .populate('user tags')
      .sort({ _id: -1 })
      .skip(skip).limit(pageSize)
      .lean()

    // 判断是否有下一页
    const count = await ArticleModel.countDocuments({ user: id })
    const hasNext = skip + pageSize < count

    // 文章状态判断
    if (!haslogin) {
      // 未登录
      articleList.forEach(item => {
        item.isOwn = false
      })
    } else {
      // 已登录
      articleList.forEach(item => {
        item.isOwn = false
        if (_id === String(item.user._id)) {
          item.isOwn = true
        }
      })
    }

    ctx.body = res(0, '获取文章列表成功', { articleList, hasNext })
  },

  // 新增文章
  async addArticle(ctx, next) {
    // 参数校验
    ctx.verifyParams({
      title: { type: 'string', required: true },
      tags: { type: 'array', required: false },
      content_md: { type: 'string', required: true },
      content_html: { type: 'string', required: true }
    })

    const { _id } = ctx.state.user
    const article = ctx.request.body
    // 标识用户 和 xss过滤
    article.user = _id
    article.content_md = xss(article.content_md)
    article.content_html = xss(article.content_html, {
      onIgnoreTagAttr(tag, name, value) {  // 不过滤 class 属性
        if (name.substr(0, 5) === 'class') {
          return name + '="' + xss.escapeAttrValue(value) + '"'
        }
      }
    })

    await ArticleModel.create(article)
    ctx.body = res(0, '新增文章成功')
  },

  // 更新文章
  async updateArticle(ctx, next) {
    // 参数校验
    ctx.verifyParams({
      title: { type: 'string', required: false },
      tags: { type: 'array', required: false },
      content_md: { type: 'string', required: false },
      content_html: { type: 'string', required: false }
    })
    // 获取相关数据
    const { id } = ctx.request.params
    const { _id } = ctx.state.user
    const data = ctx.request.body

    // 文章不存在 或 更新的不是登录用户的文章
    const article = await ArticleModel.findById(id)
    if (!article) { return ctx.body = res(1, '文章不存在') }
    if (String(article.user) !== _id) { ctx.throw(403, '操作失败') }

    // xss过滤
    article.content_md = xss(article.content_md)
    article.content_html = xss(article.content_html, {
      onIgnoreTagAttr(tag, name, value) {  // 不过滤 class 属性
        if (name.substr(0, 5) === 'class') {
          return name + '="' + xss.escapeAttrValue(value) + '"'
        }
      }
    })

    await ArticleModel.findByIdAndUpdate(id, data)
    ctx.body = res(0, '更新文章成功')
  },

  // 删除文章
  async delArticle(ctx, next) {
    const { id } = ctx.request.params
    const { _id } = ctx.state.user

    // 文章不存在 或 删除的不是登录用户的文章
    const article = await ArticleModel.findById(id)
    if (!article) { return ctx.body = res(1, '文章不存在') }
    if (String(article.user) !== _id) { ctx.throw(403, '操作失败') }

    await ArticleModel.findByIdAndDelete(id)
    ctx.body = res(0, '删除文章成功')
  },

  // 获取文章详情
  async getArticle(ctx, next) {
    // 获取查询用户ID 和 登录用户的信息
    const { articleId } = ctx.request.params

    const article = await ArticleModel.findById(articleId)
      .select('+content_md +content_html')
      .populate('tags user')
      .lean()

    if (!article) { return ctx.body = res(1, '该文章不存在') }

    const user_id = article.user._id
    // 计算文章所属用户的 关注和粉丝数
    const user = await UserModel.findById(user_id).select('+following').lean()
    const numFans = await UserModel.countDocuments({ following: user_id })
    article.user.numFollows = user.following.length
    article.user.numFans = numFans
    // 计算文章所属用户的 文章和问答数
    article.user.num_article = await ArticleModel.countDocuments({ user: user_id })
    // 计算文章的 点赞、评论和收藏数
    article.like = await ActionModel.countDocuments({ object: 'Article', object_id: articleId, type: 'like' })
    article.collect = await ActionModel.countDocuments({ object: 'Article', object_id: articleId, type: 'collect' })

    ctx.body = res(0, '获取文章详情成功', { article })
  },

  // 获取文章列表
  async articleList(ctx, next) {
    let { page = 1, pageSize = 10, top = 0 } = ctx.request.query
    page = Number(page)
    pageSize = Number(pageSize)
    top = Number(top)
    const skip = (page - 1) * pageSize

    // https://yimingzhe.github.io/2019/06/05/web02/
    let today = new Date()
    if (top === 0) {
      // 发布时间任意
      createTime = { $lte: Date.now() }
    } else if (top === 2) {
      // 过去2天发布
      day = today.setDate(today.getDate() - 2);
      createTime = { $gte: day };
    } else if (top === 7) {
      // 过去7天发布
      day = today.setDate(today.getDate() - 7);
      createTime = { $gte: day };
    } else if (top === 30) {
      // 过去30天发布
      day = today.setDate(today.getDate() - 30);
      createTime = { $gte: day };
    }

    // 按时间从晚到早排序然后再分页, _id字段是包含了时间意义的
    const articleList = await ArticleModel.find({ createTime })
      .populate('user tags')
      .sort({ _id: -1 })
      .skip(skip).limit(pageSize)
      .lean()

    // 判断是否有下一页
    const count = await ArticleModel.countDocuments()
    const hasNext = skip + pageSize < count

    ctx.body = res(0, '获取文章列表成功', { articleList, hasNext })
  },

  // 标签获取文章列表
  async articleListByTag(ctx, next) {
    const { tag } = ctx.request.params
    let { page = 1, pageSize = 10 } = ctx.request.query
    page = Number(page)
    pageSize = Number(pageSize)
    const skip = (page - 1) * pageSize

    const targetTag = await TagModel.findOne({ name: tag })
    const articleList = await ArticleModel.find({ tags: targetTag._id })
      .populate('user tags')
      .sort({ _id: -1 })
      .skip(skip).limit(pageSize)
      .lean()

    // 判断是否有下一页
    const count = await ArticleModel.countDocuments()
    const hasNext = skip + pageSize < count

    ctx.body = res(0, '获取文章列表成功', { articleList, hasNext })
  }
}
