const Service = require('egg').Service

class BookHotKeywordService extends Service {

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有
  async index() {
    const data = await this.ctx.model.BookHotKeyword.find({})
    let res = []
    for (let i = 0; i < data.length; i++) {
      res.push(data[i].keyword)
    }
    return res
  }

  // 根据id获取某一条
  async show(id) {
    return await this.ctx.model.BookHotKeyword.find({bookId: id})
  }

  // 创建
  async create(payload) {
    return this.ctx.model.BookHotKeyword.create(payload)
  }

  // 更新
  async update(_id, payload) {
    const {ctx, service} = this
    const classic = await ctx.service.classic.find(_id)
    if (!classic) {
      ctx.throw(404, '修改的期刊不存在')
    }

    return ctx.model.BookHotKeyword.findByIdAndUpdate(_id, payload)
  }

  // 删除
  async destroy(_id) {
    const {ctx, service} = this
    const classic = await this.find(_id)
    if (!classic) {
      ctx.throw(404, '删除的期刊不存在')
    }
    return ctx.model.BookHotKeyword.findByIdAndRemove(_id)
  }

  async find(id) {
    return this.ctx.model.BookHotKeyword.findById(id)
  }

  // ============================== CRUD END ==============================

}

module.exports = BookHotKeywordService
