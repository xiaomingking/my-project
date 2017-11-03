<template>
  <Modal
    v-model="modal1"
    class-name="aaa"
    @on-ok="changed"
    @on-cancel="cancel">
    <p slot="header" style="text-align:center">编辑医院</p>
    <div id="content" style="padding-left:20%">
      <p><span>名称</span><input type="text"></p>
      <p>
        <span>名称</span>
        <select name="" id="">
          <option value="省"></option>
        </select>
        <select name="" id="">
          <option value="市"></option>
        </select>
      </p>
      <p><span>名称</span>对话框内容</p>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'admiss',
  data () {
    return {
      modal1: false
    }
  },
  methods: {
    changed () {

    },
    cancel () {
      this.$Message.info('点击了取消')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.right{
  width:100%;
  min-width:1000px;
  .bigbox{
    width:1000px;
    margin:10px 0 0 10px;
    height:700px;
    padding:20px;
    background: #fff;
    box-shadow:0 0 1px 0 rgba(0,0,0,.2);
  }
  .title{
    margin-top: 10px;
  }
  .degree{
    margin-top:10px;
    .box{
      display: inline-block;
      width:100px;
      height: 100px;
      border:1px solid #efefef;
      margin-right: 15px;
      text-align: center;
      line-height: 102px;
      box-shadow: 5px 5px 10px #999;
      background: white;
      opacity:0.9;
    }
  }
}
</style>
