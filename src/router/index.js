import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'navebar',
    component: () => import('@/views/navebar'),
    meta: {
      keepAlive: false
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {
          keepAlive: false
        }
      }
     
    ]
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign/index'),
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/signarure',
    name: 'signarure',
    component: () => import('@/views/signarure/index'),
    meta: {
      keepAlive: false
    }
  },
  
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })

export default createRouter()
