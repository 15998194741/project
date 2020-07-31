import { controller, get, post, put, del, permission, login } from '../../lib/router-permission';
import statusCode from '../../utils/status-code';
import rechargeService from '../service/recharge';


@controller('/recharge')
export class rechargeController {

    @get('/query')
	async queryCharacter(ctx) {
		ctx.log.resourceDesc = '充值订单查询';
		let data = ctx.query;
		let result = await CharacterService.queryByParms(data);
		ctx.body = statusCode.SUCCESS_200('修改成功', result);
	}



}