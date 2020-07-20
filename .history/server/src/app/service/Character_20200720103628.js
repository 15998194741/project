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
			page,
			pagesize,
			
		  } = data;
		let gameid= 1
		let token = CharacterService.byOne(`select * from gm_game_token where gameid = '${gameid}' and type='character'`);
		let wheres = CharacterService.byData({plaform, display, load, test});
		wheres += CharacterService.byBetween(srttime);
		wheres += CharacterService.byInArray({});
		let sql = `select  *  from v_event_49   ${wheres} sid=sid offset 100  limit 100 `;
		let token = 'YErNGkQ0L94iVtuWV8MusVmckw1C3k3cS08yTw5U02BilgzNKF71AtiGeMUenMDn';
		let res =   await Ta.tasql(sql, token);
		return res;
	}
}


export default new CharacterService();