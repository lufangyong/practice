const Controller = require('egg').Controller

class ClassicController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createClassic = {
      id: {type: 'string', required: true, allowEmpty: false},
      content: {type: String, required: true, allowEmpty: false}
    }
  }

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
    console.log('body', payload);
    // 调用 Service 进行业务处理
    const res = await service.classic.create(payload)
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
    console.log('payload', payload);

    // 调用 Service 进行业务处理
    const res = await service.classic.findDetail(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

}

module.exports = ClassicController