const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { webSecret } = require('../../config')
const res = require('../../utils/response')
const UserModel = require('../../models/user')
const ArticleModel = require('../../models/create/article')

// 路由处理中间件
module.exports = {

    // 用户登录
    async login(ctx, next) {
        // 参数校验
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })

        const { username, password } = ctx.request.body

        // 查询该用户
        let user = await UserModel.findOne({ username }).select('+password')
        if (!user) { return ctx.body = res(1, '用户不存在') }

        // 用户存在，验证密码
        const isPassword = bcrypt.compareSync(password, user.password)
        if (!isPassword) { return ctx.body = res(1, '密码错误') }

        // 验证成功, 生成token, 有效期为180分钟, 数值被解析成秒计算
        const token = jwt.sign(
            { _id: String(user._id), username: user.username },
            webSecret,
            { expiresIn: 60 * 180 }
        )

        user = await UserModel.findOne({ username })

        ctx.body = res(0, '登录成功', { token, user })

    },

    // 用户注册
    async register(ctx, next) {
        // 参数校验
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
            email: { type: 'string', required: true },
        })

        let { username } = ctx.request.body

        // 去除左右两端空格
        username = username.trim()

        // 判断用户是否已存在
        const hasUser = await UserModel.findOne({ username })
        if (hasUser) { return ctx.body = res(1, '用户已存在') }

        // 不存在即可新建
        const user = await UserModel.create(ctx.request.body)

        ctx.body = res(0, '注册成功', { user })
    },

    // 自定义函数验证token
    async authSelf(ctx, next) {
        // 获取并处理请求头中的token
        const token = String(ctx.request.headers.authorization || ' ').split(' ')[1]
        // 验证token
        await jwt.verify(token, webSecret, async (err, userInfo) => {
            // token无效
            if (err) { return ctx.body = res(2, 'token无效') }
            // token有效, 返回用户信息
            const user = await UserModel.findById(userInfo._id)
            ctx.body = res(0, 'token有效', { user })
        })
    },

    // 获取用户信息
    async getUserInfo(ctx, next) {
        // 获取查询用户ID 和 登录用户的信息
        const { id } = ctx.request.params
        const { _id, haslogin } = ctx.state.user

        const user = await UserModel.findById(id).select('+following').lean()
        const numFans = await UserModel.countDocuments({ following: id })

        if (!user) { return ctx.body = res(1, '用户不存在') }

        // 计算关注数 和 粉丝数
        user.numFollows = user.following.length
        user.numFans = numFans

        // 关注状态判断
        if (!haslogin) {
            // 未登录
            user.isFollow = false
            user.isOwn = false
        } else {
            // 已登录
            user.isFollow = false
            user.isOwn = false
            // 判断是否已关注, 是否是自己
            const user_login = await UserModel.findById(_id).select('+following')
            const user_login_following = user_login.following.map(id => id.toString())
            if (_id === id) {
                user.isOwn = true
            }
            if (user_login_following.includes(id)) {
                user.isFollow = true
            }
        }

        ctx.body = res(0, '获取用户信息成功', { user })
    },

    // 获取标签比重
    async getTagProportion(ctx, next) {
        // 获取查询用户ID的信息
        const { id } = ctx.request.params

        const articleList = await ArticleModel.find({ user: id }, '-_id tags').populate('tags').lean()
        const tagList = new Map()
        for (const item of articleList) {
            for (const tag of item.tags) {
                tagList.has(tag.name) ? tagList.set(tag.name, tagList.get(tag.name) + 1) : tagList.set(tag.name, 1)
            }
        }
        const tagProportion = []
        tagList.forEach((value, key) => {
            tagProportion.push({ name: key, value: value })
        })

        ctx.body = res(0, '获取标签比重成功', { tagProportion })
    },
    // 更新用户信息
    async updateUserInfo(ctx, next) {
        // 参数校验
        ctx.verifyParams({
            username: { type: 'string', required: true },
            email: { type: 'string', required: false },
            avatar: { type: 'string', required: false },
            sex: { type: 'string', required: false },
            summary: { type: 'string', required: false },
            website_url: { type: 'string', required: false },
            github_url: { type: 'string', required: false },
            job: { type: 'string', required: false },
        })
        // 获取当前登录的用户
        const { _id } = ctx.state.user
        const { username } = ctx.request.body

        // 如果传了用户名需要判断是否已存在
        if (username) {
            let hasUser = await UserModel.findOne({ username })
            if (hasUser && String(hasUser._id) !== _id) { return ctx.body = res(1, '用户名已存在') }
        }
        // 更新用户信息
        await UserModel.findByIdAndUpdate(_id, ctx.request.body)
        const user = await UserModel.findById(_id).lean()

        ctx.body = res(0, '更新用户信息成功', { user })
    },

    // 获取关注列表
    async followsList(ctx, next) {
        // 获取查询用户ID 和 登录用户的信息
        const { id } = ctx.request.params
        const { _id, haslogin } = ctx.state.user

        // 分页处理
        let { page = 1, pageSize = 10 } = ctx.request.query
        page = Number(page)
        pageSize = Number(pageSize)
        const skip = (page - 1) * pageSize

        // 查找要获取关注列表的用户，并关联查询被关注者的详细信息
        const user = await UserModel.findById(id).select('+following').populate('following').lean()
        if (!user) { return ctx.body = res(2, '用户不存在') }

        // 计算是否有下一页
        const count = user.following.length
        const hasNext = skip + pageSize < count
        // 分页截取
        user.following = user.following.slice(skip, skip + pageSize)

        // 关注状态判断
        if (!haslogin) {
            // 未登录
            user.following.forEach(item => {
                item.isOwn = false
                item.isFollow = false
            })
        } else {
            // 已登录
            const user_login = await UserModel.findById(_id).select('+following')
            const user_login_following = user_login.following.map(id => id.toString())
            // 判断是否是自己，是否已关注
            user.following.forEach(item => {
                item.isOwn = false
                item.isFollow = false
                if (_id === String(item._id)) {
                    item.isOwn = true
                }
                if (user_login_following.includes(String(item._id))) {
                    item.isFollow = true
                }
            })
        }

        const followsList = user.following
        ctx.body = res(0, '获取关注列表成功', { followsList, hasNext })
    },

    // 获取粉丝列表
    async fansList(ctx, next) {
        // 获取查询用户ID 和 登录用户的信息
        const { id } = ctx.request.params
        const { _id, haslogin } = ctx.state.user

        // 分页处理
        let { page = 1, pageSize = 10 } = ctx.request.query
        page = Number(page)
        pageSize = Number(pageSize)
        const skip = (page - 1) * pageSize

        // 查询用户 following数组中包含 id 的用户信息, 即是 id用户的粉丝
        const fansList = await UserModel.find({ following: id }).skip(skip).limit(pageSize).lean()

        // 判断是否有下一页
        const count = await UserModel.countDocuments({ following: id })
        const hasNext = skip + pageSize < count

        // 关注状态判断
        if (!haslogin) {
            // 未登录
            fansList.forEach(item => {
                item.isOwn = false
                item.isFollow = false
            })
        } else {
            // 已登录
            const user_login = await UserModel.findById(_id).select('+following')
            const user_login_following = user_login.following.map(id => id.toString())
            // 判断是否是自己，是否已关注
            fansList.forEach(item => {
                item.isOwn = false
                item.isFollow = false
                if (_id === String(item._id)) {
                    item.isOwn = true
                }
                if (user_login_following.includes(String(item._id))) {
                    item.isFollow = true
                }
            })
        }

        ctx.body = res(0, '获取粉丝列表成功', { fansList, hasNext })
    },

    // 关注某人
    async followUser(ctx, next) {
        // 被关注者ID、关注者ID
        const { id } = ctx.request.params
        const { _id } = ctx.state.user

        // 查找两者的信息
        const me = await UserModel.findById(_id).select('+following')
        const you = await UserModel.findById(id)
        // 被关注者不存在 或 关注的是自己
        if (!you) { return ctx.body = res(1, '被关注用户不存在') }
        if (id === _id) { return ctx.body = res(1, '不能关注自己') }

        /* 
            判断是否已经关注过
            需要将 following 字段中存的 id 先转换为字符串, 因为
            存进去的是 mongoose 自定义的 ObjectId 类型, 遍历调用 toString() / String() 处理即可
            或者 me.following.map(id => mongoose.Types.ObjectId(id)) 
        */
        if (me.following.map(id => id.toString()).includes(id)) {
            return ctx.body = res(1, '已经关注过该用户')
        }
        // 往 following 字段前面添加被关注者的ID
        me.following.unshift(id)
        await me.save()

        ctx.body = res(0, '关注成功')
    },

    // 取消关注某人
    async unfollowUser(ctx, next) {
        // 被取关者ID、取关者ID
        const { id } = ctx.request.params
        const { _id } = ctx.state.user
        // 查找取关者的信息
        const me = await UserModel.findById(_id).select('+following')
        // 查找被取关的人索引
        const index = me.following.map(id => id.toString()).indexOf(id)
        // 并没有关注这个人
        if (index < 0) { return ctx.body = res(1, '操作失败') }

        // 删除被取消关注者的 ID
        me.following.splice(index, 1)
        await me.save()

        ctx.body = res(0, '取消关注成功')
    }

}