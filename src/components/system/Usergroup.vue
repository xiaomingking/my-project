<template>
  <div class="cart">
    <Button type="primary" @click="showCart">改变对象</Button>
    <cartInfo :cartInfoShow="cartShow" ></cartInfo>
    <Button type="primary" @click="showComputed">计算属性</Button>
    <computed
      :secondShow="second"
      :ok="secondOk"
      :cancel="secondCancel"
    ></computed>
    <Button type="primary" @click="grammarModal">语法糖</Button>
    <Grammar v-model="grammarShow"></Grammar>
  </div>
</template>
<script>
import cartInfo from './cart/cartInfo'
import Computed from './cart/computed'
import Grammar from './cart/grammar'
export default {
  components: {
    cartInfo,
    Computed,
    Grammar
  },
  data () {
    return {
      cartShow: {
        show: false
      },
      second: false,
      grammarShow: false
    }
  },
  methods: {
    showCart () {
      this.cartShow.show = true
    },
    showComputed () {
      this.second = true
    },
    secondOk () {
      this.second = false
      this.$Message.info('点击了确定')
    },
    secondCancel () {
      this.second = false
      this.$Message.info('点击了取消')
    },
    grammarModal () {
      this.grammarShow = true
      console.log(this.grammarShow)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart{
  padding:16px;
}
</style>
