const mongoose = require('./db')
const { d_avatar } = require('../config')

// 用户模型定义
const UserSchema = mongoose.Schema({
    // 用户名
    username: { type: String, trim: true },
    // 密码
    password: {
        type: String,
        select: false,
        // 密码加密
        set(val) { return require('bcryptjs').hashSync(val, 10) }
    },
    //邮箱
    email: { type: String },
    // 性别
    sex: { type: String, enum: ['male', 'female', 'unisex'] },
    // 头像
    avatar: { type: String, default: d_avatar },
    // 个人介绍
    summary: { type: String },
    // 职位
    job: { type: String },
    // 公司
    company: { type: String },
    // 居住地
    location: { type: String },
    // github
    github_url: { type: String },
    // 个人网页
    website_url: { type: String },
    // 关注的人
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        select: false
    }
}, {
    // 创建时间和更新时间
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
})

module.exports = mongoose.model('User', UserSchema)
