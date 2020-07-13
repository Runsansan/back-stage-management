import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'

import messages from './lang'
Vue.use(VueI18n)
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
// var lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器  
var lang = localStorage.getItem('i18')||'zh';
lang = lang.substr(0, 2);//截取lang前2位字符  ,中文就是zh,英文就是en
console.log(lang)
const i18n = new VueI18n({
    locale: lang||'en',
    messages,
})
locale.i18n((key, value) => i18n.t(key, value)) 
export default i18n