// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

import vueRouter from 'vue-router';
Vue.use(vueRouter);
import login from './components/admin/account/login.vue';
import layout from './components/admin/layout.vue';
import goodslist from './components/admin/goods/goodslist.vue';

var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist }
            ]
        },
    ]
});
import axios from 'axios';
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
Vue.use(axios);

import elementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';
Vue.use(elementUI);

new Vue({
    el: '#app',
    router,
    render: create => create(App)
});