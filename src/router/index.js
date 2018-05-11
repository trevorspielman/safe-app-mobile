import Vue from 'vue'
import Router from 'vue-router'
import MobileHome from '@/components/MobileHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MobileHome',
      component: MobileHome
    }
  ]
})
