import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

sync(store, router)

Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
