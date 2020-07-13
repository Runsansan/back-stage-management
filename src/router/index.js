/*
 * @Author: flynn.yang
 * @Date: 2019-07-17 09:55:00
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:47:13
 * @Description: 
 * @Version: 1.0
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const IndexRoute = {
  path: '/',
  component: () => import(/* webpackChunkName: "login" */ '@/views/Layout.vue'),
  redirect: '/login',
  children: []
}

let routes = [
  IndexRoute,
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },

  {
    path: '*',
    redirect: '/404'
  }
]

const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  IndexRoute.children = [...IndexRoute.children, ...(routerModule.default || routerModule)]
})

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})
