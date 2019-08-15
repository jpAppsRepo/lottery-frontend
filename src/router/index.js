import Vue from 'vue'
import Router from 'vue-router'
import Lotteries from '@/components/lotteries/Lotteries.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lotteries',
      component: Lotteries
    }
  ]
})
