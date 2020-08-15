import Vue from 'vue';
import '@babel/polyfill';
import App from './App.vue';
import router from './router';
import {sync} from "vuex-router-sync";
import store from "@/store/store";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue';
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')