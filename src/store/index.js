import Vue from 'vue'
import Vuex from 'vuex'
import mint from 'mint-ui'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import state from './state'
// import modules from './modules'
import './../assets/js/GTMC_JSSDK_V3.10.min.js';
import './../assets/js/jweixin-1.4.0.js'
Vue.use(Vuex)
Vue.use(mint)
Vue.prototype.GTMC = window.GTMC
console.log('state:',state)
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  // modules
})
