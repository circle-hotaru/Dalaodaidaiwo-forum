const mongoose = require('../db')

// 文章模型定义
const ArticleSchema = mongoose.Schema({
    // 所属用户
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // 标题
    title: { type: String, trim: true },
    // 内容 (保存 md 和 html 两种格式字符串)
    content_md: { type: String, select: false },
    content_html: { type: String, select: false },
    // 标签
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, {
    // 创建时间和更新时间
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('Article', ArticleSchema)