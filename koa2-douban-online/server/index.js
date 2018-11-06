const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const views = require('koa-views')
const {
  resolve
} = require('path')
const {
  connect,
  initSchema
} = require('./database/init')

// 连接mongodb
;
(async () => {
  await connect()

  initSchema()
  require('./tasks/api')
})()

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'he',
    me: 'koa2'
  })
})

app.listen(9091)
