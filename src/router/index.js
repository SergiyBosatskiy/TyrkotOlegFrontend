import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import constantRouterMap from './routers'

Vue.use(Router)

const router = new Router({
	// mode: 'history',
	routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
	const notAuthenticated = !store.getters.isAuthenticated
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (notAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router