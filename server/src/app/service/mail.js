import { dbSequelize } from '../../config';
const Sequelize = require('sequelize');


class MailService{
	constructor() {
	}
	async queryByParms(data){
		console.log('data: ', data);

		let {createTime, channel, servername, annex } = data;
		let {gameid:game_id, Id:roleid, plaform, pagesize, page} = data; 
		let condition  = {game_id, roleid, plaform };
		let where = 'where '; 
		let whereObj =[];
		for(let i in condition){
			if(!condition[i]){continue;}
			whereObj.push( ` ${i}= '${condition[i]}'`);
		}
		
		where += whereObj.join('  and  '); 
		channel = channel ?typeof channel === 'string'? [channel]:channel:false;
		servername = servername ?typeof servername === 'string'? [servername]:servername:false;
		annex = annex ?typeof annex === 'string'? [annex]:annex:false;
		where += !createTime?'':` and create_time between '${createTime[0]}' and  '${createTime[1]}'`;
		where += !channel ? '': ` and channel @> '[${channel.map(item => `"${item}"`)}]'::jsonb  `;
		where += !annex ? '': ` and annex @> '[${annex.map(item => `{"ID":"${item}"}`).join(',')}]'::jsonb  `;
		where += !servername ? '': ` and servername @> '[${servername.map(item => `${item}`).join(',')}]'::jsonb  `;
		console.log('where: ', where);
		console.log('whereObj: ', whereObj);
		let sql = `
			with asd as (			
				select * from gm_smtp ${where}
			)	,
			dsa as (select * from gm_server),
			ssss as( 
			select asd.servername, string_to_array(string_agg(dsa.servername, ','),',') as servernames from asd LEFT JOIN dsa on dsa.serverid::jsonb <@ (asd.servername)
			GROUP BY  asd.servername)
			select asd.* ,ssss.servernames from asd left join ssss on ssss.servername = asd.servername
		`;
		console.log(sql);
		let res = await dbSequelize.query(sql, {
			replacements:['active'], type:Sequelize.QueryTypes.SELECT
		});
		let totalsql = `
		select count(*) as total from gm_smtp ${where}
		`;
		let ress = await dbSequelize.query(totalsql, {
			replacements:['active'], type:Sequelize.QueryTypes.SELECT
		});
		return {data:res, total:ress[0].total?ress[0].total:0};
	}
	async getQueryAnnexOptions(data){
		let {gameid } = data;
		let res = await dbSequelize.query(`select classification as label , classification as value from gm_article where gameid =${gameid} GROUP BY classification  `);
		return res[0];
	}
	async getQueryAnnexOptionsLazy(data){
		let { gameid, label } = data;
		console.log('label: ', label);
		let res = await dbSequelize.query(`select name as label , article_id as value  , TRUE as leaf  from gm_article where gameid =${gameid} and classification = '${label}' `);
		return res[0];
	}
	async getQueryAnnexServernames(data){
		let { gameid } = data;
		let res = await dbSequelize.query(`with tableone as (select servername from gm_server GROUP BY servername having count(servername)>1),
        tabletwo as (select min(id) from gm_server GROUP BY servername HAVING count(servername)>1),
        tablethere as (select min(id) from gm_server GROUP BY servername HAVING count(servername)=1),
        tablemain as (select * from gm_server)
        select serverid as value ,servername as label from  tablemain where   tablemain.gameid = ${gameid} and  tablemain.id in (select * from tablethere ) or  tablemain.servername in  (select * from  tableone) and tablemain.id in (select * from  tabletwo)  `);
		return res[0];
	}
	async getPlaformChannelToservername(data){
		console.log('data: ', data);
		let { gameid, channel, plaform } = data;
		if(typeof channel ==='string'){
			channel = [channel];
		}
		let res = await dbSequelize.query(`select servername as label ,serverid as value from gm_server  where gameid =${gameid} and plaform ='${plaform}' and channel = array[${channel.map(item => `'${item}'`)}]::varchar[]  `);
		return res[0];
	}
	async postMailToCreate(data){
		let {gameid, title, text, mailLink:link, channel, plaform, Annex, serverName, roleId} =data;
		if(Annex){
			for(let i in Annex){
				Annex[i] = JSON.stringify(Annex[i]);
			}
		}
		console.log(data);
        
		let sql = ` 
        insert into  gm_smtp  
        (game_id,title,text,link,channel,plaform,annex,serverName,roleid)
        values
        (${gameid},'${title}','${text}','${link}',${channel.length?`'${JSON.stringify(channel)}'`:null},'${plaform}',${Annex?Annex.length >1?`'[${Annex}]'` :`'${Annex}'`:null},${serverName?serverName.length >1?`'[${serverName}]'`:`'${serverName}'`:null},'${roleId}')
        `;
		let res = await dbSequelize.query(sql);
		return res[1];
	}
    
	async annexAllQuery(data){
		let {gameid } = data;
		let res = await dbSequelize.query(`select 
        name as label ,
        article_id as value  from gm_article where gameid=${gameid}
        
        `);
		return res[0];
        
	}
	async findServerName(data){
		let {gameid } = data;
		let sql = ' select * from ';
		let res = await dbSequelize.query(sql, {
			replacements:['active'], type:Sequelize.QueryTypes.SELECT
		});
	}
	async mailSend(data){
		
	}


}
export default new MailService();
