/** 
 * 登录检查中间件 
 * 用于在获取数据时标记登录与否
 * 无论登录与否，都会调用下一个中间件！
*/
const jwt = require('jsonwebtoken')
const { webSecret } = require('../config')

const checklogin = async (ctx, next) => {
    // 获取并处理请求头中的token
    const token = String(ctx.request.headers.authorization || ' ').split(' ')[1]
    // 验证token
    await jwt.verify(token, webSecret, async (err, userInfo) => {
        // token无效时, userInfo是undefined
        ctx.state.user = userInfo || {}
        if (err) {
            ctx.state.user.haslogin = false
        } else {
            ctx.state.user.haslogin = true
        }
        await next()
    })
}

module.exports = checklogin
