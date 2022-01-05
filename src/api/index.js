// 当前这个模块：API进行统一管理

import requests from './request.js';

// 三级联动接口
// path:/api/product/getBaseCategoryList
// method: get
// params：none

// 将获得categoryList的函数暴露出去
export const reqCategoryList = () => {
	// 发请求
	return requests({ url: '/product/getBaseCategoryList', method: 'get' });
};
