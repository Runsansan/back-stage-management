/*
 * @Author: flynn.yang
 * @Date: 2019-07-17 11:51:51
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:24:19
 * @Description: 
 * @Version: 1.0
 */
export default [
  {
    name: 'pages',
    path: '/pages',
    meta: {
      title: "首页"
    },
    component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/pages/pages.vue')
  },
  {
    name: 'shoppingCart',
    path: '/shoppingCart',
    meta: {
      title: "购物车"
    },
    component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/pages/shoppingCart.vue')
  },
  {
    name: 'shoppingList',
    path: '/shoppingList',
    meta: {
      title: "商品列表"
    },
    component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/pages/shoppingList.vue')
  }, {
    name: 'cart',
    path: '/cart',
    meta: {
      title: "购物车"
    },
    component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/pages/cart.vue')
  },

]