const Controller = require('egg').Controller

class GoodsController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createGoods = {}
  }

  async index() {
    const {ctx, service} = this
    // this.ctx.body = await this.ctx.model.Goods.find({})
    // 调用 Service 进行业务处理
    const res = await service.goods.index()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

}

module.exports = GoodsController

// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.Goods.find({});
// }
