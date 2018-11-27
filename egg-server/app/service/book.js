const Service = require('egg').Service

class BookService extends Service {

  // ============================== CRUD 基于egg封装RESTful api==============================

  // 获取所有
  async index() {
    return await this.ctx.model.Book.find({}).sort({id: 1})
  }

  // 根据id获取某一条
  async show(id) {
    return await this.ctx.model.Book.findOne({id: id})
  }

  // 创建
  async create(payload) {
    return this.ctx.model.Book.create(payload)
  }

  // 更新
  async update(_id, payload) {
    const {ctx, service} = this
    const classic = await ctx.service.classic.find(_id)
    if (!classic) {
      ctx.throw(404, '修改的期刊不存在')
    }

    return ctx.model.Book.findByIdAndUpdate(_id, payload)
  }

  // 删除
  async destroy(_id) {
    const {ctx, service} = this
    const classic = await this.find(_id)
    if (!classic) {
      ctx.throw(404, '删除的期刊不存在')
    }
    return ctx.model.Book.findByIdAndRemove(_id)
  }

  async find(id) {
    return this.ctx.model.Book.findById(id)
  }

  // ============================== CRUD END ==============================

  // 书籍点赞
  async like(id) {
    if (!id) {
      this.ctx.throw(404, 'id不能为空')
    }

    const book = await this.ctx.model.Book.findOne({id: id})

    if (!book) {
      this.ctx.throw(404, '点赞的书籍不存在')
    }

    return this.ctx.model.Book.findOneAndUpdate({id: id}, {
      likeStatus: 1,
      favNums: book.favNums + 1
    })
  }

  // 取消点赞
  async cancelLike(id) {
    if (!id) {
      this.ctx.throw(404, 'id不能为空')
    }

    const book = await this.ctx.model.Book.findOne({id: id})

    if (!book) {
      this.ctx.throw(404, '取消点赞的书籍不存在')
    }

    return this.ctx.model.Book.findOneAndUpdate({id: id}, {
      likeStatus: 0,
      favNums: book.favNums - 1
    })
  }

  // 搜索书籍
  async searchBook(title){
    if (!title) {
      this.ctx.throw(404, '书名不能为空')
    }

    const book = await this.ctx.model.Book.find({title: title})

    if (!book) {
      this.ctx.throw(404, '搜索的书籍不存在')
    }

    return book
  }

}

module.exports = BookService
