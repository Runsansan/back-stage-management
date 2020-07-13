/*
 * @Author: flynn.yang
 * @Date: 2020-06-22 14:18:34
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:22:39
 * @Description: 
 * @Version: 1.0
 */
export default [
    {
        name: 'hook',
        path: '/hook',
        meta: {
            title: "hook"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/echart/hook.vue')
    },
    {
        name: 'External',
        path: '/External',
        meta: {
            title: "External"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/External.vue')
    },

    {
        name: 'extend',
        path: '/extend',
        meta: {
            title: "扩展"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/extend.vue')
    },
    {
        name: 'suk',
        path: '/suk',
        meta: {
            title: "邻接矩阵"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/suk.vue')
    },
    {
        name: 'css',
        path: '/css',
        meta: {
            title: "样式"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/css.vue')
    },
    {
        name: 'VueCropper',
        path: '/VueCropper',
        meta: {
            title: "图片裁剪"
        },
        component: () => import(/* webpackChunkName: "components-count-to" */ '@/views/example/VueCropper.vue')
    },

]