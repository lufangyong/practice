const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ratingsSchema = new Schema({}, { collection: 'vue-sell-ratings', versionKey: false});

module.exports = mongoose.model('ratings', ratingsSchema);
