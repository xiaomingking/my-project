
<template>
  <div class="right medical">
    <div id="top">
      <span>作品名称：</span>
      <input type="text" v-model="zuopin">
      <button @click="chaxun">查询</button>
      <button @click="created">全部</button><span v-show="err">不存在<button @click="err=false">关闭</button></span>
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="上线中" name="first">上线中</el-tab-pane>
      <el-tab-pane label="已下线" name="second">已下线</el-tab-pane>
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
    </el-tabs>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <span class="span">count:</span>
      <el-input v-model="inputcount" placeholder="请输入内容"></el-input><br><br>
      <span class="span">name:</span>
      <el-input v-model="inputname" placeholder="请输入内容"></el-input><br><br>
      <span class="span">title:</span>
      <el-input v-model="inputtitle" placeholder="请输入内容"></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add(dialogVisible = false)">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="myData"
      current-row-key
      border
      highlight-current-row
      row-key="key"
      style="width: 100%">
      <el-table-column
        prop="count"
        label="总数"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      size="tiny"
      :before-close="handleClose">
      <span class="span" >count:</span>
      <el-input v-model="encount" ></el-input><br><br>
      <span class="span">name: </span>
      <el-input v-model="enname" ></el-input><br><br>
      <span class="span">title:</span>
      <el-input  v-model="entitle" ></el-input><br><br>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button  type="primary" @click="fun()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'medical',
  data () {
    return {
      zuopin: '',
      aa: '就诊控制台',
      activeName2: 'first',
      url: 'https://api.douban.com/v2/book/1220562',
      myData: [],
      myData1: [],
      dialogVisible: false,
      dialogVisible1: false,
      inputcount: '',
      inputname: '',
      inputtitle: '',
      enname: '',
      encount: '',
      entitle: '',
      ke: '',
      err: false,
      nowindex: -2,
      arr: []
    }
  },
  methods: {
    quanbu () {
      alert(this.arr)
    },
    chaxun () {
      var leng = this.myData
      for (var i = 0; i < leng.length; i++) {
        if (this.zuopin === String(leng[i].count) || this.zuopin === leng[i].name || this.zuopin === leng[i].title) {
          leng.splice(0, leng.length, leng[i])
          this.err = false
        } else {
          this.err = true
        }
      }
    },
    unline () {

    },
    fun () {
      console.log(this.nowindex)
      this.dialogVisible1 = false
      this.myData.splice(this.nowindex, 1, { count: this.encount, name: this.enname, title: this.entitle })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name === 'first') {
        this.$http.jsonp(this.url).then((response) => {
            // success
          console.log(1)
          this.myData = response.body.tags
          this.myData1 = response.body.tags
          console.log(this.myData)
        }, (error) => {
          // error
          console.log(error)
        })
      }
      if (tab.name === 'second') {
        this.myData = this.arr
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    add () {
      this.myData.push({ count: this.inputcount, name: this.inputname, title: this.inputtitle })
      this.inputcount = ''
      this.inputname = ''
      this.inputtitle = ''
    },
    handleEdit (index, row) {
      console.log(row)
      this.dialogVisible1 = true
      this.encount = row.count
      this.enname = row.name
      this.entitle = row.title
      this.nowindex = index
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.myData.splice(index, 1)
    },
    created () {
      this.zuopin = ''
      this.$http.jsonp(this.url).then((response) => {
          // success
        console.log(1)
        this.myData = response.body.tags
        console.log(this.myData)
      }, (error) => {
        // error
        console.log(error)
      })
    }
  },
  computed: {
    count () {
      this.$store.commit('increment', 10)
      return this.$store.state.count
    }
  },
  created () {
    this.$http.jsonp(this.url).then((response) => {
        // success
      console.log(1)
      this.myData = response.body.tags
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
.medical{
  padding:10px 0 0 10px;
  #top{
    input{
      height:26px;
      width:150px;
    }
    button{
      width:50px;
      height: 26px;
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
  .el-dialog--tiny{
    width:500px;
    .span{
      margin-left: 100px;
      font-size: 20px;
      display: inline-block;
      width:60px;
      text-align: right;
    }
  }
  .el-input,.el-input__inner{
    width:auto;
    margin-left: 10px;
  }
}
</style>
