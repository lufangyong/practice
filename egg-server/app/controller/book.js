const Controller = require('egg').Controller

class BookController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createBook = {
      id: {type: 'string', required: true, allowEmpty: false},
    }
  }

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有数据
  async index() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.book.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 根据id获取某一条数据
  async show() {
    const {ctx, service} = this
    const {id} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.book.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 创建
  async create() {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(this.createBook)
    // 组装参数
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    const res = await service.book.create(payload)
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
    // ctx.validate(this.createBook)
    // 调用 Service 进行业务处理
    const res = await service.book.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除
  async destroy() {
    const {ctx, service} = this
    // 校验参数
    const {id} = ctx.query
    // 调用 Service 进行业务处理
    await service.book.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // ============================== CRUD END ==============================

  // 进行点赞
  async like() {
    const {ctx, service} = this
    const {id} = ctx.request.body

    const res = await service.book.like(id)
    ctx.helper.success({ctx, res, msg: '点赞成功'})
  }

  // 取消点赞
  async cancelLike() {
    const {ctx, service} = this
    const {id} = ctx.request.body

    const res = await service.book.cancelLike(id)
    ctx.helper.success({ctx, res, msg: '取消点赞'})
  }

  // 搜索书籍
  async searchBook() {
    const {ctx, service} = this
    const {title} = ctx.request.query

    const res = await service.book.searchBook(title)
    ctx.helper.success({ctx, res, msg: '成功'})
  }

}

module.exports = BookController
