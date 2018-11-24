module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const BookHotKeywordSchema = new Schema({
    keyword: {type: String, ensureIndex: true, required: true},
  })

  return mongoose.model('blink-book-hot-keyword', BookHotKeywordSchema)
}
