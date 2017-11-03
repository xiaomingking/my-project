<template>
  <div class="user-editor">
    <h4 style="text-align:center">接诊人员页面编辑</h4>
    <div class="editor">
      <draggable v-model="online.online" class="dragArea" :options="{group:'people'}" @start="drag=true" @end="changed">
      <div class="row-editor" v-for="(item, index) in online.online" :key="index">
        <div class="box">
          <div class="photo">
            <img style="height: 48px; width: 48px;" :src="item.headimgurl" alt="">
          </div>
          <div class="center">
            <h3>{{item.name}}</h3>
            <p>
              <span class="kind">{{reverse[item.inquiry_major]}}</span>
              <span>{{item.title}}</span>
            </p>
          </div>
          <!-- <div class="change-btn">
            <Button @click="removeItemEditor(index)" type="text">
              <Icon size="30" color="#2db7f5" type="ios-trash"></Icon>
            </Button>
            <Button :disabled="true" v-if="index===0" type="text" @click="upMove(index)">
              <Icon size="30" color="#2db7f5" type="arrow-up-c"></Icon>
            </Button>
            <Button :disabled="false" v-else type="text" @click="upMove(index)">
              <Icon size="30" color="#2db7f5" type="arrow-up-c"></Icon>
            </Button>
            <Button type="text" :disabled="true" v-if="index===online.length-1" @click="downMove(index)">
              <Icon size="30" color="#2db7f5" type="arrow-down-c"></Icon>
            </Button>
            <Button type="text" :disabled="false" v-else @click="downMove(index)">
              <Icon size="30" color="#2db7f5" type="arrow-down-c"></Icon>
            </Button>
          </div> -->
        </div>
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
  props: ['online', 'removeEditor', 'reverse'],
  data () {
    return {
      editorInfo: [],
      online1: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.online1 = this.online.online
      console.log(this.online)
    }, 1000)
  },
  methods: {
    changed () {
      this.drag = false
      console.log(this.online)
    },
    upMove (index) { // 向上移动
      if (index === 0) {
        return
      }
      let obj = this.online[index]
      let obj1 = this.online[index - 1]
      this.online.splice(index - 1, 1, obj)
      this.online.splice(index, 1, obj1)
    },
    downMove (index) { // 向下移动
      if (index === this.online.length - 1) {
        return
      }
      let obj = this.online[index]
      let obj1 = this.online[index + 1]
      this.online.splice(index + 1, 1, obj)
      this.online.splice(index, 1, obj1)
    },
    removeItemEditor (index) { // 删除
      this.removeEditor(index)
    }
  }
}
</script>
<style lang="less" >
.dragArea {
  min-height: 50px;
}
.row-editor {
       border-bottom: #eee 1px solid;
       cursor:crosshair;
       .box {
         display: flex;
         height: 100%;
         width: 100%;
         padding: 10px;
         &.active {
           background: #eee;
         }
       }
       height : 70 px;
       padding-left : 10 px;
       &:hover{
         background: #eee;
         .change-btn {
           opacity: 1;
           transition: opacity 300ms ease-in;
         }
       }
       .change-btn {
         opacity: 0;
         margin-left: -10px;

         .ivu-btn {
           padding: 9px 5px 0 0;
         }
       }
       .center {
         flex: 1;
         h3 {
           margin-left: 20px;
           color: #333;
           font-size: 16px;
         }
         p {
           .kind {
             margin-left: 20px;
             display: inline-block;
             width: 40px;
           }
           margin-left : 20 px;
           line-height : 26 px;
           color:#666;
         }
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
 .user-editor {
   .editor {
     height: 620px;
     overflow: auto;
     
   }
 }

</style>