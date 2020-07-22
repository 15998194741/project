import { dbSequelize } from '../../config';
import Ta from '../../utils/requests';
import fs from 'fs';

class CharacterService{
	constructor() {
		
	}

	static byData(data){
		let  whereObj = {};
		for (const key of Object.keys(data)) {
			data[key] && data[key]!='0'?whereObj[key] = data[key]:'';
		}
		
		if(Object.keys(whereObj).length === 0){return '' ;}
		data = null;
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		let where = [];
		if (whereObj){
			for( let [key, value] of Object.entries(whereObj)){
				keyss.includes(key)?where.push(` "#${key}"='${value}'`):where.push(` ${key}='${value}'`); 
			}
			where = where.join(' and ');
			whereObj = null;
		}

		return where;
	}
	static byBetween(data){
		let  whereObj = {}; 
		for(const key of Object.keys(data)){
			data[key] && data[key].length !=0?whereObj[key] = data[key]:'';
		}
		data = null;
		let wheres=[];
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		if(whereObj){
			for(let [key, value] of Object.entries(whereObj)){
				keyss.includes(key)?wheres.push(` and  "#${key}" BETWEEN '${value[0]}' and '${value[1]}' `):wheres.push(`  and  "${key}" BETWEEN '${value[0]}' and '${value[1]}' `);
			}
			
		}
		wheres = wheres.join('  ');
		return wheres;
	}
	static byInArray(data){
		let  whereObj = {}; 
		for(const key of Object.keys(data)){
			data[key] && data[key].length !=0?whereObj[key] = data[key]:'';
		}
		data = null;
		let wheres=[];
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		if(whereObj){
			for(let [key, value] of Object.entries(whereObj)){
				
				if(typeof(value)==='string'){keyss.includes(key)?wheres.push(` and  "#${key}" = '${value}' `):wheres.push(` and  "${key}" = '${value}' `);continue;}
				keyss.includes(key)?wheres.push(` and  "#${key}" in (${value.map(item =>`'${item}'`).join(',')})`):wheres.push(` and  "${key}" in (${value.map(item =>`'${item}'`).join(',')}) `);
			}
		}
		return wheres.join(' ');
		
	}

	static  byArrayIn(data){
		let  whereObj = {}; 
		for(const key of Object.keys(data)){
			data[key] && data[key].length !=0?whereObj[key] = data[key]:'';
		}
		data = null;
		let wheres=[];
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		if(whereObj){
			for(let [key, value] of Object.entries(whereObj)){
				wheres.push(` and    array[${value.map(item =>`'${item}'`).join(',')}]::varchar[] <@ "${keyss.includes(key)?'#':''}${key}" `);
			}
		}
		
		return wheres.join(' ');
		
	}
	static async byOne(sql){
		let res = await dbSequelize.query(sql);
		return res[0][0]?res[0][0]:'';
	
	
	}
	static async byMany(sql){
		let res = await dbSequelize.query(sql);
		return res[0]?res[0]:'';
	}

	static tosql(dict){
		let { between, inArray, arrayIn, data, many } = dict;
		let condition = 'where  ';
		condition += data?CharacterService.byData(data):'';
		condition += between?CharacterService.byBetween(between):'';
		condition += inArray?CharacterService.byInArray(inArray):'';
		condition += arrayIn?CharacterService.byArrayIn(arrayIn):'';
		let cre = /^where(\s*)and(.*)/;
		condition = condition === 'where'?'':condition.replace(cre, 'where $1 $2');
		let cer = /^where(\s*)$/;

		return cer.test(condition)?'':condition ;
		// let res =  many?CharacterService.byMany(condition):CharacterService.byOne(condition);
		// return res;

		
		


	}

	async queryByParms(data){
		let pgsql=0;
		let datare = /(.*)\[\]$/;
		let query ={};
		for(let [i, j] of Object.entries(data)){
			query[i.replace(datare, '$1')]=j;
		}
	
		let {
			key,
			value,
			regtime,
			stime,
			plaform,
			channel,
			servername,
			banned_type,
			banned_area,
			gameid,
			page,
			pagesize
		  } = query;
		
		  let token = await CharacterService.byOne(`select token,tablename from gm_game_token where gameid = '${gameid}' and type='user'`);
		  let tablename = token.tablename;
		  token = token.token;

		let many = true;
		let between ={
			regtime,
			stime
		}; 
		if(stime || banned_type ||  banned_area){
			data = {
				[key]:value,
				plaform,
				banned_area,
				banned_type,
				servername,
				gameid
			};
			tablename = 'gm_character';
			pgsql=1;
		}else{
			data = {
				[key]:value,
				plaform,
				banned_area,
				banned_type,
				servername,
			};
		}

		let inArray={
			channel
		};
		let sqls = CharacterService.tosql({
			inArray,
			between,
			data,
			many
		});
		console.log(sqls);
		if(key === 'role_name' && value){sqls += `or role_name like '%${value.split('').join('%')}%'`;}
		let res;
		if(pgsql === 1){
			let sql = `select * from gm_character ${sqls} offset ${pagesize*(page-1)} limit ${pagesize}  `; 

			res =await CharacterService.byMany(sql);
		}else{
			let sql = `select  *  from ${tablename}  ${sqls} offset ${pagesize*(page-1)} limit ${pagesize}  `;	

			res =   await Ta.tasql(sql, token);
			if(!res){
				res='';
			}else{
				let children =  sqls?'':await CharacterService.byMany( `select * from gm_character  where gameid='${gameid}' and roleid in (${res.map(item => `'${item.roleid}'`)}) offset ${pagesize*(page-1)} limit ${pagesize}  `);
				if(children.length>0){
					res = res.map(item =>{
						let a = children.find(_item => _item.roleid===item.roleid);
						return {...item, ...a};
					});
				}
			
			}
		}
		// if(value && pgsql !==1 && res.length > 0){
		// 	console.log(res);
		// 	let wheres = res.map(item => item.roleid);
		// 	let sql = `select * from gm_character where gameid='${gameid}' and roleid in (${wheres.map(item=>`'${item}'`)})`; 	
		// 	console.log(sql);
		// 	let resu = await CharacterService.byMany(sql);
		// 	console.log(resu);

		// }
		return res;
	}

	async findServername(gameid){
		let res = await dbSequelize.query(`select servername from gm_server where gameid='${gameid}'` );
		let arr = res[0];
		return arr.map(item=>{
			return {label:item.servername, value:item.servername};
		});

	}

	async uploadFile(data){
		const path = require('path');
		for (let file of data) {
			// 创建可读流
			const reader = fs.createReadStream(file.path);
			// 获取上传文件扩展名
			let filePath = 'F:/\wenjian/\' + '${file.name}';
			// 创建可写流
			const upStream = fs.createWriteStream(filePath);
			// 可读流通过管道写入可写流
			reader.pipe(upStream);
		  }
	}



}


export default new CharacterService();