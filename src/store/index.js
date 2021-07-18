import Vue from 'vue'
import Vuex from 'vuex'
import patients from '@/store/patients'
import consultations from '@/store/consultations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    patients,
    consultations
  }
})
