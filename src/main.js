import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios' 
Vue.use(VueAxios, axios)

// import vSelect from 'vue-select'
// Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,  
  render: h => h(App)
}).$mount('#app')
