const Router = require('@koa/router')
const koaJwt = require('koa-jwt')
const { webSecret } = require('../config.js')
const handle = require('./controllers/index.js')
const checklogin = require('../middlewares/check-login')

// 实例化路由对象，并设置路由前缀 
const router = new Router({ prefix: '/api/web' })

// 使用 koa-jwt 生成验证 token 的中间件函数
const auth = koaJwt({ secret: webSecret })

// 文件上传
router.post('/upload/:mime/:type?', auth, handle.upload)

// 用户
router.post('/login', handle.login)
router.post('/register', handle.register)

router.post('/auth-self', handle.authSelf)

router.get('/user/:id', checklogin, handle.getUserInfo)
router.put('/user', auth, handle.updateUserInfo)

router.get('/:id/user-tag', handle.getTagProportion)

router.get('/:id/user-follows', checklogin, handle.followsList)
router.get('/:id/user-fans', checklogin, handle.fansList)
router.put('/user-follow/:id', auth, handle.followUser)
router.delete('/user-follow/:id', auth, handle.unfollowUser)

// 标签
router.get('/tag', handle.tagList)

// 搜索
router.get('/search', checklogin, handle.search)

// 文章
router.get('/:id/user-article', checklogin, handle.userAritcleList)
router.get('/article/:articleId', checklogin, handle.getArticle)
router.post('/article', auth, handle.addArticle)
router.put('/article/:id', auth, handle.updateArticle)
router.delete('/article/:id', auth, handle.delArticle)

// 获取文章列表
router.get('/articles', handle.articleList)
router.get('/articles/:tag', handle.articleListByTag)

// 赞、收藏、用户操作状态
router.post('/action/:id', auth, handle.actionPost)
router.put('/action/:id', auth, handle.actionDelete)
router.get('/status/:id', checklogin, handle.status)

module.exports = router