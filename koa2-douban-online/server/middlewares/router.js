const {Route} = require('../lib/decorator')
const {resolve} = require('path')

export const router = app => {
  const apiPath = resoleve(__dirname, '../routes')
  const router = new Route(app, apiPath)

  router.init()
}