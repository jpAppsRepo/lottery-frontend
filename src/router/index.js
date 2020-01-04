import Vue from 'vue'
import Router from 'vue-router'
import Lotteries from '@/components/lotteries/Lotteries'
import Winner from '@/components/lotteries/Winner'
import Match from '@/components/lotteries/Match'
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
    },
    {
      path: '/match',
      name: 'Match',
      component: Match
    }
  ]
})
