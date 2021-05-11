/** 
 *  Mongodb数据库连接文件
*/
const mongoose = require('mongoose')

/* 
`findOneAndUpdate()` and `findOneAndDelete()` 
等内部会使用findAndModify驱动，驱动即将被废弃，所以弹出警告！
*/
mongoose.set('useFindAndModify', false)

const { dbInfo } = require('../config')

// 连接数据库
mongoose.connect(dbInfo.connectStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // 使用 unique 或者 索引时要加
    useCreateIndex: true
})

mongoose.connection.on('error', (err) => { console.error('数据库连接失败:' + err) })

mongoose.connection.once('open', () => { console.log('数据库连接成功!') })

// 将 mongoose 导出
module.exports = mongoose
