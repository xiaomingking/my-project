<template>
  <div class="right">
    <div class='bigbox'>
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in hosList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <h3 class='title'>妇产科</h3>
      <div class='degree'>
        <span v-for='(n, index) in 7' :key='index' class='box'></span>
      </div>
      <h3 class='title'>儿科</h3>
      <div class='degree'>
        <span v-for='(n, index) in 7' :key='index' class='box'></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admiss',
  data () {
    return {
      hosList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        }
      ],
      model1: ''
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
