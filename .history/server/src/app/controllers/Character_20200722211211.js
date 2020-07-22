import { controller, get, post, put, del, permission, login } from '../../lib/router-permission';
import statusCode from '../../utils/status-code';
import Ta from '../../utils/requests';
// import GmDictService from '../service/gm-dict';
import CharacterService from '../service/Character';
// import Components from '../service/Components';


@controller('/character')
export class CharacterController {
	@get('/query')
	async queryCharacter(ctx) {
		ctx.log.resourceDesc = '角色查询';
		let data = ctx.query;
		let result = await CharacterService.queryByParms(data);
		ctx.body = statusCode.SUCCESS_200('创建成功', result);
	}



	@get('/findServername')
	async findServername(ctx) {
		ctx.log.resourceDesc = '区服名称获取';
		let data = ctx.query;
		let result = await CharacterService.findServername(data.gameid);
		ctx.body = statusCode.SUCCESS_200('查询成功', result);
	}

	@post('/uploadFile')
	async uploadFile(ctx) {
		ctx.log.resourceDesc = '文件上传';
		let data = ctx.request.files;
		var gameid = ctx.request.gameid;
 		let result = await CharacterService.uploadFile(data, gameid);
		ctx.body = statusCode.SUCCESS_200(result);
	}
	@get('/downloads')
	async downloads(ctx){
		ctx.log.resourceDesc = '文件下载';
		let data = ctx.request.files;
		var gameid = ctx.request.gameid;
 		let result = await CharacterService.uploadFile(data, gameid);
		ctx.body = statusCode.SUCCESS_200(result);
	}

}