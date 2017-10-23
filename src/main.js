// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

import vueRouter from 'vue-router';
Vue.use(vueRouter);
import vuex from 'vuex';
Vue.use(vuex);
const state = {
    menuid: '1-1'
};
const actions = {
    changeMenuID({ commit }, menuid) { commit('changeMenuID', menuid); }
};
const mutations = {
    changeMenuID(state, menuid) {
        state.menuid = menuid;
    }
};
const getters = {};
const store = new vuex.Store({
    modules: {
        global: {
            state,
            actions,
            mutations,
            getters
        }
    }
});

import login from './components/admin/account/login.vue';
import layout from './components/admin/layout.vue';
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
import goodsedit from './components/admin/goods/goodsedit.vue';
import catelist from './components/admin/goods/catelist.vue';
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist, meta: { menuno: '1-1', ischangemenu: true } },
                { name: 'goodsedit', path: 'goodsedit/:id', component: goodsedit },
                { name: 'catelist', path: 'catelist', component: catelist, meta: { menuno: '1-2', ischangemenu: true } },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd }
            ]
        },
    ]
});
import axios from 'axios';
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
Vue.use(axios);
axios.defaults.withCredentials = true;
router.beforeEach((to, from, next) => {
    if (to.meta.ischangemenu) {
        localStorage.setItem('mName', to.name);
    }
    if (to.meta.menuno) {
        store.dispatch('changeMenuID', to.meta.menuno);
    };
    if (to.name == "login") {
        next();
    } else {
        axios.get('/admin/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({ name: "login" });
            }
        })
    }
});
const menulist = {
    '1-1': 'goodslist',
    '1-2': 'catelist'
};


import elementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
import '../statics/theme_rms/index.css';
import '../statics/css/site.css';
Vue.use(elementUI);
Vue.filter('datafmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();
    if (fmtstring == 'YYYY-MM-DD') {
        return y + "-" + m + "-" + d;
    };
    if (fmtstring == 'YYYY-MM-DD HH:MM:SS') {
        return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
    };
});



new Vue({
    el: '#app',
    router,
    store: store,
    render: create => create(App)
});