<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item"
            v-for="(item, index) in goods"
            :key="index"
            :class="{'current': currentIndex === index}"
            ref="menuItem"
        >
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
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
      }
    },
    components: {},
    computed: {
      currentIndex() {
        return 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.getData()
    },
    mounted() {

    },
    methods: {
      getData() {
        this.axios.get('v1/api/goods').then(res => {
          this.goods = res.data.data.goods
          this.$nextTick(() => {
            this.__initScroll()
          })
        }).catch(err => {
          throw new Error(err)
        })
      },
      __initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
      }
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
</style>
