<template>
  <Modal
    v-model="cartInfoShow.show"
    @on-ok="ok"
    @on-cancel="cancel"
    title="父级对象">
    <h3 style="padding:16px;">通过给父组件添加父级对象，然后子组件直接改变父组件的子类来控制modal的显示和隐藏</h3>
  </Modal>
</template>
<script>
export default {
  props: ['cartInfoShow'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    ok () {
      this.cartInfoShow.show = false
      this.$Message.info('点击了确定')
    },
    cancel () {
      this.cartInfoShow.show = false
      this.$Message.info('点击了取消')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
