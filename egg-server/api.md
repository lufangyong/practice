# api

## vue-sell

- GET /api/v1/vue-sell/goods
- GET /api/v1/vue-sell/seller
- GET /api/v1/vue-sell/ratings

## blink

### 获取最新一期

- GET /classic

### 获取当前一期的下一期

URL

- GET /classic/<int:index>/next

Params:

- index：期号,必填,必须是正整数

### 获取当前一期的上一期

URL

- GET /classic/<int:index>/previous

Params:

- index: 期号,必填,必须是正整数

### 获取某一期详细信息

- GET /classic/<int:id>/<int:type>

Params:

- id：id 号,必填,必须是正整数
- type: 类型号，必填，为 100,200,300 的一种，分别表示电影，音乐，句子

### 获取点赞信息

URL

- GET classic/<int:id>/<int:type>/favor

Params:

- type: 必填, 点赞类型
- id: 必填, 点赞对象的 id 号

### 获取我喜欢的期刊

URL

- GET /classic/favor

Params:

- start 开始的页数,默认为 1
- count: 每页的内容条数,不超过 20,默认为 20
