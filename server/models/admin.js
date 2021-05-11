const mongoose = require('./db')

// 后台管理系统用户模型定义
const AdminSchema = mongoose.Schema({
    username: { type: String, trim: true },
    password: {
        type: String,
        // 查询数据时默认不把 password 字段带出来
        select: false,
        // 密码加密
        set(val) { return require('bcryptjs').hashSync(val, 10) }
    },
    // 用户角色，有管理员和访客两种
    role: { type: String, enum: ['admin', 'visitor'], default: 'visitor' }
})

module.exports = mongoose.model('Admin', AdminSchema)
