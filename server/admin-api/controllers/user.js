const res = require('../../utils/response')
const UserModel = require('../../models/user')

// 路由处理函数
module.exports = {
  // 获取用户列表
  async userList(ctx, next) {
    const userList = await UserModel.find()
    ctx.body = res(0, '获取用户列表成功', { userList })
  },

  // 删除用户
  async delUser(ctx, next) {
    const { id } = ctx.request.params
    let user = await UserModel.findById(id)
    if (!user) { return ctx.body = res(1, '用户不存在') }
    // 删除密保问题
    await UserModel.findByIdAndDelete(id)
    ctx.body = res(0, '删除用户成功')
  },

  // 获取用户增长
  async userGrowth(ctx, next) {
    const today = new Date()
    const day = today.setDate(today.getDate() - 7);
    const createTime = { $gte: new Date(day) };

    const userGrowth = await UserModel.aggregate([
      { $match: { createTime } },
      { $project: { everyDay: { $substr: [{ "$add": ["$createTime", 28800000] }, 5, 5] } } },
      {
        $group: {
          _id: "$everyDay",
          count: { $sum: 1 }
        }
      },
    ])

    ctx.body = res(0, '获取用户增长成功', { userGrowth })
  }

}