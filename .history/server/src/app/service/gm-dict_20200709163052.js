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
		let coms = await gmDictDao.findSqlByParamsToOne('select values from gm_dict where code = :code and gameid=:gameid', parms);
		return coms;
	}
}

export default new GmDictService();