const Router = require('koa-router');
const router = new Router();
const sellerCtr = require('../controllers/sellerCtrl');

router.get('/api/v1/vue-sell/seller', sellerCtr.getList);

module.exports = router;
