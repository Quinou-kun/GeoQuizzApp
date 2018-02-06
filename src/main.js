// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import L from 'leaflet'
require('bootstrap/dist/css/bootstrap.css')

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconUrl : require('leaflet/dist/images/marker-icon.png')
})

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
