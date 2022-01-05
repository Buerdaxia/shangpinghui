// 引入封装好的接口
import { reqCategoryList } from '@/api';
// search模块的小仓库
const actions = {
	// 通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
	// 这里直接解构出context中的commit
	async categoryList({ commit }) {
		let result = await reqCategoryList();
		if (result.code === 200) {
			commit('CATEGORYLIST', result.data);
		}
	}
};
const mutations = {
	CATEGORYLIST(state, categoryList) {
		// 赋值操作，将数据修改进state
		state.categoryList = categoryList;
	}
};
const getters = {};
const state = {
	/* 起始值，要根据接口的返回值确定
     如果返回服务器返回数组，那起始值为空数组
     如果返回数据为对象，那起始值就空对象
  */
	categoryList: []
};
export default {
	state,
	mutations,
	actions,
	getters
};
