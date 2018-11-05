const Router = require('koa-router');
const router = new Router();
const goodsCtr = require('../controllers/goodsCtrl');

router.get('/api/v1/goods', goodsCtr.getList);

module.exports = router;
