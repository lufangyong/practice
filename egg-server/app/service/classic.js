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

}

module.exports = ClassicService
