<template >
  <div class="right box"><br/>
    <h3 v-if="loginInfo!=='请登陆'">欢迎<span class="user">{{loginInfo}}</span>登陆<el-button type="text" @click="zhuxiao">／退出</el-button></h3>
    <h3 v-else><span @click="$router.push({path: '/login'})" class="user">未登陆，请登陆</span></h3>
    <el-card style="width:80%;">
      <div class="userinfo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="userinfo" style="margin-top:16px;">
        用户名&#12288;<el-input type="text" style="width:160px" disabled v-model="loginInfo"></el-input>
      </div>
      <div class="userinfo" style="margin-top:16px;">
        密&#12288;码&#12288;<el-input type="password" style="width:160px" disabled v-model="password"></el-input>
      </div>
    <el-button style="margin-top:16px" @click="changePassword">修改密码</el-button>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
        <el-input type="text" style="width:280px;display:block;margin-left:70px;" placeholder="旧密码" v-model="oldPassword"></el-input>
        <el-input type="text" style="width:280px;display:block;margin-left:70px;margin-top:16px;" placeholder="新密码" v-model="newPassword"></el-input>
        <el-input type="text" style="width:280px;display:block;margin-left:70px;margin-top:16px;" placeholder="确认密码" v-model="newPasswordAgain"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'console',
  props: {
    aaf: String
  },
  data () {
    const query = this.$route.query
    return {
      loginInfo: this.$store.state.a.loginInfo,
      userInfo: [],
      status: '',
      query: query,
      zhuShow: true,
      password: '',
      dialogVisible: false,
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      imageUrl: ''
    }
  },
  mounted () {
    if (this.$route.query.name) {
      this.loginInfo = this.$route.query.name
    }
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo)
    }
    let _userData = JSON.parse(localStorage.userInfo)
    for (let i = 0; i < _userData.length; i++) {
      if (_userData[i].name === this.loginInfo) {
        this.password = _userData[i].password
        this.imageUrl = localStorage.imageUrl
      }
    }
    console.log(_userData)
  },
  watch: {
    query (val) {
      this.loginInfo = val
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
      localStorage.imageUrl = this.imageUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    changePassword () {
      this.dialogVisible = true
      this.oldPassword = ''
      this.newPassword = ''
      this.newPasswordAgain = ''
    },
    updatePassword () {
      if (this.oldPassword === this.password) {
        let _data = JSON.parse(localStorage.userInfo)
        for (let i = 0; i < _data.length; i++) {
          if (_data[i].password === this.password) {
            if (this.newPassword === this.newPasswordAgain) {
              _data[i].password = this.newPassword
              this.$message('密码修改成功')
            } else {
              this.$message('两次输入密码不一致')
              return
            }
          }
        }
        localStorage.userInfo = JSON.stringify(_data)
        this.password = this.newPassword
        this.dialogVisible = false
      } else {
        this.$message('旧密码错误')
        return
      }
    },
    zhuxiao () {
      this.$confirm('确认退出登陆吗', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({path: '/login'})
        this.$store.commit('LOGIN_USER', '请登陆')
        this.$message({
          type: 'success',
          message: '成功退出'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登陆'
        })
      })
    },
    logOut () {
      this.$confirm('是否确认退出登陆', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          query: {

          }
        })
        this.loginInfo = '请登陆'
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    rigester () {
      this.flag = 1
      this.status = '注册'
      this.dialogVisible = true
      this.name = ''
      this.password = ''
    },
    login () {
      this.flag = 2
      this.status = '登陆'
      this.dialogVisible = true
      this.name = ''
      this.password = ''
    },
    add () {
      if (this.name === '' || this.password === '') {
        return alert('请输入用户名或密码')
      }
      if (this.flag === 1) {
        for (let i = 0; i < this.userInfo.length; i++) {
          if (this.name === this.userInfo[i].name) {
            return alert('该用户名已被占用，请重新输入,如已有账号请直接登陆')
          }
        }
        this.userInfo.push({name: this.name, password: this.password})
        localStorage.userInfo = JSON.stringify(this.userInfo)
        this.dialogVisible = false
      } else {
        if (this.userInfo.length === 0) {
          return alert('请输入正确的用户名和密码')
        } else {
          console.log(this.userInfo.indexOf({'name': `"${this.name}"`, 'password': `"${this.password}"`}))
          for (let i = 0; i < this.userInfo.length; i++) {
            if (this.name === this.userInfo[i].name && this.password === this.userInfo[i].password) {
              this.loginInfo = `${this.name}`
              console.log(this.name)
              this.$router.push({
                query: {
                  name: this.name
                }
              })
              this.dialogVisible = false
            }
            if (this.name !== this.userInfo[i].name || this.password !== this.userInfo[i].password) {
              if (i === this.userInfo.length - 1) {
                alert('用户名或密码错误，请重新输入')
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .box{
    padding-left:10px;
    .img{
      width:100px;
      height:100px;
    }
    .user{
      color:blue;
    }
    .input{
      width:160px;
      height:30px;
      margin:10px 0 10px 0px;
    }
    .button,select{
      width:60px;
      height:30px
    }
    span{
      margin:10px 0 0 0px;
    }
    .ul{
      list-style: none;

    }
    .span{
      letter-spacing:1em;
    }
    #demo{
      width:100px;
      button{
        width:70px;
        height:30px;
        border:none;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
      }
    }
    #example{
      button{
        width:70px;
        height:30px;
        border:none;
      }
      .bounce-enter-active{
        animation:bounce-in 2.5s;
      }
      .bounce-leave-active{
        animation:bounce-in 2.5s reverse;
      }
      @keyframes bounce-in {
        0%{
          transform:skew(0);
        }
        50%{
          transform:scale(1,5);
        }
        100%{
          transform:scale(1);
        }
      }
    }
  }
</style>
