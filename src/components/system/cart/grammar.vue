<template>
  <Modal
    v-model="grammar"
    title="语法糖"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <h3>通过语法糖控制modal</h3>
  </Modal>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      grammar: false
    }
  },
  watch: {
    grammar (val) {
      console.log(val)
      this.$emit('input', val)
    },
    value (val) {
      console.log(val)
      this.grammar = val
    }
  },
  methods: {
    ok () {
      this.grammar = false
      console.log(this.grammar)
      this.$Message.info('点击了确定')
    },
    cancel () {
      this.grammar = false
      console.log(this.grammar)
      this.$Message.info('点击了取消')
    }
  }
}
</script>
