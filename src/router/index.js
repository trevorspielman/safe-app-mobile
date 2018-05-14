import Vue from 'vue'
import Router from 'vue-router'
import MobileHome from '@/components/MobileHome'
import Deposit from '@/components/Deposit'
import Withdraw from '@/components/Withdraw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MobileHome',
      component: MobileHome
    },
    {
    path: '/deposit',
    name: 'Deposit',
    component: Deposit
    },
    {
    path: '/withdraw',
    name: 'Withdraw',
    component: Withdraw
    },
  ]
})
