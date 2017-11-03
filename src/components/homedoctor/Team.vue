<template>
  <div class="right">
    <input type="text" v-model="t1" @keyup="get($event)" @keydown.down="changeDown()" @keydown.up.prevent="changeUp()">
        <ul>
            <li v-for="(value, key) in myData"  :class="{gray:key == now}">
                {{value}}
            </li>
        </ul>
        <p v-show="myData.length==0">暂无数据...</p>
  </div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      aa: '团队',
      myData: [],
      t1: '',
      now: -1
    }
  },
  methods: {
    get (ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        return
      }
      if (ev.keyCode === 13) {
        window.open('https://www.baidu.com/s?wd=' + this.t1)
        this.t1 = ''
      }
      this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {params: {wd: this.t1}, jsonp: 'cb'}).then(function (res) {
        this.myData = res.data.s
      }, function (res) {
        alert(res.status)
      })
    },
    changeDown () {
      this.now++
      if (this.now === this.myData.length) {
        this.now = -1
      }
      this.t1 = this.myData[this.now]
    },
    changeUp () {
      this.now--
      if (this.now === -2) {
        this.now = this.myData.length - 1
      }
      this.t1 = this.myData[this.now]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gray{
  background: tan;
}
</style>
