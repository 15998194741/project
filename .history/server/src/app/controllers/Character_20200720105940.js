import { controller, get, post, put, del, permission, login } from '../../lib/router-permission';
import statusCode from '../../utils/status-code';
import Ta from '../../utils/requests';
// import GmDictService from '../service/gm-dict';
import CharacterService from '../service/Character';
// import Components from '../service/Components';


@controller('/character')
export class CharacterController {

	@post('/query')
	async createserver(ctx) {
		ctx.log.resourceDesc = '角色查询';
		let data = ctx.request.body;
		console.log(data);
		// let result = await CharacterService.queryByParms(data);
		ctx.body = statusCode.SUCCESS_200('创建成功', );
	}

}