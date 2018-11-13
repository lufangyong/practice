const Service = require('egg').Service

class ClassicService extends Service {

  async index() {
    return await this.ctx.model.Classic.find({})
  }

  // 获取某一期期刊
  async show(id) {
    return await this.ctx.model.Classic.findOne({id: id})
  }

  // 创建一条期刊
  async create(payload) {
    return this.ctx.model.Classic.create(payload)
  }

  // 获取当前一期的下一期
  async findNext(index) {
    return this.ctx.model.Classic.findOne({index: index})
  }

  // 获取当前一期的上一期
  async findPrevious(index) {
    return this.ctx.model.Classic.findOne({index: index})
  }

  // 获取某一期详细信息
  async findDetail({type, id}) {
    return this.ctx.model.Classic.find({id, type})
    // return this.ctx.model.Classic.find({$or: [{id}, {type}]})
  }

}

module.exports = ClassicService
