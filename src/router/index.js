import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'sign1',
    redirect: '/pageindex'
  },
  {
    path: '/pageindex',
    name: 'sign',
    component: () => import('@/views/sign/index'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/comindex',
    name: 'sign',
    component: () => import('@/views/sign/comindex'),
    meta: {
      keepAlive: false
    }
  },
  
  {
    path: '/signarure',
    name: 'signarure',
    component: () => import('@/views/signarure/drags'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/sign2',
    name: 'sign2',
    component: () => import('@/views/sign2/index'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/autograph',
    name: 'autograph',
    component: () => import('@/views/sign3/index'),
    meta: {
      keepAlive: false
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })

export default createRouter()
