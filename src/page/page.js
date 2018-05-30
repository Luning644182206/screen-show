/**
  @file: bootstrap script
  @date: 2018-04-22
*/

// bootstrap the app
import Vue from 'vue';
import Router from 'vue-router';
import vueAsyncData from 'vue-async-data';
import App from './app';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router);
Vue.use(vueAsyncData);
Vue.use(ElementUI);

// 注册app组件
Vue.component('app', App);
let rootApp = new Vue({
    data() {
        return {
            
        };
    }
}).$mount('app');

window.rootApp = rootApp;