// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);

// 引入组件地方
import Home from '@/pages/Home/index';
import Search from '@/pages/Search/index';
import Login from '@/pages/Login/index';
import Register from '@/pages/Register/index';

// 备份一份VueRouter的push方法
let originPush = VueRouter.prototype.push;

// 重写以下push方法
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		originPush.call(this, location, resolve, reject);
	} else {
		originPush.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

export default new VueRouter({
	// 配置路由：
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			component: Home,
			meta: { show: true }
		},
		{
			name: 'search',
			path: '/search/:keyword?', //使用params参数需要占位
			component: Search,
			meta: { show: true }
		},
		{
			path: '/login',
			component: Login,
			meta: { show: false }
		},
		{
			path: '/register',
			component: Register,
			meta: { show: false }
		}
	]
});
