const Router = require('koa-router');
const router = new Router();
const sellerCtr = require('../controllers/sellerCtrl');

router.get('/api/v1/seller', sellerCtr.getList);

module.exports = router;
