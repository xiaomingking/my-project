<template>
  <div class="right service">
    <div class="servertop">
      <span>即将上映：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in myData"
          :key="item.id"
          :label="item.title"
          :value="item.title">
        </el-option>
      </el-select>
      <span>主演：</span>
      <el-input placeholder="请输入内容"></el-input>
      <el-button type="primary" icon="search">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service',
  data () {
    return {
      url: 'https://api.douban.com/v2/movie/coming_soon',
      myData: [],
      value: ''
    }
  },
  created () {
    this.$http.jsonp(this.url).then((response) => {
        // success
      console.log(1)
      this.myData = response.body.subjects
      console.log(this.myData)
    }, (error) => {
      // error
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.service{
  padding-top:10px;
  padding-left: 10px;
  .el-input{
    display: inline;
    .el-input__inner{
      width:200px;
    }
  }
  .el-tabs{
    margin-top:10px;
    .el-tabs__header{
      border-bottom:1px solid blue;
      .el-tabs__item.is-active{
        border:1px solid blue;
        border-bottom:1px solid #e3e3e3;
      }
    }
  }
}
</style>
