// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import axios from 'axios'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css'

Vue.use(Vuetify)
Vue.use(VueIziToast)

Vue.config.productionTip = false

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:7070/admin' : '/admin'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
