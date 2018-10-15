const Router = require('koa-router');
const router = new Router();
const sellerCtr = require('../controllers/sellerCtrl');

router.get('/v1/api/seller', sellerCtr.getList);

module.exports = router;
