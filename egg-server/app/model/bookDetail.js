module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const BookDetailSchema = new Schema({
    id: {type: Number, ensureIndex: true, required: true,},
    binding: {type: String},
    category: {type: String},
    image: {type: [String]},
    images: {type: [{}]},
    isbn: {type: String},
    pages: {type: String},
    price: {type: String},
    pubdate: {type: Date},
    subtitle: {type: String},
    publisher: {type: String},
    summary: {type: String},
    title: {type: String},
    translator: {type: [String]},
    author: {type: [String]},
  })

  return mongoose.model('blink-book-detail', BookDetailSchema)
}
