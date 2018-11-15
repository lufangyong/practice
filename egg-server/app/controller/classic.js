const Controller = require('egg').Controller

class ClassicController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createClassic = {
      id: {type: 'string', required: true, allowEmpty: false},
      content: {type: 'string', required: true, allowEmpty: false}
    }
  }

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有期刊
  async index() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.classic.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取某一期期刊
  async show() {
    const {ctx, service} = this
    const {id} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.classic.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 创建一条期刊
  async create() {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(this.createClassic)
    // 组装参数
    const payload = ctx.request.body || {}
    // console.log('body', payload);
    // 调用 Service 进行业务处理
    const res = await service.classic.create(payload)
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
    // ctx.validate(this.createClassic)
    // 调用 Service 进行业务处理
    const res = await service.classic.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 删除
  async destroy() {
    const {ctx, service} = this
    // 校验参数
    const {id} = ctx.query
    // 调用 Service 进行业务处理
    await service.classic.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // ============================== CRUD END ==============================

  // 获取最新的一期
  async findLatest() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.classic.findLatest()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取当前一期的下一期
  async findNext() {
    const {ctx, service} = this
    const {index} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.classic.findNext(index)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取当前一期的上一期
  async findPrevious() {
    const {ctx, service} = this
    const {index} = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.classic.findPrevious(index)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取某一期详细信息
  async findDetail() {
    const {ctx, service} = this
    const payload = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.classic.findDetail(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取点赞信息
  async findFavor() {
    const {ctx, service} = this
    const payload = ctx.params

    // 调用 Service 进行业务处理
    const res = await service.classic.findFavor(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 获取我喜欢的期刊
  async findFavorAll() {
    const {ctx, service} = this
    const payload = ctx.query

    // 调用 Service 进行业务处理
    const res = await service.classic.findFavorAll(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 进行点赞
  async like() {
    const {ctx, service} = this
    const {id} = ctx.request.body

    const res = await service.classic.like(id)
    ctx.helper.success({ctx, res, msg: '点赞成功'})
  }

  // 取消点赞
  async cancelLike() {
    const {ctx, service} = this
    const {id} = ctx.request.body

    const res = await service.classic.cancelLike(id)
    ctx.helper.success({ctx, res, msg: '取消点赞'})
  }

}

module.exports = ClassicController
