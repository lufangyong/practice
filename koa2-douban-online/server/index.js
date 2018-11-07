const Koa = require('koa')
import {
  join
} from 'path'
const {
  connect,
  initSchema
} = require('./database/init')
const router = require('./routes')
const R = require('ramda')
const MIDDLEWARES = ['router','parcel']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(e => e(app)),
      require,
      name => join(__dirname, `./middleware/${name}`)
    )
  )(MIDDLEWARES)
}

// 连接mongodb
;
(async () => {
  const app = new Koa()

  await connect()

  initSchema()
  // require('./tasks/movie')
  // require('./tasks/api')

  await useMiddlewares(app)
  app.listen(9090)
})()
