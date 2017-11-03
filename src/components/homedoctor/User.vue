<template>
  <div class="right users">
    <div class="user_top">
      <span>医院名称：</span>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="chaxun" icon="search">查询</el-button>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="上线中" name="first">上线中</el-tab-pane>
      <el-tab-pane label="已下线" name="second">已下线</el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="tianjia">添加</el-button>

    <!--添加医院信息开始-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      size="tiny"
      top="30%"
      :before-close="handleClose">
      <ul class="modalul">
        <li>
          <span>名称</span>
          <input class="modalinput" v-model="addrow" v-on:blur="addrow ? (yanzheng = '') : (yanzheng = '*医院名称不能为空')" type="text"/>
          <span class="yanzheng">{{yanzheng}}</span>
        </li>
        <li>
          <span>区域</span>
          <select v-model="moren" v-on:blur="(moren !== '省') ? (yanzheng1 = '') : (yanzheng1 = '请选择城市')" class="select">
            <option v-model="one">{{one}}</option>
            <option v-for="(item, index) in Citydata" :key="index" >{{item.name}}</option>
          </select>
          <select moren v-model="moren1" v-on:blur="(moren1 !== '市') ? (yanzheng1 = '') : (yanzheng1 = '请选择城市')" class="select">
            <option v-model="two">{{two}}</option>
            <option v-for="i in citys" :key='i'>{{i}}</option>
          </select>
          <span class="yanzheng">{{yanzheng1}}</span>
        </li>
        <li>
          <span>类型</span>
          <el-radio class="radio radio1" v-model="radio" label="1">社区医院</el-radio>
          <el-radio class="radio" v-model="radio" label="2">上级医院</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>                           <!--确认添加医院信息-->
      </span>
    </el-dialog>
    <!--添加医院信息结束-->

    <!--医院列表开始-->
    <el-table
    :data="tableData"
    border>
    <el-table-column
      prop="date"
      label="医院名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="省、市"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sorts"
      label="排序"
      width="180">
      <template scope="scope">
        <el-input class="inputde" :value="scope.row.sorts"></el-input>
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="bianji(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <!--医院列表结束-->

   <!--编辑医院信息开始-->
  <el-dialog
    title="编辑医院"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose">
    <ul class="modalul">
      <li>
        <span>名称</span>
        <input class="modalinput" v-on:blur="thisrow ? (yanzheng3 = '') : (yanzheng3 = '*医院名称不能为空')" v-model="thisrow" type="text"/>
        <span class="yanzheng">{{yanzheng3}}</span>
      </li>
      <li>
        <span>区域</span>
        <select v-model="moren" class="select" v-on:blur="(moren !== '省') ? (yanzheng4 = '') : (yanzheng4 = '请选择城市')" moren1>
          <option>{{one}}</option>
          <option v-for="(item, index) in Citydata" :key="index" >{{item.name}}</option>
        </select>
        <select moren v-model="moren1" class="select">
          <option>{{two}}</option>
          <option v-for="(i, index) in citys" :key="index">{{i}}</option>
        </select>
        <span class="yanzheng">{{yanzheng4}}</span>
      </li>
      <li>
        <span>类型</span>
        <el-radio class="radio radio1" v-model="radio" label="1">社区医院</el-radio>
        <el-radio class="radio" v-model="radio" label="2">上级医院</el-radio>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="quxiao1">取 消</el-button>
      <el-button type="primary" @click="changed()">确 定</el-button>
    </span>
  </el-dialog>
  <!--编辑医院信息结束-->
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :total="50"
      v-on:current-change="handleCurrentChange"
      :current-page.sync="currentPage1" >
    </el-pagination>
  </div>
  </div>
</template>

