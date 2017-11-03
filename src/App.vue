<template>
  <div id="app">
    <div class='top'>
      <h4>十月呵护家庭医生系统</h4>
    </div>
    <div class='container'>
      <ul class="ull">
        <li><router-link :to="{path:'/console',query:{name:stateName}}">个人中心</router-link></li>
        <ol>
          <li v-on:click="show = !show"><router-link to="/homedoc">家庭医生<span></span></router-link></li>
          <transition name="fade" v-for="item in homedoc" :key = "item.id">
            <li  v-if="show"><router-link :to="item.pathd">{{item.name}}</router-link></li>
          </transition>
        </ol>
        <ol>
          <li v-on:click="isOnline = !isOnline"><router-link to="/online">线上咨询<span></span></router-link></li>
          <transition name="fade" v-for="item in online" :key = "item.id">
            <li v-if="isOnline"><router-link :to="item.pathd">{{item.name}}</router-link></li>
          </transition>
        </ol>
        <ol>
          <li v-on:click="isInfor = !isInfor"><router-link to="/information">基础信息管理<span></span></router-link></li>
          <transition name="fade" v-for="item in information" :key = "item.id">
          <li v-if="isInfor"><router-link :to="item.pathd">{{item.name}}</router-link></li>
          </transition>
        </ol>
        <ol>
          <li @click="isTrade=!isTrade"><router-link to="/trade">交易<span></span></router-link></li>
          <transition name="fade" v-for="item in trade" :key = "item.id">
            <li v-if="isTrade"><router-link :to="item.pathd">{{item.name}}</router-link></li>
          </transition>
        </ol>
        <ol>
          <li @click="isCount=!isCount"><router-link to="/count">统计<span></span></router-link></li>
          <transition name="fade" v-for="(item, index) in count" :key = "index">
            <li v-if="isCount"><router-link :to="item.pathd">{{item.name}}</router-link></li>
          </transition>
        </ol>
        <ol>
          <li @click="isSystem=!isSystem"><router-link to="/system">系统<span></span></router-link></li>
          <transition name="fade" v-for="item of system" :key = "item.id">
            <li v-if="isSystem"><router-link :to="item.pathd" >{{item.name}}</router-link></li>
          </transition>
        </ol>
      </ul>
      <router-view :aaf="aaa"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      aaa: '78748989',
      stateName: localStorage.stateName,
      isOnline: false,
      isInfor: false,
      isTrade: false,
      isCount: false,
      isSystem: false,
      show: false,
      system: [
        { pathd: '/system/usergroup', name: '用户组', id: '0' },
        { pathd: '/system/admin', name: '管理员', id: '1' }
      ],
      count: [
        { pathd: '/count/case', name: '套餐情况', id: '1' },
        { pathd: '/count/case', name: '问诊情况', id: '2' }
      ],
      trade: [
        { pathd: '/trade/order', name: '订单', id: '1' },
        { pathd: '/trade/refunds', name: '退款', id: '2' }
      ],
      information: [
        { pathd: '/information/hospital', name: '医院', id: '1' },
        { pathd: '/information/doctor', name: '医生', id: '2' },
        { pathd: '/information/record', name: '健康档案模版', id: '3' }
      ],
      online: [
        { pathd: '/online/admiss', name: '接诊控制台', id: '1' },
        { pathd: '/online/library', name: '接诊人员库', id: '2' },
        { pathd: '/online/groups', name: '接诊人员分组', id: '3' },
        { pathd: '/online/assess', name: '评价', id: '4' },
        { pathd: '/online/dynamics', name: '接诊动态', id: '5' }
      ],
      homedoc: [
        { pathd: '/homedoc/medical', name: '就诊控制台', id: '1' },
        { pathd: '/homedoc/service', name: '主动服务', id: '2' },
        { pathd: '/homedoc/user', name: '用户', id: '3' },
        { pathd: '/homedoc/team', name: '医生团队', id: '4' },
        { pathd: '/homedoc/meal', name: '套餐', id: '5' }
      ]
    }
  },
  methods: {
    add () {
      // if (!this.isActive) {
      //   this.isActive = true
      // } else {
      //   this.isActive = false
      // }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
}
html,body{
  width:100%;
  height:100%;
  font-size: 14px;
}
#app{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  .top{
    height:38.5px;
    width:100%;
    border-bottom: 1.5px solid #898989;
    h4{
      height:100%;
      width: 150px;
      color:white;
      line-height: 40px;
      background: #313e4e;
    }
  }
  .container {
    flex: 1;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: row;
    .ull{
      width:150px;
      height:100%;
      background: #313e4e;
      ol{
        li{
          overflow: hidden;
        }
        .fade-enter-active, .fade-leave-active {
          transition: height .3s
        }
        .fade-enter, .fade-leave-active {
          height: 0
        }
      }
      li{
        list-style: none;
        height: 30px;
        line-height: 30px;
        width: 150px;
        background: #313e4e;
        text-align: center;
        a{
          width:100%;
          height:100%;
          display: inline-block;
          color:#efefef;
          text-decoration: none;
          position: relative;
          span{
            position: absolute;
            display: inline-block;
            border:4px solid transparent;
            border-bottom:4px solid #fff;
            right:10px;
            top:6px;
          }
        }
      }
    }
  }
}
.right{
  flex:1;
  background: #f8f8f8;
}
</style>
