const Router = require('koa-router');
const router = new Router();
const goodsCtr = require('../controllers/goodsCtrl');

router.get('/v1/api/goods', goodsCtr.getList);

module.exports = router;
