<template>
  <div class="user-show">
    <div class="addinfo">
       <draggable v-model="down.down" class="dragArea" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <div class="row-show" v-for="(item, index) in down.down" :key="index">
        <div class="photo">
          <img style="height: 48px; width: 48px;" :src="item.headimgurl" alt="">
        </div>
        <div class="content">
          <h3>{{item.name}}</h3>
          <p>
            <span class="kind">{{reverse[item.inquiry_major]}}</span>
            <span>{{item.title}}</span>
          </p>
        </div>
        <!-- <div class="add-btn">
          <Button type="info" size="small" icon="plus-round" @click="newlyUser(index)">新增</Button>
        </div> -->
      </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: ['down', 'addEditor', 'reverse'],
  data () {
    return {
      userData: [],
      sendEditor: [],
      showData: []
    }
  },
  methods: {
    newlyUser (index) {
      this.addEditor(index)
    }
  }
}
</script>
<style lang="less" >
 .dragArea {
    min-height: 50px;
  }
 .user-show {
   background: #fff;
    .addinfo {
      height: 635px;
      overflow: auto; 
    }
  }
 .row-show {
   background:#f5f5f5;
  cursor:crosshair;
  padding: 10px;
  padding-left: 20px;
  height: 70px;
  display: flex;
  margin:10px 0;
  .content {
    flex: 1;
    h3 {
      margin-left: 20px;
      color: #333;
      font-size: 16px;
    }
    p {
      .kind {
        margin-left:20px;
        display: inline-block;
        width: 40px;
      }
      margin-left : 20 px;
      line-height : 26 px;
      color:#666;
    }
  }
  .add-btn {
    opacity: 0;
    margin-top: 10px;
  }
    .photo {
      img {
        display: block;
        height: 48px;
        width: 48px;
        border: 1px solid #eee;
        border-radius: 25px;
      }
    }
  }
</style>
<style lang="less">
.user-show {
  .add-btn {
    .ivu-btn-small {
      span {
        margin-left: 0px;
      }
    }
  }
}

</style>