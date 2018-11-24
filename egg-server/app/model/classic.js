module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ClassicSchema = new Schema({
    content: {type: String, required: true},
    favNums: {type: Number},
    id: {type: Number, required: true},
    image: {type: mongoose.Schema.Types.Mixed},
    index: {type: Number},
    likeStatus: {type: Number},
    pubdate: {type: Date, default: Date.now},
    title: {type: String},
    type: {type: Number}
  })

  return mongoose.model('blink-classic', ClassicSchema)
}
