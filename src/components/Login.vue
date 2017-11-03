<template>
  <div class="login">
    <div class="box">
      <h2>后台管理系统</h2>
      <div class="center">
        <span class="reg">用户名</span>
        <input class="input" v-model="name" type='text'/>
      </div>
      <div class="center">
        <span class="reg span">密&#12288;码</span>
        <input class="input" v-model="password" type='password'/>
      </div>
      <div class="center btn-center">
      <el-button type="text" @click="lostPassword">忘记密码？</el-button>
      </div>
      <div class="footer">
        <el-button type="info" :plain="true"  @click="rigester">注册</el-button>
        <el-button type="success"  @click="add">登陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      password: '',
      userInfo: [],
      flag: 1
    }
  },
  mounted () {
    if (this.$route.query.name) {
      this.loginInfo = this.$route.query.name
    }
    if (localStorage.userInfo) {
      this.userInfo = JSON.parse(localStorage.userInfo)
    }
  },
  methods: {
    lostPassword () {

    },
    rigester () {
      if (this.name === '' || this.password === '') {
        return this.$message('请输入用户名或密码')
      }
      let uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      let reg = /^\d{6}$/
      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.name === this.userInfo[i].name) {
          return this.$message('该用户名已被占用，请重新输入,如已有账号请直接登陆')
        }
      }
      if (uPattern.test(this.name) || reg.test(this.password)) {
        this.userInfo.push({name: this.name, password: this.password})
        localStorage.userInfo = JSON.stringify(this.userInfo)
        this.$message('恭喜您注册成功请登陆')
        this.name = ''
        this.password = ''
      } else {
        this.$message({
          message: '用户名或密码格式错误',
          type: 'warning'
        })
      }
    },
    add () {
      if (this.name === '' || this.password === '') {
        return this.$message('请输入用户名或密码')
      }
      if (this.userInfo.length === 0) {
        return this.$meseage('请输入正确的用户名和密码')
      } else {
        for (let i = 0; i < this.userInfo.length; i++) {
          if (this.name === this.userInfo[i].name && this.password === this.userInfo[i].password) {
            this.loginInfo = `${this.name}`
            this.$router.push({
              query: {
                name: this.name
              },
              path: '/console'
            })
            this.$store.commit('LOGIN_USER', this.name)
            localStorage.stateName = this.name
            this.$message('登陆成功')
            return
          }
          if (this.name !== this.userInfo[i].name || this.password !== this.userInfo[i].password) {
            if (i === this.userInfo.length - 1) {
              this.$message('用户名或密码错误，请重新输入')
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.login{
  position: fixed;
  top:0;
  left:0;
  z-index: 99;
  background: #fff;
  width:100%;
  height:100%;
  background: #20A0FF;
  .box{
    background-color: rgba(255, 255, 255, 0.8);
    width:380px;
    height: auto;
    border-radius: 5px;
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    h2{
      font-size:16px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      //background: #D3DCE6;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .center{
      &:first-child{
        margin-top:0;
      }
      margin-top:12px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      input{
        margin-left:10px;
        height: 30px;
        width: 160px;
        border-radius: 3px;
        border:1px solid #ddd;
        background-color: rgb(250, 255, 189);
      }
      &.btn-center{
        margin-top:0px;
      }
      .el-button{
        margin-left:10px;
        width:110px;
        text-align: left;
      }
    }
    .footer{
      text-align: center;
      margin-top:10px;
      margin-bottom:20px;
    }
  }
}
</style>
