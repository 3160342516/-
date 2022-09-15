import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 配置项
// key：默认值是vuex
// storage: 存储的方式，默认值是本地存储
// reducer:指定持久化哪些数据.函数,return一个对象，对象就作为存储的value
// - 参数state

export default new Vuex.Store({
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    islogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOUKEN(state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ]
})
