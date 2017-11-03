<template>
  <div class="wrap-container inquiry-user">
        <Row class="card-body" :gutter="16">
          <Col span="7" class="ivu-col-bor">
            <Card dis-hover  class="major-tag">
              <!-- <Radio-group 
                @on-change="changeMajor"
                class="radios"
                v-model="department">
                <Radio v-for="(index,department) in departments" :label="index" :key="department"></Radio>
              </Radio-group> -->
              <Tabs @on-click="onchanged" v-model="tagName" class="ivu-col-bor tab-mojar">
                <TabPane v-for="(index,department) in departments" :name="index" :label="index" :key="department">
                  <UserShow
                    ref="left"
                    :down="line"
                    :reverse="reverse"
                    :addEditor="addEditor">
                  </UserShow>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span="7" class="ivu-col-bor">
            <Card dis-hover>
              <UserEditor :online="line" :removeEditor="removeEditor" :reverse="reverse"></UserEditor>
            </Card>
          </Col>
            <Col span="10" class="ivu-col-bor">
              <Card dis-hover>
                <UserPreview :getReceivers="getReceivers"
                            :major="department"
                            :reverse="reverse"
                            :online="line.online"
                            ref="save">
                </UserPreview>
              </Card>
            </Col>
        </Row>
  </div>
</template>
<script>
  import UserShow from './user/userShow'// 左边栏
  import UserEditor from './user/userEditor'// 中间栏
  import UserPreview from './user/userPreview'// 右边栏
  import { mapState } from 'vuex'
  import draggable from 'vuedraggable'
  export default {
    computed: {
      ...mapState({
        departments: r => r.doctorMajor
      })
    },
    components: {
      UserShow,
      UserEditor,
      UserPreview,
      draggable
    },
    data () {
      const query = this.$route.query
      return {
        department: query.major || '产科',
        tagName: '',
        lists: [], // 原始数据
        list: [],
        stopChange: false,
        line: {
          online: [],
          down: []
        },
        online: [], // 在线
        down: [], // 下线
        type: { '儿科': '产科', '产科': '儿科' },
        level: { '儿科': 'ERKE', '产科': 'CHANKE' },
        reverse: { 'ERKE': '儿科', 'CHANKE': '产科' },
        myArray: [
          {name: '12321'},
          {name: 'sssss'},
          {name: 'fffff'},
          {name: 'gggggg'},
          {name: 'ghhhhh'}
        ],
        myArray1: [
          {name: 'ttttt'},
          {name: 'yyyyy'},
          {name: 'uuuuu'},
          {name: 'iiiii'},
          {name: 'ooooo'}
        ]
      }
    },
    methods: {
      addEditor (index) {
        this.line.down[index].inquiry_online = true
        this.line.down[index]._new = true
        this.line.online = this.list.filter((value) => {
          return value.inquiry_online
        })
        this.line.down = this.list.filter((value) => {
          return !value.inquiry_online
        })
      },
      removeEditor (index) {
        this.line.online[index].inquiry_online = false
        this.line.online[index]._new = true
        this.line.online = this.list.filter((value) => {
          return value.inquiry_online
        })
        this.line.down = this.list.filter((value) => {
          return !value.inquiry_online
        })
      },
      keepChange () {
        let that = this
        this.$Modal.confirm({
          title: '提示',
          content: '有未发布的更改，请选择是否保存',
          onOk: () => {
            that.$refs.save.savePublication()
          },
          okText: '保存并发布',
          onCancel: () => {
            console.log(this.tagName)
          },
          cancelText: '取消'
        })
      },
      onchanged (val) {
        console.log(val)
        // this.keepChange()
        this.department = val.toUpperCase()
        this.query = this.$utils.handleQuery({ major: val }, this.$router)
        this.list = this.lists.filter((value) => {
          return value.inquiry_major === this.level[val]
        })
        this.line.online = this.list.filter((value) => {
          return value.inquiry_online
        })
        this.line.down = this.list.filter((value) => {
          return !value.inquiry_online
        })
      },
      changeMajor (val) {
        const isExist = this.lists.filter((value) => {
          return value._new
        })
        console.log(isExist)
        if (isExist.length > 0) {
          this.department = this.type[val]
          this.keepChange()
          return
          // return alert('您有未保存的数据')
        }
        this.department = val.toUpperCase()
        this.query = this.$utils.handleQuery({ major: val }, this.$router)
        this.list = this.lists.filter((value) => {
          return value.inquiry_major === this.level[val]
        })
        this.line.online = this.list.filter((value) => {
          return value.inquiry_online
        })
        this.line.down = this.list.filter((value) => {
          return !value.inquiry_online
        })
      },
      async getReceivers () {
        const resp = await this.$http.get('/v1/inquiry/receivers')
        this.lists = resp.data.receivers
        this.list = this.lists.filter((value) => {
          return value.inquiry_major === this.level[this.department]
        })
        this.line.online = this.list.filter((value) => {
          return value.inquiry_online
        })
        this.line.down = this.list.filter((value) => {
          return !value.inquiry_online
        })
      }
    },
    mounted () {
      this.getReceivers()
      setTimeout(() => {
        this.leng = this.line.online.length
        console.log(this.leng)
      }, 500)
    }
  }
</script>

<style lang="less">
.major-tag{
  width:100%;
  .ivu-card-body{
    width:100%;
    .ivu-tabs-nav{
      width:47%;
      .ivu-tabs-tab {
        width:100%;
        text-align: center;
      }
    }
  }
  .ivu-tabs-bar{
    margin-bottom:0px;
  }
}
  .inquiry-user {
      .ivu-card-body {
        padding: 0px;
      }
      .card-body {
        height: 660px;
        overflow: hidden;
        h4 {
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
        }
        .ivu-col-bor {
          height: 660px;
          &:last-child {
            border-right: none;
          }
        }
      }
  } 
</style>