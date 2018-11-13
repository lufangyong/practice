const Controller = require('egg').Controller

class SellerController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createSeller = {}
  }

  async index() {
    const {ctx, service} = this

    // 调用 Service 进行业务处理
    const res = await service.seller.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

}

module.exports = SellerController
