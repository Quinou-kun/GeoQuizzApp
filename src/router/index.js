import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import New from '@/components/New'
import Game from '@/components/Game'
import Scoreboard from '@/components/Scoreboard'

Vue.use(Router)

export default new Router({
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
      component: Game
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: Scoreboard
    }
  ]
})
