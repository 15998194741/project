import gmServerDao from '../dao/gm-server';
import { gmServerDO } from '../models/gm-server';
import BaseService from '../../lib/base-service';
import statusCode from '../../utils/status-code';
const beanUtils = require('../../utils/bean-utils');
import { dbSequelize } from '../../config';

class GmServerService extends BaseService{
	constructor() {
		super(gmServerDao, gmServerDO);
		this.gmServerDao=gmServerDao;
		this.gmServerDO = gmServerDO;
	}
  
	//区服按需查找
	async serverFindByParam(findForm) {
		let channel = findForm[1];
		let page = findForm[5]?findForm[5]:1;
		let srttime = findForm[4]?JSON.parse(findForm[4]):undefined;
		let test = findForm[6]
		findForm = {
		  'plaform': findForm[0],
		  'display': findForm[2],
		  'load': findForm[3],
		  gameid:findForm.gameid,
		};
		console.log(findForm.test,123)
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
		where += channel? ` and '${channel}'=ANY(channel)`:'';
		where += srttime?` and srttime BETWEEN '${srttime.startTime}' and '${srttime.endTime}' `:'';
		where += `and test='${test}'`;
		let selectSql = `select * from gm_server  ${where} order by id limit 100 offset (100*${page-1})`;

		let arr =  await dbSequelize.query(selectSql);
		let totalSql = `select count(*) as total from gm_server ${where}`;
		let total = await dbSequelize.query(totalSql);
		arr.map(value => value.dataValues);
		let displayNumSql = `SELECT count(display) as num,display  from gm_server ${where} GROUP BY display ORDER BY display`;
		let displayNum = await dbSequelize.query(displayNumSql);
		let res = {
			...total[0][0],
			table:arr[0].length > 0 ?arr[0]:[],
			displayNum:displayNum[0],
		};
		return res;
	}


	async findServerByID(query){
		
		let where = `where ${query.key}='${query.value}' and gameid='${query.gameid}'`
		if(query.value === ''){	
			 where = `where gameid='${query.gameid}'`
		}
		let idFindSql = `SELECT *   from gm_server ${where}`;
		let res = await dbSequelize.query(idFindSql);
		return res[0] 
	}
  

}

export default new GmServerService();


