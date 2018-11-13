const Service = require('egg').Service

class GoodsService extends Service {

  async index() {
    return await this.ctx.model.Goods.find({})
  }

}

module.exports = GoodsService
