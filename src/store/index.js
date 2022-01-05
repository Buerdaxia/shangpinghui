import Vue from 'vue';
import Vuex from 'vuex';

// 需要使用一下
Vue.use(Vuex);

// 引入入小仓库
import home from './home';
import search from './search';

/*
  state: 仓库存储数据的地方
  mutations: 修改state的唯一手段
  actions: 处理action，可以书写自己的业务逻辑，也可以处理异步
  getters: 可以理解为state的计算属性，能够简化仓库数据，让组件获取仓库更加方便
*/
// const state = {};
// const actions = {};
// const mutations = {};
// const getters = {};

export default new Vuex.Store({
	modules: {
		home,
		search
	}
});
