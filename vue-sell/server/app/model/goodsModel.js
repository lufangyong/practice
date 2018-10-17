const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const goodsSchema = new Schema({}, { collection: 'goods', versionKey: false});

module.exports = mongoose.model('goods', goodsSchema);
