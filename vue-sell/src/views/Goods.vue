<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item"
            v-for="(item, index) in goods"
            :key="index"
            :class="{'current': currentIndex === index}"
            ref="menuList"
            @click="selectMenu(index,$event)"
        >
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list"
            v-for="(item, index) in goods"
            :key="index"
            ref="foodsList"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item border-1px"
                v-for="(food, index) in item.foods"
                :key="index"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'goods',
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: '',
        currentIndex: '',
      }
    },
    components: {},
    computed: {},
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.getData()
    },
    watch: {
      'scrollY': function () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]

          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            this._followScroll(i)
            return this.currentIndex = i
          }
        }
        return this.currentIndex = 0
      }
    },
    methods: {
      getData() {
        this.axios.get('/api/v1/vue-sell/goods').then(res => {
          const {status} = res

          if (status.toString().startsWith('2')) {
            if (res.data.code === 0) {
              this.goods = res.data.data[0].goods
              this.$nextTick(() => {
                this._initScroll()
                this._calculateHeight()
              })
            }
          }
        }).catch(err => {
          throw new Error(err)
        })
      },
      selectMenu(index, event) {
        /**
         * better-scroll会将点击事件去掉，如果滚动部分需要有点击事件，需要在参数里加上click：true
         * 同时，在PC上或某些手机端，由于未成功将touchEnd事件move掉，点击事件会执行两次
         * better-scroll派发的event事件和原生js的event有属性上的区别，其中有一个属性为event._constructed
         * better-scroll派发的事件中event._constructed为true，原生点击事件中没有这个属性
         */
        if (!event._constructed) {
          return
        }

        this.currentIndex = index;
        let foodsList = this.$refs.foodsList
        let el = foodsList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 实时派发 scroll 事件
        })

        this.foodsScroll.on('scroll', (pos) => {
          // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        })
      },
      // 计算区间高度
      _calculateHeight() {
        let foodsList = this.$refs.foodsList
        let height = 0
        this.listHeight.push(height)

        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 优化体验，侧边导航跟随内容的滚动而滚动
      _followScroll(index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        this.menuScroll.scrollToElement(el, 300, 0, -100)
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('../assets/decrease_3')
          &.discount
            bg-image('../assets/discount_3')
          &.guarantee
            bg-image('../assets/guarantee_3')
          &.invoice
            bg-image('../assets/invoice_3')
          &.special
            bg-image('../assets/special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
