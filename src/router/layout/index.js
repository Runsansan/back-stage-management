export default [
    {
        name: 'layout',
        path: '/layout',
        component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout.vue')
    }
]