import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import New from '@/components/New'
import Game from '@/components/Game'
import Scoreboard from '@/components/Scoreboard'
import RefreshGame from '@/components/RefreshGame'
import Continue from '@/components/Continue'
import ls from 'local-storage'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      beforeEnter: (to, from, next) => {
        console.log(from.name)
        if (from.name === null) {
          console.log('coucou')
          next({name: 'RefreshGame', query: {redirect: to.fullPath}})
        } else {
          next()
        }
      }
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard
    },
    {
      path: '/continue',
      name: 'Continue',
      component: Continue
    },
    {
      path: '/refreshGame',
      name: 'RefreshGame',
      component: RefreshGame
    },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Continue' && ls.get('game') !== null) {
    next({name: 'Continue', query: {redirect: to.fullPath}})
  } else if (to.name === 'Continue' && ls.get('game') === null) {
    next({name: 'Home', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})
