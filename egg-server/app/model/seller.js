module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SellerSchema = new Schema({});

  return mongoose.model('vue-sell-sellers', SellerSchema);
}
