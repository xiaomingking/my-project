<template>
  <div class="user-preview">
    <h4 style="text-align:center">接诊人员预览</h4>
    <div class="introduce">
      <h3>{{major}}</h3>
      <p class="major" v-if="major === '产科'">十月呵护产科是围绕围产期女性开展的医疗健康服务的科室。内容包含：备孕指导、孕期产检、孕期生活方式指导、妊娠合并症并发症的预防、咨询，产后康复，母乳喂养等咨询服务。在这里没有患者，只有孕妈。</p>
      <p class="major" v-if="major === '儿科'">十月呵护儿科包含了发育儿科学、预防儿科学、临床儿科疾病学、幼儿心理学等学科，服务范围为儿科常见疾病咨询和防治、生长发育、营养健康指导等医疗服务。在这里没有患儿，只有宝宝。</p>
    </div>
    <div class="preview-container">
      <draggable v-model="online.online" class="dragArea" :options="{group:'people'}" @start="drag=true" @end="changed">
      <div v-for="(item, index) in online" class="row-preview" :key="index">
        <div class="photo">
          <img style="height: 48px; width: 48px;" :src="item.headimgurl" alt="">
        </div>
        <div class="content">
          <p>
            <span class="doctor-name">{{item.name}}</span>
            <span class="longebity"><b>{{reverse[item.inquiry_major]}}</b>&nbsp;<b>{{item.title}}</b></span>
          </p>
          <p class="middle">
            <span>擅长:&#12288;</span>{{item.expert}}
          </p>
          <p>
            <span class="price">¥{{item.inquiry_text_price}} </span><span class="question">1201个回答</span>
          </p>
        </div>
      </div>
      </draggable>
    </div>
    <div class="submit">
      <Button type="primary" @click="savePublication">保存并发布</Button>
    </div>
  </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  props: {
    online: {},
    major: {},
    reverse: {},
    getReceivers: {
      type: Function
    }
  },
  data () {
    return {
      level: { '儿科': 'ERKE', '产科': 'CHANKE' }
    }
  },
  methods: {
    changed () {
      this.drag = false
      console.log(this.online)
    },
    async postDoctor (data) {
      await this.$http.put('/v1/inquiry/receiver/set-online', data)
      this.getReceivers()
    },
    savePublication () {
      let major = this.level[this.major]
      const receivers = this.online.map((item) => {
        return item._id
      })
      this.postDoctor({ major: major, receivers: receivers })
    }
  }
}
</script>
<style lang="less" scoped>
.user-preview {
    .introduce {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .preview-container {
      height: 450px;
      overflow: auto;
      
    }
    .row-preview {
        padding: 10px;
        padding-left: 20px;
        height: auto;
        border-bottom: #eee 1px solid;
        display: flex;
      &:hover{
        background: #eee;
      }
      .photo {
        img {
          display: block;
          height: 58px;
          width: 58px;
          border: 1px solid #eee;
          border-radius: 30px;
        }
      }
      .content {
          flex: 1;
          padding-left: 20px;
          .doctor-name {
            display: inline-block;
            width: 48px;
          }
          .longebity {
            font-weight: 100;
            font-size: 12px;
          }
        .middle {
          font-size: 12px;
        }
        .price {
          color: #169BD5;
          display: inline-block;
          width: 48px;
        }
        .question {
          font-size: 12px;
        }
      }
  }
  .submit {
    text-align: center;
    height: 60px;
    line-height: 60px;
  }

  }
</style>