import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/content/Home').default
    },
    {
      path: '/matchup/:champion',
      name: 'matchup',
      component: require('@/components/content/Matchup').default
    },
  ]
})
