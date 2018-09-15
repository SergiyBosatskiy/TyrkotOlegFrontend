import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
  	//console.log(from.path)
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export const constantRouterMap = [
	
	{
		path: '/',
		component: Layout,
		hidden: true,
		beforeEnter: ifAuthenticated,
		children: [{
			path: '/',
			component: () => import('@/components/HelloWorld')
		}]
	},
	
	{
	 	path: '/login',
	 	name: 'Login',
	 	component: () => import('@/views/login/index'),
	 	beforeEnter: ifNotAuthenticated,
	 	hidden: true
	},

	{ path: '*', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  routes: constantRouterMap
})
