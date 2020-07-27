import cors from './cors';
import router from './router';
import permission from './permission';
import interceptor from './interceptor';
import auth from './auth';
const koaBody = require('koa-body');
import graphql from '../graphql/index';
import { url } from 'koa-router';
/**
* @idemon: 创建与 2019/5/28
* @auther: 杜宇 demonduyu@163.com
* @function:
*/
module.exports = (app) => {
	// 使用跨域
	// app.use(error());
	app.use(async (ctx, next)=>{
		const url = ctx.request.url;
		if(url.indexOf('/uploadFile')){
			return koaBody({
				multipart:true,
				formidable:{
					maxFileSize:200*1024*1024
				}
			});
		}
	});
	app.use(cors);
	app.use(interceptor());
	app.use(permission());
	app.use(auth);
	app.use(graphql);
	router(app); // 加载路由中间件
	
	// app.use(error);
};