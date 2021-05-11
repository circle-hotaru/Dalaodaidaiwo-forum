const mongoose = require('../db')

// 用户行为（点赞、点踩、收藏...）模型定义
const ActionSchema = mongoose.Schema({
    // 操作用户
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // 被操作对象
    object: {
        type: String,
        enum: ['Article']
    },
    // 被操作对象ID
    object_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'object'  // 动态关联, 由该模型的 object字段 的值决定关联哪个模型
    },
    // 操作类型
    type: { type: String, enum: ['like', 'collect'] }
}, {
    // 创建时间和更新时间
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('Action', ActionSchema)