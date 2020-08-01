import gmDictDao from '../dao/gm-dict';
import { gmDictDO } from '../models/gm-dict';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
class GmDictService extends BaseService{
	constructor() {
		super(gmDictDao);
	}
	async findcomponent(parms) {
		let coms = await gmDictDao.findSqlByParamsToOne('select channel  as  values from gm_gam_token where type=:code  gameid=:gameid', parms);
		return coms;
	}
}

export default new GmDictService();