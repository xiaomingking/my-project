<template>
  <div class="right">
    <div class="bigbox">
      <Button type="info" @click="addInfor">添加医院</Button>
      <!-- 编辑医院信息开始  -->
      <Modal
        v-model="modal2"
        class-name="aaa"
        @on-ok="add"
        @on-cancel="cancel">
        <p slot="header" style="text-align:center">编辑医院</p>
        <div id="content">
          <p><span>名称</span>
          <input type="text" v-model="changeName"></p>
          <p>
            <span>区域</span>
            <select v-model="watchProvince" watchCity >
              <option value="省">省</option>
              <option v-for="(item, index) in CityData" :key='index' >{{item.name}}</option>
            </select>
            <select v-model="watchCity" watchProvince >
              <option value="市">市</option>
              <option  v-for="(i, index) in citys" :key='index' >{{i}}</option>
            </select>
          </p>
          <p><span>类型</span>
            <label>
              <input type="radio" value='社区医院' :checked='change1' name="hospital">&nbsp;社区医院
            </label>
            <label>
              <input type="radio" value='上级医院' :checked='change2' name="hospital">&nbsp;上级医院
            </label>
          </p>
        </div>
      </Modal>
      <!-- 编辑医院信息结束  -->
      <div class="info" v-for='(item, index) in list' :key='index' :data-id='index'>
        <div class="infohospital">
          <span>{{item.ename}}</span>
          <span>{{item.leixing}}</span>
          <span>{{item.city}}</span>
        </div>
        <div class="infohospital">
          <span>科室：</span>
          <span class="per">{{item.keshi}}</span>
          <Button type="text">添加</Button>
        </div>
        <span class="hoschange" @click="changeInfo(index)">修改医院信息</span>
      </div>
      <!-- 添加医院信息开始  -->
      <Modal
        v-model="modal1"
        class-name="aaa"
        @on-ok="changed($event)"
        @on-cancel="cancel">
        <p slot="header" style="text-align:center">编辑医院</p>
        <div id="content">
          <p><span>名称</span>
          <input v-model="addname" type="text"></p>
          <p>
            <span>区域</span>
            <select name="" id="" watchCity v-model="watchProvince">
              <option value="省">省</option>
              <option v-for="(item, index) in CityData" :key='index' :value='item.name' >{{item.name}}</option>
            </select>
            <select v-model="watchCity" watchProvince >
              <option value="市">市</option>
              <option v-for="(item, index) in citys" :key='index' :value='item' >{{item}}</option>
            </select>
          </p>
          <p><span>类型</span>
            <label>
              <input type="radio" :checked="shequ1" @change="shequ1 = true" name="hospital">&nbsp;社区医院
            </label>
            <label>
              <input type="radio" :checked="shequ2" @change="shequ2 = false" name="hospital">&nbsp;上级医院
            </label>
          </p>
        </div>
      </Modal>
      <!-- 添加医院信息结束  -->
    </div>
  </div>
</template>

<script>
import CityData from '../Citydata'
export default {
  name: 'hospital',
  data () {
    return {
      CityData: CityData,
      che1: '',
      che2: '',
      modal1: false,
      modal2: false,
      addProvince: '',
      addCity: '',
      row: '',
      thisrow: '',
      aaa: '',
      addname: '',
      watchProvince: '省',
      watchCity: '市',
      lei: '',
      changeName: '',
      changeCity: '',
      shequ1: '',
      shequ2: '',
      one: '省',
      two: '市',
      watchChe1: '',
      defVal: '',
      citys: [],
      moren1: '',
      change1: '',
      change2: '',
      list: [
        {
          ename: '丈八北路社区服务中心',
          leixing: '社区医院',
          city: '陕西 西安',
          keshi: '妇产1科、妇产2科、儿科'
        },
        {
          ename: '丈八北路社区服务中心',
          leixing: '社区医院',
          city: '陕西 西安',
          keshi: '妇产1科、妇产2科、儿科'
        },
        {
          ename: '丈八北路社区服务中心',
          leixing: '社区医院',
          city: '陕西 西安',
          keshi: '妇产1科、妇产2科、儿科'
        },
        {
          ename: '丈八北路社区服务中心',
          leixing: '社区医院',
          city: '陕西 西安',
          keshi: '妇产1科、妇产2科、儿科'
        }
      ]
    }
  },
  watch: {
    watchProvince (val) {
      console.log(this.CityData[0])
      for (let i = 0; i < this.CityData.length; i++) {
        if (this.CityData[i].name === val) {
          this.citys = this.CityData[i].citys
          this.watchCity = this.citys[0]
        }
        if (val === '省') {
          this.watchCity = '市'
          this.citys = []
        }
      }
    },
    watchCity (val) {
      for (let i = 0; i < this.citys.length; i++) {
        if (val === '市') {
          this.watchProvince = '省'
        }
      }
    }
  },
  methods: {
    changeInfo (_id) {
      this.modal2 = true
      this.row = _id
      console.log(this.$data)
      let _list = this.list[_id]
      this.changeName = _list.ename
      this.changeCity = _list.city
      let adr = _list.city.split(' ')
      this.watchProvince = adr[0]
      this.watchCity = adr[1]
      if (_list.leixing === '社区医院') {
        alert(1)
        console.log(this.change1)
      }
    },
    addInfor () {
      this.modal1 = true
      this.addname = ''
      this.shequ1 = ''
      this.shequ2 = ''
      this.watchProvince = '省'
      this.watchCity = '市'
    },
    changed (e) {
      let lei = ''
      console.log(this.shequ1)
      if (this.shequ1) {
        lei = '社区医院'
      }
      if (this.shequ2) {
        lei = '上级医院'
      }
      this.list.push({
        ename: this.addname,
        leixing: lei,
        city: this.watchProvince + ' ' + this.watchCity,
        keshi: '妇产1科、妇产2科、儿科'
      })
    },
    cancel () {
      this.$Message.info('点击了取消')
    },
    add () {
      this.modal2 = false
      let index = this.row
      console.log(this.row)
      let _list = this.list[index]
      _list.ename = this.changeName
      _list.city = this.watchProvince + ' ' + this.watchCity
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
    .ivu-btn-info{
      font-weight: 900;
      font-size: 14px;
    }
    .info{
      position: relative;
      width:80%;
      height: 80px;
      margin-top:10px;
      border:1px solid #eee;
      border-radius: 10px;
      box-shadow: 1px 1px 10px #999;
      padding:10px;
      .hoschange{
        position: absolute;
        top:30px;
        right:10px;
        color:#2DB7FE;
        cursor: pointer;
      }
      .infohospital{
        line-height: 30px;
        height:30px;
        .ivu-btn{
          font-size: 14px;
          padding:0px;
          padding-left:10px;
          margin-top:-2px;
          color:#2DB7FE;
        }
        span{
          padding-left: 10px;
          &.per{
            padding-left:0px;
          }
        }
      }
    }
  }
}
</style>
<style lang='scss'>
.aaa{
  #content{
    padding-left: 20%;
    p{
      margin-top:15px;
      select{
        min-width:80px;
        margin-right:10px;
      }
      label{
        margin-right:10px;
      }
      input[type=text]{
        width:150px;
        height:26px;
      }
      span{
        margin-right:20px;
      }
    }
  }
}
</style>
