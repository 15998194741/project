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
		
		if(Object.keys(whereObj).length === 0){return 'where ';}
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
				console.log(key, value);
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

	static byArrayIn(data){
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
			
			key,
			value,
			
			mergeserver,
		
			
		  } = data;
		let srttime = ['2012-09-01', '2020-01-01'];
		let test = ['2012-09-01', '123'];

		let page = 1; 
		let pagesize = 1;
		let gameid= 1;
		let token = await CharacterService.byOne(`select token from gm_game_token where gameid = '${gameid}' and type='character'`);
		token = token.token;
		let wheres =  CharacterService.byData({ display, load });
		wheres +=  CharacterService.byBetween({srttime});
		wheres +=  CharacterService.byInArray({test});
		let sql = `select  "relo_name"  from v_event_49  offset ${pagesize*(page-1)} limit ${pagesize}  `;
		token = 'YErNGkQ0L94iVtuWV8MusVmckw1C3k3cS08yTw5U02BilgzNKF71AtiGeMUenMDn';  //假token
		let res =   await Ta.tasql(sql, token);
		return res;
	}
}


export default new CharacterService();