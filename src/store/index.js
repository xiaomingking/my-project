import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
export const TEST_MODULEA = 'TEST_MODULEA'
export const ACT_MODULEA = 'ACT_MODULEA'
export const TEST_MODULEB = 'TEST_MODULEB'
export const ACT_MODULEB = 'ACT_MODULEB'
export const LOGIN_USER = 'LOGIN_USER'
Vue.use(Vuex)

const moduleA = {
  state: {
    TestA: 'A',
    loginInfo: '请登陆',
    count: 1,
    _data: []
  },
  mutations: {
    [TEST_MODULEA] (state, _d) {
      state._data = _d
    },
    [LOGIN_USER] (state, user) {
      state.loginInfo = user
    }
  },
  actions: {
    [ACT_MODULEA] ({ commit }) {
      let _d = []
      axios({
        method: 'get',
        url: 'static/data.json'
      }).then(function (res) {
        console.log(res)
        _d = res
        commit('TEST_MODULEA', _d)
      })
    }
  }
}
const moduleB = {
  state: {
    TestB: 'B',
    count: 2
  },
  mutations: {
    [TEST_MODULEB] (state) {
      return state.count++
    },
    [ACT_MODULEB] ({state, commit, rootState}) {
      if ((state.count + rootState.a.count) % 2 === 1) {
        return state.count--
      }
    }
  },
  actions: {
    addData ({ commit }) {
      commit(TEST_MODULEB)
    }
  }
}
const Store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
  // state: {
  //   count: 0,
  //   url: 'https://api.douban.com/v2/book/1220562',
  //   theData: [ 1, 2, 3, 4, 5, 6 ]
  // },
  // getters: {
  //   evenww: state => {
  //     return state.theData.filter(el => el % 2 === 0)
  //   },
  //   even: state => {
  //     return state.theData.filter(el => el % 2 !== 0)
  //   }
  // },
  // mutations: {
  //   increment (state) {
  //     return state.count++
  //   }
  // },
  // actions: {
  //   increment ({ commit }) {
  //     setTimeout(() => {
  //       commit('increment')
  //     }, 1000)
  //   }
  // }
  // modules: {
  //   test: {
  //     namespaced: true,
  //     state: {
  //       count: 0
  //     },
  //     getters: {
  //       add: state => {
  //         return state.count++
  //       }
  //     },
  //     mutations: {
  //       mutadd (state) {
  //         return state.count++
  //       }
  //     },
  //     actions: {
  //       actadd ({commit}) {
  //         setTimeout(() => {
  //           commit('actadd')
  //         }, 1000)
  //       }
  //     }
  //   }
  // }
})
export default Store
