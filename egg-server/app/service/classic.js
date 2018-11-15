const Service = require('egg').Service

class ClassicService extends Service {

  // ============================== CRUD 基于egg封装RESTful api==============================

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
  // 更新
  async update(_id, payload) {
    const {ctx, service} = this
    const classic = await ctx.service.classic.find(_id)
    if (!classic) {
      ctx.throw(404, '修改的期刊不存在')
    }

    return ctx.model.Classic.findByIdAndUpdate(_id, payload)
  }
  // 删除
  async destroy(_id) {
    const {ctx, service} = this
    const classic = await this.find(_id)
    if (!classic) {
      ctx.throw(404, '删除的期刊不存在')
    }
    return ctx.model.Classic.findByIdAndRemove(_id)
  }

  async find(id) {
    return this.ctx.model.Classic.findById(id)
  }

  // ============================== CRUD END ==============================

  // 获取最新的一期
  async findLatest() {
    return this.ctx.model.Classic.findOne({index: 1})
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
  async findDetail({id, type}) {
    return this.ctx.model.Classic.find({id, type})
    // return this.ctx.model.Classic.find({$or: [{id}, {type}]})
  }
  // 获取点赞信息
  async findFavor({id, type}) {
    // find 第一参数 筛选条件，第二个参数 指定放回的数据 0：不返回 1；放回
    return this.ctx.model.Classic.find({id, type}, {favNums: 1, id: 1, likeStatus: 1})
  }
  /**
   * 获取我喜欢的期刊
   * @param pageNum 页数
   * @param pageSize 每页的内容条数
   * @returns
   */
  async findFavorAll({pageNum = 1, pageSize = 10}) {
    const skip = ((pageNum - 1) * pageSize)
    const search = {
      likeStatus: 1,
    }

    return this.ctx.model.Classic.find(search).skip(skip).limit(pageSize).sort({pubdate: -1}).exec()
  }
  // 进行点赞
  async like(id) {
    if (!id) {
      this.ctx.throw(404, 'id不能为空')
    }

    const classic = await this.ctx.model.Classic.find({id: id})

    if (classic.length === 0) {
      this.ctx.throw(404, '点赞的期刊不存在')
    }
    const favNums = classic[0].favNums

    return this.ctx.model.Classic.findOneAndUpdate({id: id}, {
      likeStatus: 1,
      favNums: favNums + 1
    })
  }
  // 取消点赞
  async cancelLike(id) {
    if (!id) {
      this.ctx.throw(404, 'id不能为空')
    }

    const classic = await this.ctx.model.Classic.find({id: id})

    if (classic.length === 0) {
      this.ctx.throw(404, '取消点赞的期刊不存在')
    }
    const favNums = classic[0].favNums

    return this.ctx.model.Classic.findOneAndUpdate({id: id}, {
      likeStatus: 0,
      favNums: favNums - 1
    })
  }

}

module.exports = ClassicService
