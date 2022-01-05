import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;

//引入全局组件
import TypeNav from '@/components/TypeNav';
Vue.component('TypeNav', TypeNav);

import { reqCategoryList } from '@/api/index.js';
reqCategoryList();

// 引入路由
import router from '@/router';

// 引入仓库
import store from '@/store';

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app');
