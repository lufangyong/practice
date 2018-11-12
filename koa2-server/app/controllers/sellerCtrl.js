const sellerModel = require('../model/sellerModel');

const getList = async (ctx) => {
  const data = await sellerModel.find({}, {
    _id: 0
  });

  ctx.status = 200;
  ctx.set('Content-Type', 'application/json')
  ctx.body = {
    code: '0',
    msg: '成功',
    data: data[0]
  }
};

module.exports = {
  getList
};
