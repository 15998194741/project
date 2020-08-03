import gmAnnouncementDao from '../dao/gm-announcement';
import { gmAnnouncementDO } from '../models/gm-announcement';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
import fs from 'fs';
import { dbSequelize } from '../../config';
class GmAnnouncementService extends BaseService{
	constructor() {
		super(gmAnnouncementDao);
	}
	async createBulletin(data, files, id){
		console.log(id);
		const path = require('path');
		  const file = files.images;
		  let filePath= await new Promise((resolve, reject)=>{
			const reader = fs.createReadStream(file.path);
			let filePath = path.join(__dirname, '../../images/') + `${data.bulletinid}+${file.name}`;
			const upStream = fs.createWriteStream(filePath);
			reader.pipe(upStream);
			reader.on('end', async(err)=>{
				if(err){
					reject(false);
				}
				resolve(filePath);
			});
		});
		

		return 1;
	}
	async createMarquee(data){
		return 1;
	}




}

export default new GmAnnouncementService();