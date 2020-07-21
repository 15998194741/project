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

	static  byArrayIn(data){
		let  whereObj = {}; 
		console.log(data);
		for(const key of Object.keys(data)){
			data[key] && data[key].length !=0?whereObj[key] = data[key]:'';
		}
		data = null;
		let wheres=[];
		let keyss= ['update_time', 'ip', 'distinct_id', 'account_id'];
		if(whereObj){
			for(let [key, value] of Object.entries(whereObj)){
				wheres.push(`and    array[${value.map(item =>`'${item}'`).join(',')}]::varchar[] <@ "${keyss.includes(key)?'#':''}${key}" `);
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
		let condition = 'where ';
		condition += data?CharacterService.byData(data):'';
		condition += between?CharacterService.byBetween(between):'';
		condition += inArray?CharacterService.byInArray(inArray):'';
		condition += arrayIn?CharacterService.byArrayIn(arrayIn):'';
		console.log(arrayIn);
		console.log('condition: ', condition);
		// let res =  many?CharacterService.byMany(condition):CharacterService.byOne(condition);
		// return res;

		
		


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
		let many = true;
		let between ={
			srttime,
			test
		}; 
		display = 111;
		let datas = {
			display
		};
		let inArray={
			inarray:[1, 2, 3, 4, 5]
		};
		let arrayIn ={
			arrayIn:[2, 3, 4, 5, 6]
		};
		CharacterService.tosql({
			inArray,
			arrayIn,
			between,
			data:datas,
			many
		});
		
		let page = 1; 
		let pagesize = 10;
		let gameid= 1;
		let token = await CharacterService.byOne(`select token,tablename from gm_game_token where gameid = '${gameid}' and type='user'`);
		// let tablename = token.tablename;

		// token = token.token;
		// let wheres =  CharacterService.byData({ display, load });
		// wheres +=  CharacterService.byBetween({srttime});
		// wheres +=  CharacterService.byInArray({test});
		// let sql = `select  *  from ${tablename}  offset ${pagesize*(page-1)} limit ${pagesize}  `;	
		// let res =   await Ta.tasql(sql, token);
		// return res;
	}
}


export default new CharacterService();