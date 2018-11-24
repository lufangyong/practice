module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const BookSchema = new Schema({
    id: {type: Number, ensureIndex: true, required: true,},
    favNums: {type: Number},
    image: {type: mongoose.Schema.Types.Mixed},
    title: {type: String},
    likeStatus: {type: Number},
    author: {type: String},
  })

  return mongoose.model('blink-book', BookSchema)
}
