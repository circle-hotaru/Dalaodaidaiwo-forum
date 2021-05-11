const res = require('../../utils/response')
const TagModel = require('../../models/tag')
const ArticleModel = require('../../models/create/article')

// 路由处理函数
module.exports = {

	// 获取标签列表
	async tagList(ctx, next) {
		// 分页处理
		let { page = 1, pageSize = 5 } = ctx.request.query
		page = Number(page)
		pageSize = Number(pageSize)
		const skip = (page - 1) * pageSize

		const total = await TagModel.countDocuments()
		const tagList = await TagModel.find().skip(skip).limit(pageSize)

		ctx.body = res(0, '获取标签成功', { total, tagList })
	},

	// 获取某个标签
	async itemTag(ctx, next) {
		const { id } = ctx.request.params
		const tag = await TagModel.findById(id)
		if (!tag) { return ctx.body = res(1, '标签不存在') }

		ctx.body = res(0, '获取标签详情成功', { tag })
	},

	// 添加标签
	async addTag(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			// 无论是 true 还是 false, 都不能为 '', 否则校验失败
			name: { type: 'string', required: true },
			icon: { type: 'string', required: false },
		})

		let { name } = ctx.request.body

		// 校验名字是否合法
		name = name.trim()
		if (!name) { ctx.throw(422, '参数不合法') }

		// isHave 用于标记标签是否已存在, tag是添加后返回的标签信息
		let isHave, tag
		// 根据 parent的值判断添加的是一级标签还是二级标签

		// 一级标签不能同名, 一级和二级可以同名
		isHave = await TagModel.findOne({ name })
		if (isHave) { return ctx.body = res(1, '该标签已存在') }

		tag = await TagModel.create(ctx.request.body)

		ctx.body = res(0, '新增标签成功', { tag })
	},

	// 更新标签
	async updateTag(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			// 为 false时可以不传，如果传了就不能为 '' 值, 否则校验失败
			name: { type: 'string', required: false },
			icon: { type: 'string', required: false },
		})

		const { name, icon } = ctx.request.body
		const { id } = ctx.request.params

		// 三个参数都没传
		if (!name && !icon) { return ctx.throw(422, '参数不合法') }

		const hasTag = await TagModel.findById(id)
		if (!hasTag) { return ctx.body = res(1, '标签不存在') }

		let isHave, tag
		isHave = await TagModel.findOne({ name })
		if (isHave) { return ctx.body = res(1, '该标签已存在') }

		await TagModel.findByIdAndUpdate(id, ctx.request.body)
		tag = await TagModel.findById(id)


		ctx.body = res(0, '更新标签成功', { tag })
	},

	// 删除标签
	async delTag(ctx, next) {
		const { id } = ctx.request.params
		// 查询要删除的标签
		let tag = await TagModel.findById(id)
		if (!tag) { return ctx.body = res(1, '标签不存在') }

		await TagModel.findByIdAndDelete(id)
		ctx.body = res(0, '删除标签成功')
	},

	// 获取标签比重
	async getTagProportion(ctx, next) {

		const articleList = await ArticleModel.find({}, '-_id tags').populate('tags').lean()

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
}