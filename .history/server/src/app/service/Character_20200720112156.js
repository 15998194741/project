import { dbSequelize } from '../../config';
import Ta from '../../utils/requests';
class CharacterService{
	constructor() {
		
	}

	static byData(data){
		let  whereObj = {};
		for (const key of Object.keys(data)) {
			data[key] && data[key]!='0'?whereObj[key] = data[key]:'';
		}
		data = null;
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		let where = [];
		if (whereObj){
			for( let [key, value] of Object.entries(whereObj)){
				keyss.includes(key)?where.push(`"#${key}"='${value}'`):where.push(`${key}='${value}'`); 
			}
			where = 'where '  + where.join(' and ');
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
				keyss.includes(key)?wheres.push(`and  "#${key}" BETWEEN '${value[0]}' and '${value[1]}' `):wheres.push(`and  "${key}" BETWEEN '${value[0]}' and '${value[1]}' `);
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
				keyss.includes(key)?wheres.push(`and  "#${key}" in (${value.map(item =>`'${item}'`).join(',')})`):wheres.push(`and  "${key}" in (${value.map(item =>`'${item}'`).join(',')}) `);
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

	async queryByParms(data){
		
		let {
			plaform,
			display,
			load,
			channel,
			srttime,
			key,
			value,
			test,
			mergeserver,
		
			
		  } = data;
		let page = 1; 
		let pagesize = 11;
		let gameid= 1;
		let token = await CharacterService.byOne(`select token from gm_game_token where gameid = '${gameid}' and type='character'`);
		token = token.token;
		// console.log('token: ', token);
		let wheres =  CharacterService.byData({ display, load });
		// wheres +=  CharacterService.byBetween(srttime);
		// wheres +=  CharacterService.byInArray({});
		let sql = `select  *  from v_event_49  offset ${pagesize*(page-1)} limit ${pagesize}  `;
		// let token = 'YErNGkQ0L94iVtuWV8MusVmckw1C3k3cS08yTw5U02BilgzNKF71AtiGeMUenMDn';
		console.log(sql);
		let res =   await Ta.tasql(sql, token);
		return res;
	}
}


export default new CharacterService();