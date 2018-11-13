const Service = require('egg').Service

class RatingsService extends Service {

  async index() {
    return await this.ctx.model.Ratings.find({})
  }

}

module.exports = RatingsService
