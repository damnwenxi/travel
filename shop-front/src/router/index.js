import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods'
import Login from '../components/Login'
import Register from '../components/Register'
import Cart from '../components/Cart'
import Admin from '../components/admin/admin'
import Detail from '../components/detail'
import Settle from '../components/settle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/order',
      name: 'order',
      component: Cart
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/settle',
      name: 'settle',
      component: Settle
    }
  ]
})
