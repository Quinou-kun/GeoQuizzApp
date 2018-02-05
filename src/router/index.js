import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import New from '@/components/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/new',
      name: 'New',
      component: New
    }
  ]
})
