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
		let {bulletinid, plaform, servername, type, page, pagesize, gameid} =data;
		let setime = data['setime[]']; 
		let channel = data['channel[]'];
		let where = `where  game_id=${gameid} `;
		 data = {bulletinid, plaform, servername, type};
		for(let [key, value] of  Object.entries(data)){
			where += value?`and ${key} = '${value}'`:'';
		}
		where += setime?` and create_time  between '${dayjs(setime[0]).format('YYYY-MM-DD HH:mm:ss')}' and '${dayjs(setime[1]).format('YYYY-MM-DD HH:mm:ss')}'`:'';
		switch(typeof channel){
			case 'string':where += ` and '${channel}' = any(client)`;break;
			case 'object':where += ` and array[${channel.map(item => `'${item}'`)}]::varchar[] <@ client`;break;
		}
		let res = await dbSequelize.query(`select * from gm_announcement  ${where} offset ${pagesize*(page-1)} limit ${pagesize}`);
		let total = await dbSequelize.query(`select count(*) as total  from gm_announcement  ${where} `);
		res = res[0];
		total = total[0][0].total;
		return {res, total};
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
		  (title,text,game_id,img_url,plaform,client,link,bulletinid,create_user_id,type) 
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
		  (start_time,end_time,game_id, plaform,client,bulletinid,create_user_id,type,weights,time_interval,servername) 
		  VALUES
		  (${data.stime},${data.etime},${data.gameid},${data.plaform?`${data.plaform}` :null},${channel},${data.bulletinid},${id},1,${data.weights} ,${data.interval},${servername}  ) `;
		let res = await dbSequelize.query(sql);
		return res[1];
	}
	async updateBulletin(data){
		let res = await dbSequelize.query(`update gm_announcement set anno_status=1 where id='${data.id}'`);
		return res[0][0];
	}
}
export default new GmAnnouncementService();