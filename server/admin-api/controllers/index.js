const admin = require('./admin')
const article = require('./article')
const tag = require('./tag')
const user = require('./user')
const upload = require('../../middlewares/upload')

// 整合多个模块的控制器并导出
module.exports = {
  ...admin,
  ...article,
  ...tag,
  ...user,
  upload
}