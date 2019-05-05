import Vue from 'vue'
import Router from 'vue-router'
import Goods from './goods'
import Order from './order'
import Comment from './comment'
import User from './user'
import EditGood from './editgood'
import AddGood from './addgood'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'goods',
      component: Goods
    },
    {
      path: 'admin/order',
      name: 'order',
      component: Order
    },
    {
      path: 'admin/user',
      name: 'user',
      component: User
    },
    {
      path: 'admin/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: 'admin/edit',
      name: 'edit',
      component: EditGood
    },
    {
      path: 'admin/add',
      name: 'add',
      component: AddGood
    },
  ]
})
