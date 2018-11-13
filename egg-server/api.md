# api

## vue-sell

- GET /api/v1/vue-sell/goods
- GET /api/v1/vue-sell/seller
- GET /api/v1/vue-sell/ratings

## blink

### 获取最新一期

- GET /classic

### 获取当前一期的下一期

- GET /classic/<int:index>/next

### 获取当前一期的上一期

- GET /classic/<int:index>/previous

### 获取某一期详细信息

- GET /classic/<int:type>/<int:id>
