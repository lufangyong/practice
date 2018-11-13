const Service = require('egg').Service

class SellerService extends Service {

  async index() {
    return await this.ctx.model.Seller.find({})
  }

}

module.exports = SellerService
