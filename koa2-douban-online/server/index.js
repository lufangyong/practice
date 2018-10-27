const Koa = require('koa')
const app = new Koa()
const ejs = require('ejs')
const pug = require('pug')
const {
  htmlTpl,
  ejsTpl,
  pugTpl,
} = require('./tpl')

app.use((ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = pug.render(pugTpl, {
    you: 'hi',
    me: 'koa2'
  })
})

app.listen(9091)