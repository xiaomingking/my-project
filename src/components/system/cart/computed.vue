<template>
  <Modal
    v-model="show"
    title="计算属性"
    @on-ok="ok"
    @on-cancel="cancel"
  >
    <h3>通过computed处理然后输出</h3>
  </Modal>
</template>
<script>
export default {
  props: ['secondShow', 'ok', 'cancel'],
  computed: {
    show: {
      set () {
        return this.secondShow
      },
      get () {
        return this.secondShow
      }
    }
  },
  methods: {
  }
}
</script>
