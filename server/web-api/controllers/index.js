const user = require('./user')
const tag = require('./tag')
const extra = require('./extra')
const article = require('./create/article')
const action = require('./create/action')
const upload = require('../../middlewares/upload')

module.exports = {
    ...user,
    ...tag,
    ...extra,
    ...action,
    ...article,
    upload
}
