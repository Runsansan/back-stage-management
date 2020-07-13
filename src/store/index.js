
import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import cart from './modules/cart'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        common,
        cart
    },
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]

})

export default store