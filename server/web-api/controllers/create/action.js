const res = require('../../../utils/response')
const ArticleModel = require('../../../models/create/article')
const ActionModel = require('../../../models/create/action')
const UserModel = require('../../../models/user')

// 路由处理中间件
module.exports = {

  // 点赞、收藏
  async actionPost(ctx, next) {
    // 参数校验
    ctx.verifyParams({
      object: { type: 'string', required: true },
      type: { type: 'string', required: true }
    })
    // 获取登录用户id、文章/问答id和请求体数据
    const { _id } = ctx.state.user
    const { id } = ctx.request.params
    let { object, type } = ctx.request.body
    // 限制操作类型和操作行为
    const objectType = ['Article']
    const actionType = ['like', 'collect']
    if (!objectType.includes(object) || !actionType.includes(type)) {
      ctx.throw(422, '参数不合法')
    }
    // 判断操作对象是否存在
    let objectItem
    if (object === 'Article') { objectItem = await ArticleModel.findById(id) }
    if (!objectItem) { return ctx.body = res(1, '操作对象不存在') }

    const params = { object, object_id: id, type, user: _id }
    // 判断是否已经点赞、踩或收藏
    const isHave = await ActionModel.findOne(params)
    if (isHave) { return ctx.body = res(1, '重复的操作行为') }

    await ActionModel.create(params)

    ctx.body = res(0, '操作成功')
  },

  // 取消点赞、收藏
  async actionDelete(ctx, next) {
    // 参数校验
    ctx.verifyParams({
      object: { type: 'string', required: true },
      type: { type: 'string', required: true }
    })
    // 获取登录用户id、文章id
    const { _id } = ctx.state.user
    const { id } = ctx.request.params
    let { object, type } = ctx.request.body
    // 限制操作类型和操作行为
    const objectType = ['Article']
    const actionType = ['like', 'collect']
    if (!objectType.includes(object) || !actionType.includes(type)) {
      ctx.throw(422, '参数不合法')
    }
    // 判断操作对象是否存在
    let objectItem
    if (object === 'Article') { objectItem = await ArticleModel.findById(id) }
    if (!objectItem) { return ctx.body = res(1, '操作对象不存在') }

    const params = { object, object_id: id, type, user: _id }
    // 判断是否已经取消点赞、踩或收藏
    const isHave = await ActionModel.findOne(params)
    if (!isHave) { return ctx.body = res(1, '重复的操作行为') }
    // 删除对应数据, 使用deleteMany是为了删除可能存在的重复数据
    await ActionModel.deleteMany(params)

    ctx.body = res(0, '操作成功')
  },

  // 获取登录用户的操作状态
  async status(ctx, next) {
    // 获取文章ID、登录用户的信息及操作对象
    const { id } = ctx.request.params
    const { _id, haslogin } = ctx.state.user
    const { object } = ctx.request.query

    if (!['Article'].includes(object)) { ctx.throw(422, '参数不合法') }
    // 判断操作对象是否存在
    let objectItem
    if (object === 'Article') { objectItem = await ArticleModel.findById(id) }
    if (!objectItem) { return ctx.body = res(2, '操作对象不存在') }

    // 初始化返回的状态对象
    const status = {
      object,
      object_id: id,
      haslogin,
      login_user: '未登录',
      isOwn: false,
      isFollow: false
    }

    if (haslogin) {
      // 判断登录用户是否点赞或收藏
      const params = { user: _id, object, object_id: id }
      const isLike = await ActionModel.findOne({ ...params, type: 'like' })
      const isCollect = await ActionModel.findOne({ ...params, type: 'collect' })
      status.isLike = !!isLike
      status.isCollect = !!isCollect

      // 判断登录用户是否是文章作者
      if (String(objectItem.user) === _id) { status.isOwn = true }
      else {
        // 判断登录用户是否关注了文章作者
        const login_user = await UserModel.findById(_id).select('+following')
        const login_user_following = login_user.following.map(id => id.toString())
        status.login_user = login_user.username
        status.isFollow = login_user_following.includes(objectItem.user._id)
      }

    }

    ctx.body = res(0, '获取用户状态成功', { status })
  }

}