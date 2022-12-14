import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// SPA
// 首屏加载速度很慢
// 路由懒加载
// - 使用到了路由页面，再去请求他
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "base"  */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "base"  */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunName:"Search" */ '@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
