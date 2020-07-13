/*
 * @Author: flynn.yang
 * @Date: 2020-06-22 14:18:34
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:29:32
 * @Description: 
 * @Version: 1.0
 */
export default [
    {
        name: '404',
        path: '/404',
        meta: {
            title: "404"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/404/index.vue')
    },

]