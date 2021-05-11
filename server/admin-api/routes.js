const Router = require('@koa/router')
const koaJwt = require('koa-jwt')
const handle = require('./controllers/index')
const { adminSecret } = require('../config')
const judge = require('../middlewares/judge')

// 实例化路由对象，并设置路由前缀
const router = new Router({ prefix: '/api/admin' })

// 使用koa-jwt 生成验证token 的中间件函数
const auth = koaJwt({ secret: adminSecret })

// 文件上传
router.post('/upload/:mime/:type?', auth, handle.upload)

// 管理员
router.post('/login', handle.login)
router.post('/auth', auth, handle.auth)

router.get('/admin', handle.adminList)
router.get('/admin/:id', handle.itemAdmin)

router.put('/admin/:id', auth, judge, handle.updateAdmin)
router.delete('/admin/:id', auth, judge, handle.delAdmin)
router.post('/admin', auth, judge, handle.addAdmin)

// 文章
router.get('/article', handle.articleList)
router.get('/article/growth', handle.articleGrowth)
router.delete('/article/:id', auth, judge, handle.delArticle)

// 标签
router.get('/tag', handle.tagList)
router.get('/tag/proportion', handle.getTagProportion)
router.get('/tag/:id', handle.itemTag)

router.put('/tag/:id', auth, judge, handle.updateTag)
router.delete('/tag/:id', auth, judge, handle.delTag)
router.post('/tag', auth, judge, handle.addTag)

// 用户
router.get('/user', handle.userList)
router.get('/user/growth', handle.userGrowth)
router.delete('/user/:id', auth, judge, handle.delUser)

module.exports = router