module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const RatingsSchema = new Schema({})

  return mongoose.model('vue-sell-ratings', RatingsSchema)
}
