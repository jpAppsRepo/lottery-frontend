import Vue from 'vue'
import Router from 'vue-router'
import Lotteries from '@/components/lotteries/Lotteries'
import Winner from '@/components/lotteries/Winner'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lotteries',
      component: Lotteries
    },
    {
      path: '/winner',
      name: 'Winner',
      component: Winner
    }
  ]
})
