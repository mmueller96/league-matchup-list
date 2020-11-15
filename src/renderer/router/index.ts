import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
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
