import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoApi } from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{},
  },
  getters: {
  },
  mutations: {
    userInfo:(state,payload)=>{
      state.userInfo=payload
      console.log(payload);
    },
 
  },
  actions: {
    getUserInfoApi(){
    return  getUserInfoApi()
    }
  },
  modules: {
  }
})
