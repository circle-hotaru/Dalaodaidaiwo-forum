const mongoose = require('./db')
const { d_tag } = require('../config')

// 标签模型定义
const TagSchema = mongoose.Schema({
    // 标签名字
    name: { type: String, trim: true },
    // 图标
    icon: { type: String, default: d_tag },
})

module.exports = mongoose.model('Tag', TagSchema)
