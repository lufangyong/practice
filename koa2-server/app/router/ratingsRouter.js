const Router = require('koa-router');
const router = new Router();
const ratingsCtr = require('../controllers/ratingsCtrl');

router.get('/api/v1/vue-sell/ratings', ratingsCtr.getList);

module.exports = router;
