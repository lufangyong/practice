const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
const glob = require('glob')
const {
  resolve
} = require('path')

mongoose.Promise = global.Promise

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 生产环境中，不打印log
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    // 连接数据库
    mongoose.connect(db, {
      useNewUrlParser: true
    })

    // 断开连接
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        throw new Error('database is hung up')
      }
    })
    // 连接错误
    mongoose.connection.on('error', err => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        throw new Error('database is hung up')
      }
    })

    // 连接成功
    mongoose.connection.once('open', () => {
      // const Dog = mongoose.model('dog', {
      //   name: String
      // })
      // const doga = new Dog({
      //   name: 'apleth'
      // })

      // doga.save().then(() => {
      //   console.log('wang')
      // })
      resolve()
      console.log('mongodb connected successfully!')
    })
  })
}
