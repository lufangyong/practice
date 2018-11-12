const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const goodsSchema = new Schema({}, { collection: 'vue-sell-goods', versionKey: false});

module.exports = mongoose.model('goods', goodsSchema);
