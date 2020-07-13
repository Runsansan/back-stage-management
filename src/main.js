/*
 * @Author: flynn.yang
 * @Date: 2019-07-17 09:50:48
 * @LastEditors: flynn.yang
 * @LastEditTime: 2020-07-13 13:43:32
 * @Description: 
 * @Version: 1.0
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// require('./Mock.js')
import api from './api/index.js'
import './plugins/element.js'
import i18n from './i18n/i18n'
Vue.config.productionTip = false
import filter from './filter';
Vue.prototype.$axios = api
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
// 导入图片裁剪
import { VueCropper } from 'vue-cropper'
Vue.component('VueCropper', VueCropper)

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   NProgress.start();

//   // document.title = sessionStorage.getItem('documentTitle') ? sessionStorage.getItem('documentTitle') : '';
//   // const token = sessionStorage.getItem('token');
//   // if (!token && to.path !== '/login') {
//   //   next('/login');
//   // } else {
//   //   next();
//   // }
//   // next()
// });
// router.afterEach(() => {
//   NProgress.done();
// });
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
