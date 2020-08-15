import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store";
import LogIn from '@/views/LogIn'
import Register from '@/views/Register'
import Reservations from '@/views/Reservations'
import Home from '@/views/Home'
import Account from '@/views/Account'
import CreateReservation from '@/views/CreateReservation'
import UpdateReservation from '@/views/UpdateReservation'

Vue.use(Router)

function guard(to, from, next){
  if(store.state.user){
    next();
  } else {
    next('/login');
  }
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/reservations',
      beforeEnter: guard,
      name: 'reservations',
      component: Reservations
    },
    {
      path: '/account',
      beforeEnter: guard,
      name: 'account',
      component: Account
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reservations/create',
      beforeEnter: guard,
      name: 'createReservation',
      component: CreateReservation
    },
    {
      path: '/reservations/update/:id',
      beforeEnter: guard,
      name: 'updateReservation',
      component: UpdateReservation
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
