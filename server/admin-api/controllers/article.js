const res = require('../../utils/response')
const ArticleModel = require('../../models/create/article')

// 路由处理函数
module.exports = {
    // 获取文章列表
    async articleList(ctx, next) {
        const articleList = await ArticleModel.find()
        ctx.body = res(0, '获取文章列表成功', { articleList })
    },

    // 删除文章
    async delArticle(ctx, next) {
        const { id } = ctx.request.params
        let article = await ArticleModel.findById(id)
        if (!article) { return ctx.body = res(1, '文章不存在') }
        await ArticleModel.findByIdAndDelete(id)
        ctx.body = res(0, '删除文章成功')
    },

    // 获取文章增长
    async articleGrowth(ctx, next) {
        const today = new Date()
        const day = today.setDate(today.getDate() - 7);
        const createTime = { $gte: new Date(day) };

        const articleGrowth = await ArticleModel.aggregate([
            { $match: { createTime } },
            { $project: { everyDay: { $substr: [{ "$add": ["$createTime", 28800000] }, 5, 5] } } },
            {
                $group: {
                    _id: "$everyDay",
                    count: { $sum: 1 }
                }
            },
        ])

        ctx.body = res(0, '获取文章增长成功', { articleGrowth })
    }
}