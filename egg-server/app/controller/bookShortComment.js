const Controller = require('egg').Controller

class BookShortCommentController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createBookShortComment = {
      bookId: {type: 'number', required: true, allowEmpty: false},
      content: {type: 'string', required: true, allowEmpty: false},
    }
  }

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有数据
  async index() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.bookShortComment.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 根据id获取某一条数据
  async show() {
    const {ctx, service} = this
    const {id} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.bookShortComment.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 创建
  async create() {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(this.createBookShortComment)
    // 组装参数
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    const res = await service.bookShortComment.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 更新
  async update() {
    const {ctx, service} = this
    // 组装参数
    const {id} = ctx.query
    const payload = ctx.request.body || {}

    // 校验参数
    // ctx.validate(this.createBookShortComment)
    // 调用 Service 进行业务处理
    const res = await service.bookShortComment.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除
  async destroy() {
    const {ctx, service} = this
    // 校验参数
    const {id} = ctx.query
    // 调用 Service 进行业务处理
    await service.bookShortComment.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // ============================== CRUD END ==============================
}

module.exports = BookShortCommentController
