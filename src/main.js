// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import Quasar from 'quasar-framework/dist/quasar.mat.esm'
import "quasar-framework/dist/umd/quasar.mat.css"

Vue.config.productionTip = false
Vue.prototype.moment = moment
Vue.use(Quasar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
