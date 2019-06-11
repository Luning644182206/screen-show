/**
  @file: bootstrap script
  @date: 2018-04-22
*/

// bootstrap the app
const root=document.createElement('div');
document.body.appendChild(root);

import Vue from "vue";
// import router from "./router"; // 路由
// import store from "./store"; // 状态管理
import App from "app"; // 导入App组件（为什么这样导入？请看第四段中的第7）
import ElementUI from 'element-ui';
import './index.less';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
    // router,
    // store,
    render: h => h(App)
}).$mount(root);