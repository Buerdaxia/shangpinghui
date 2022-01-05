//axios的二次封装
import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// 要引入进度条的样式
import 'nprogress/nprogress.css';
/* nprogress的
  start方法：进度条开始 在请求拦截器中设置
  done方法：进度条结束  在响应拦截器中设置
*/
// 1.利用axios对象的方法create，去创建一个axios实例

const requests = axios.create({
	// 基础路径
	baseURL: '/api',
	// 请求超时时间5s
	timeout: 5000
	// 请求头
	// headers: headers
});

// 请求拦截器: 在发送请求之前，请求拦截器可以拦截到，可以在请求发送出去之前做一些操作

requests.interceptors.request.use(
	config => {
		//config：配置对象，对象里有一个属性很重要，headers请求头
		// Do something before request is sent
		// 进度条成功
		nprogress.start();
		return config;
	},
	error => {
		// Do something with request error
		return Promise.reject(error);
	}
);

// 响应拦截器：数据请求回来后可以做一些操作
requests.interceptors.response.use(
	res => {
		// 成功的回调函数
		// 进度条结束
		nprogress.done();
		return res.data;
	},
	error => {
		// 响应失败的回调
		// Do something with response error
		return Promise.reject(error);
	}
);

// 对外暴露分装好的axios对象
export default requests;
