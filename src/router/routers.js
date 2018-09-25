import Layout from '@/views/layout/Layout'

const constantRouterMap = [
	
	{
		path: '/',
		component: Layout,
		hidden: true,
		children: [{
			path: '/',
			component: () => import('@/components/HelloWorld'),
			meta: { requiresAuth: true }
		}]
	},
	
	{
	 	path: '/login',
	 	name: 'Login',
	 	component: () => import('@/views/login/index'),
		hidden: true,
		meta: { requiresAuth: false }
	},

	{ path: '*', component: () => import('@/views/404'), hidden: true }
]

export default constantRouterMap