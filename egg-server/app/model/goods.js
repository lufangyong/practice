module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({});

  return mongoose.model('vue-sell-goods', GoodsSchema);
}
