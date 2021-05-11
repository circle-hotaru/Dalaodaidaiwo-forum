const res = require('../../utils/response')
const UserModel = require('../../models/user')
const ArticleModel = require('../../models/create/article')
const xss = require('xss')

module.exports = {

    // 搜索
    async search(ctx, next) {
        // 参数处理
        let { q = '', type = 0, page = 1, pageSize = 10 } = ctx.request.query
        type = Number(type)
        page = Number(page)
        pageSize = Number(pageSize)
        const skip = (page - 1) * pageSize
        // 搜索条件的正则
        const reg = new RegExp(q)
        // 登录用户的信息
        const { _id, haslogin } = ctx.state.user

        // 只支持搜索文章、问题及用户
        if (![0, 1].includes(type)) { ctx.throw(422, '参数不正确') }

        let searchList = []
        let hasNext = true

        if (type === 0) {
            searchList = await ArticleModel.find({ title: reg })
                .select('+content_html')
                .populate('user tags')
                // 倒序
                .sort({ _id: -1 })
                .skip(skip).limit(pageSize)
                .lean()
            // 判断是否有下一页
            const count = await ArticleModel.countDocuments({ title: reg })
            hasNext = skip + pageSize < count
        } else {
            searchList = await UserModel.find({ username: reg })
                .skip(skip).limit(pageSize)
                .lean()
            // 判断是否有下一页
            const count = await UserModel.countDocuments({ username: reg })
            hasNext = skip + pageSize < count

            // 关注状态判断
            if (!haslogin) {
                // 未登录
                searchList.forEach(item => {
                    item.isOwn = false
                    item.isFollow = false
                })
            } else {
                // 已登录
                const user_login = await UserModel.findById(_id).select('+following')
                const user_login_following = user_login.following.map(id => id.toString())
                // 判断是否已关注, 是否是自己
                searchList.forEach(item => {
                    item.isOwn = false
                    item.isFollow = false
                    if (_id === String(item._id)) {
                        item.isOwn = true
                    }
                    if (user_login_following.includes(String(item._id))) {
                        item.isFollow = true
                    }
                })
            }
        }

        ctx.body = res(0, '获取搜索列表成功', { searchList, hasNext })
    },

}