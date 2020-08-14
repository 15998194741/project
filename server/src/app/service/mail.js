import { dbSequelize } from '../../config';
const Sequelize = require('sequelize');


class MailService{
	constructor() {
		
	}
	async queryByParms(data){
		console.log('data: ', data);

		let {createTime, channel, servername } = data;
		let {gameid:game_id, Id:roleid, plaform, pagesize, page} = data; 
		let condition  = {game_id, roleid, plaform };
		let where = 'where '; 
		let whereObj =[];
		for(let i in condition){
			if(!condition[i]){continue;}
			whereObj.push( ` ${i}= '${condition[i]}'`);
		}
		where += whereObj.join('  and  '); 
		where += 
		console.log('where: ', where);
		console.log('whereObj: ', whereObj);
		let sql = `
        select * from gm_smtp ${where}
        `;
		let res = await dbSequelize.query(sql, {
			replacements:['active'], type:Sequelize.QueryTypes.SELECT
		});
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
        select id as value ,servername as label from  tablemain where   tablemain.gameid = ${gameid} and  tablemain.id in (select * from tablethere ) or  tablemain.servername in  (select * from  tableone) and tablemain.id in (select * from  tabletwo)  `);
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
		console.log('data: ', data);
		let {gameid, title, text, mailLink:link, channel, plaform, Annex, serverName, roleId} =data;
		if(Annex){
			for(let i in Annex){
				Annex[i] = JSON.stringify(Annex[i]);
			}
			// Annex =JSON.stringify(Annex);
		}
      
        
		let sql = ` 
        insert into  gm_smtp  
        (game_id,title,text,link,channel,plaform,annex,serverName,roleid)
        values
        (${gameid},'${title}','${text}','${link}',${channel.length?`'${JSON.stringify(channel)}'`:null},'${plaform}',${Annex?Annex.length >1?`'[${Annex}]'` :`'${Annex}'`:null},${serverName?`'${serverName}'`:null},'${roleId}')
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


}
export default new MailService();
