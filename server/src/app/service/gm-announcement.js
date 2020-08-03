import gmAnnouncementDao from '../dao/gm-announcement';
import { gmAnnouncementDO } from '../models/gm-announcement';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
import fs from 'fs';
import { dbSequelize } from '../../config';
import dayjs from 'dayjs';
class GmAnnouncementService extends BaseService{
	constructor() {
		super(gmAnnouncementDao);
	}
	async queryBulletin(data){
		console.log(data);
		return 1;
	}
	async createBulletin(data, files, id){
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
		let { channel } =data;
		if(channel.indexOf(',') != -1){
			channel = channel.split(',');
		}
		switch (typeof channel){
			case 'string':channel = `array['${channel}']`;break;
			case 'object':channel = `array[${channel.map(item => `'${item}'`)}]`;break;
			default :channel = null;
		}
		let sql = ` insert into gm_announcement 
		  (title,text,game_id,img_url,platform,client,link,bulletinid,create_user_id,type) 
		  VALUES
		  ('${data.title}','${data.text}','${data.gameid}','${filePath}',${data.plaform?`'${data.plaform}'` :null},${channel},'${data.a}','${data.bulletinid}','${id}',2) `;
		let res = await dbSequelize.query(sql);
		return res[1];
	}
	async createMarquee(data, id){
		let { channel, servername } =data;
		for(let [key, value] of Object.entries(data)){
			if(key === 'stime' || key === 'etime'){
				data[key] =	`'${dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss')}'`;continue;
			}
			data[key]= data[key]?`'${value}'`:null;

		}
		if(channel.indexOf(',') != -1){
			channel = channel.split(',');
		}
		switch (typeof channel){
			case 'string':channel = `array['${channel}']`;break;
			case 'object':channel = `array[${channel.map(item => `'${item}'`)}]`;break;
			default :channel = null;
		}
		if(servername.indexOf(',') != -1){
			servername = servername.split(',');
		}
		switch (typeof servername){
			case 'string':servername = `array['${servername}']`;break;
			case 'object':servername = `array[${servername.map(item => `'${item}'`)}]`;break;
			default :servername = null;
		}
		let sql = ` insert into gm_announcement 
		  (start_time,end_time,game_id, platform,client,bulletinid,create_user_id,type,weights,time_interval,servername) 
		  VALUES
		  (${data.stime},${data.etime},${data.gameid},${data.plaform?`${data.plaform}` :null},${channel},${data.bulletinid},${id},1,${data.weights} ,${data.interval},${servername}  ) `;
		let res = await dbSequelize.query(sql);
		return res[1];
	}
}
export default new GmAnnouncementService();