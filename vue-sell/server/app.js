const Koa = require('koa');
const config = require('./config');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();

// 连接数据库
mongoose.connect(config.db, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.error('Failed to connect to database');
  } else {
    console.log('Connecting database successfully');
  }
});

// 跨域
app.use(cors());
// 解析body的中间件
app.use(bodyParser());

// router
const sellerRouter = require('./app/router/sellerRouter');
const goodsRouter = require('./app/router/goodsRouter');

app.use(sellerRouter.routes()).use(sellerRouter.allowedMethods());
app.use(goodsRouter.routes()).use(goodsRouter.allowedMethods());

app.listen(config);
