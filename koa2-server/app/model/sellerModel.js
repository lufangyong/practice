const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sellerSchema = new Schema({}, { collection: 'vue-sell-sellers', versionKey: false});

module.exports = mongoose.model('seller', sellerSchema);
