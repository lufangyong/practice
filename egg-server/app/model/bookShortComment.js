module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const BookShortCommentSchema = new Schema({
    bookId: {type: Number, required: true,},
    content: {type: String, required: true},
  })

  return mongoose.model('blink-book-short-comment', BookShortCommentSchema);
}
