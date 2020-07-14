import gmServerDao from '../dao/gm-server';
import { gmServerDO } from '../models/gm-server';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
import { dbSequelize } from '../../config';
import dayjs from 'dayjs';
class GmServerService extends BaseService{
	constructor() {
		super(gmServerDao, gmServerDO);
		this.gmServerDao=gmServerDao;
		this.gmServerDO = gmServerDO;
	}
  
	//区服按需查找
	async serverFindByParam(findForm) {
		let getType = data => Object.prototype.toString.call(data).split(' ')[1].slice(0, -1);
		let channel = findForm['1[]'];
		let page = findForm[5]?findForm[5]:1;
		let pagesize = findForm[7]?findForm[7]:10;
		let srttime = findForm[4]?JSON.parse(findForm[4]):undefined;
		let test = findForm[6];
		findForm = {
		  'plaform': findForm[0],
		  'display': findForm[2],
		  'load': findForm[3],
		  gameid:findForm.gameid,
		};
		let  whereObj = {};
		for (const key in this.gmServerDO) {
			if (findForm[key] && findForm[key]!='0') {
				whereObj[key] = findForm[key];
			}
		}
		findForm = null;
		let where = [];
		if (whereObj){
			for( let [key, value] of Object.entries(whereObj)){
				where.push(`${key}='${value}'`); 
			}
			where = 'where '  + where.join(' and ');
			whereObj = null;
		}
		if(getType(channel)!= 'Undefined'){
			where += getType(channel)==='String'?` and '${channel}'=ANY(channel) `:` and array[${channel.map(item=>{
				return `'${item}'`;
			})}]::varchar[] <@  channel `;
		}
		
		// where += channel && channel.length > 0? ' and array[\''+channel.join(' ')+'\']::varchar[] <@  channel ':'';
		where += srttime?` and srttime BETWEEN '${srttime.startTime}' and '${srttime.endTime}' `:'';
		where += test?`and test='${test}'`:'';
		let selectSql = `select * from gm_server  ${where} order by id limit ${pagesize} offset (${pagesize}*${page-1})`;
		let arr =  await dbSequelize.query(selectSql);
		let totalSql = `select count(*) as total from gm_server ${where}`;
		let total = await dbSequelize.query(totalSql);
		arr.map(value => value.dataValues);
		let displayNumSql = `SELECT count(display) as num,display  from gm_server ${where} GROUP BY display ORDER BY display limit ${pagesize} offset (${pagesize}*${page-1})`;
		let displayNum = await dbSequelize.query(displayNumSql);
		let pidarr = [];
		if(arr[0].length > 0){
			 pidarr = arr[0].map(item =>{
				return item.pid?{...item, hasChildren: true}:item;
			});
		}
		let res = {
			...total[0][0],
			table:pidarr,
			displayNum:displayNum[0],
			page
		};
		return res;
	}


	async findServerByID(query){
		
		let where = `where ${query.key}='${query.value}' and gameid='${query.gameid}'`;
		if(query.value === ''){	
			 where = `where gameid='${query.gameid}'`;
		}
		let idFindSql = `SELECT *   from gm_server ${where}`;
		let res = await dbSequelize.query(idFindSql);
		return res[0]; 
	}
	async mergeServer(data){
		let a = data.map(item=> {return `'${item.serverid}'`;});
		let where = `where gameid ='${data.gameid}' and serverid in (${a.join(',')})`;
		let pid = dayjs(new Date()).format('YYMMDDHHmmss');
		let querySql = `update gm_server set pid='${pid}'  ${where}`;
		let res = await dbSequelize.query(querySql);
		return res;
	

	}
	idRandom(lengths) {
		let randomString = '';
		for (let i = 0; i < lengths; i++) {
		  randomString += Math.ceil(Math.random() * 10).toString();
		}
		return randomString;
	  }

}

export default new GmServerService();


