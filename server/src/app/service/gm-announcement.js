import gmAnnouncementDao from '../dao/gm-announcement';
import { gmAnnouncementDO } from '../models/gm-announcement';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
class GmAnnouncementService extends BaseService{
	constructor() {
		super(gmAnnouncementDao);
	}
}

export default new GmAnnouncementService();