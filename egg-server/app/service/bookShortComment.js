const Service = require('egg').Service

class BookShortCommentService extends Service {

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有
  async index() {
    return await this.ctx.model.BookShortComment.find({}).sort({id: 1})
  }

  // 根据id获取某一条
  async show(id) {
    return await this.ctx.model.BookShortComment.find({bookId: id})
  }

  // 创建
  async create(payload) {
    return this.ctx.model.BookShortComment.create(payload)
  }

  // 更新
  async update(_id) {
    const {ctx} = this
    const comment = await this.find(_id)

    if (!comment) {
      ctx.throw(404, '修改id不存在')
    }

    return ctx.model.BookShortComment.findByIdAndUpdate(_id, {
      nums: comment.nums + 1
    })
  }

  // 删除
  async destroy(_id) {
    const {ctx} = this
    const classic = await this.find(_id)
    if (!classic) {
      ctx.throw(404, '删除的期刊不存在')
    }
    return ctx.model.BookShortComment.findByIdAndRemove(_id)
  }

  async find(id) {
    return this.ctx.model.BookShortComment.findById(id)
  }

  // ============================== CRUD END ==============================

}

module.exports = BookShortCommentService
