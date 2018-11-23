const Controller = require('egg').Controller

class BookDetailController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createBookDetail = {
      id: {type: 'string', required: true, allowEmpty: false},
    }
  }

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有数据
  async index() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.bookDetail.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 根据id获取某一条数据
  async show() {
    const {ctx, service} = this
    const {id} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.bookDetail.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 创建
  async create() {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(this.createBookDetail)
    // 组装参数
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    const res = await service.bookDetail.create(payload)
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
    // ctx.validate(this.createBookDetail)
    // 调用 Service 进行业务处理
    const res = await service.bookDetail.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除
  async destroy() {
    const {ctx, service} = this
    // 校验参数
    const {id} = ctx.query
    // 调用 Service 进行业务处理
    await service.bookDetail.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // ============================== CRUD END ==============================
}

module.exports = BookDetailController