<script>
import Citydata from '../Citydata'
export default {
  name: 'service',
  data () {
    return {
      activeName2: 'first',
      dialogVisible: false,
      dialogVisible1: false,
      moren: '省',
      moren1: '市',
      Citydata: Citydata,
      citys: [],
      addrow: '',
      yanzheng: '',
      yanzheng1: '',
      yanzheng3: '',
      yanzheng4: '',
      thisindex: '',
      nowindex: '',
      thisrow: '',
      input: '',
      radio: '1',
      one: '省',
      two: '市',
      currentPage1: 1,
      tableData: [{
        date: '常熟市中医院（新区医院、妇保院）',
        name: '江苏-苏州',
        sorts: '10'
      }, {
        date: '十月呵护医生集团',
        name: '陕西-西安',
        sorts: '9'
      }, {
        date: '电子城二〇五所社区卫生服务站',
        name: '陕西-西安',
        sorts: '8'
      }, {
        date: '西北妇女儿童医院',
        name: '陕西-西安',
        sorts: '7'
      }, {
        date: '交通大学第一附属医院',
        name: '陕西-西安',
        sorts: '6'
      }, {
        date: '交通大学第二附属医院',
        name: '陕西-西安',
        sorts: '5'
      }, {
        date: '陕西省人民医院',
        name: '陕西-西安',
        sorts: '4'
      }, {
        date: '西京医院',
        name: '陕西-西安',
        sorts: '3'
      }, {
        date: '西安市第四医院',
        name: '陕西-西安',
        sorts: '2'
      }, {
        date: '唐都医院',
        name: '陕西-西安',
        sorts: '1'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  watch: {
    moren (val) {
      for (let i = 0; i < this.Citydata.length; i++) {
        if (this.Citydata[i].name === val) {
          this.citys = this.Citydata[i].citys
          this.moren1 = this.citys[0]
        }
        if (val === this.one) {
          this.moren1 = '市'
          this.citys = []
        }
      }
    },
    moren1 (val) {
      for (let i = 0; i < this.citys.length; i++) {
        if (val === this.two) {
          this.moren = '省'
        }
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log(val)
      this.tableData.splice(val * 8, 8)
    },
    quchong () {
      let arr = [1, 23, 44, 45, 6, 12, 35, 43, 13, 4, 25]
      let cos = ''
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length - i - 1; k++) {
          if (arr[k] > arr[k + 1]) {
            cos = arr[k]
            arr[k] = arr[k + 1]
            arr[k + 1] = cos
          }
        }
      }
      console.log(arr)
    },
    filterArr () {
      let isEven = function (el) {
        return (el % 2 !== 0)
      }
      let arra = [1, 23, 44, 45, 6, 12, 35, 43, 13, 4, 25]
      let ass = arra.filter(isEven)
      console.log(ass)
    },
    province () {
      if (this.moren !== '省') {
        this.yanzheng1 = ''
      }
    },
    tianjia () {
      this.dialogVisible1 = true
      this.moren = '省'
      this.moren1 = '市'
    },
    quxiao () {
      this.dialogVisible1 = false
      this.yanzheng = ''
      this.yanzheng1 = ''
      this.addrow = ''
    },
    quxiao1 () {
      this.dialogVisible = false
      this.yanzheng3 = ''
    },
    add () {
      if (this.addrow === '') {
        this.yanzheng = '*医院名称不能为空'
        console.log(this.yanzheng)
        return
      }
      if (this.moren === '省' || this.moren1 === '市') {
        this.yanzheng1 = '请选择城市'
        return
      }
      this.dialogVisible1 = false
      this.tableData.unshift({date: this.addrow, name: this.moren + '-' + this.moren1, sorts: this.tableData.length + 1})
      this.addrow = ''
      this.yanzheng = ''
      this.yanzheng1 = ''
    },
    chaxun () {
      let that = this
      let newData = function (el) {
        console.log(el.data)
        for (let i in this.tableData) {
          if (that.input === i) {
            return true
          }
        }
      }
      let arr = []
      console.log(this.tableData)
      arr = this.tableData.filter(newData)
      console.log(arr)
    },
    changed () {
      if (this.thisrow === '') {
        this.yanzheng3 = '*医院名称不能为空'
        console.log(this.yanzheng3)
        return
      }
      if (this.moren === '省' || this.moren1 === '市') {
        this.yanzheng4 = '请选择城市'
        return
      }
      this.dialogVisible = false
      this.tableData[this.nowindex].date = this.thisrow
      this.tableData[this.nowindex].name = this.moren + '-' + this.moren1
    },
    bianji (index, row) {
      this.dialogVisible = true
      this.thisrow = row.date
      let that = this
      this.nowindex = index
      this.aaa = function (callback) {
        let selt = this
        let str = row.name
        let a = str.split('-')
        selt.moren = a[0]
        setTimeout(function () {
          callback()
        }, 30)
      }
      this.bbb = function () {
        let str = row.name
        let a = str.split('-')
        that.moren1 = a[1]
      }
      this.aaa(this.bbb)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.tableData.splice(index, 1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.users{
  padding:10px;
  .user_top{
    .el-input{
      width:150px;
      display: inline-block;
    }
  }
  .el-tabs--card{
    margin-top:10px;
    .is-active{
      background: #fff;
      color:#000;
    }
    .el-tabs__nav-scroll{
      border-color: #e5e5e5;
    }
  }
  .yanzheng{
    color:red;
    font-size: 10px;
  }
  .inputde{
    width:50px;
    float: right;
  }
  .el-dialog--tiny{
    width:25%;
  }
  .el-table--fit{
    margin-top:20px;
  }
  .el-dialog__headerbtn{
    display: none;
  }
  .el-dialog__header{
    background: #e3e3e3;
  }
  .el-dialog__title{
    display: block;
    width:100%;
    text-align: center;
    margin-top:-18px;
    height:46px;
    line-height:46px;
    color:#333;
  }
  .el-dialog__body{
    margin-top:30px;
    padding:0;
    padding-left:20%;
  }
  .modalinput{
    width:40%;
    margin-left: 10px;
    height:30px;
    border-radius:5px;
    border:solid 1px #bfcbd9;
  }
  .modalul{
    list-style: none;
    margin-top:20px;
    li{
      height:50px;
    }
    .select{
      margin-left: 10px;
      height:30px;
      min-width: 70px;
    }
    .radio1{
      margin-left: 10px;
    }
    .block{
      display: inline;
      margin-left:10px;
      .jilian{
        input{
          width:90px;
          height:30px;
        }
      }
    }
  }
  .el-pagination{
    width:270px;
    margin:20px auto;
    .number{
      width:38px;
      height:38px;
      line-height: 38px;
    }
    .btn-prev,.btn-next{
      width:38px;
      height:38px;
    }
  }
}
</style>
