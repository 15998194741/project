const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const util = require('util');
const verify = util.promisify(jwt.verify);
const statusCode = require('../utils/status-code');
export default async (ctx, next) => {
	let token =ctx.request.headers['fancy-guo-login-token'];
	let gameid = ctx.request.headers['gameid'];
	if ( token=== undefined ) {
		ctx.body = statusCode.ERROR_590('权限异常');
		return false;
	}else{
		try{
			let user =  await verify(token, secret.sign);
			ctx.user = user;
			console.log(ctx.query);
			gameid?ctx.request.body['gameid'] = gameid:'';
			gameid?ctx.query['gameid'] = gameid:'';

		}catch{
			ctx.body = statusCode.ERROR_590('权限异常');
			return false;
		}
		await next();
	}
};
