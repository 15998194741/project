import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';
import { reject } from 'ramda';
import { dbSequelize } from '../../config';

var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
	host     : '117.50.10.34',       
	user     : 'gmfancyguo',              
	password : 'gmfancyguo!',       
	port: '3306',                   
	database: 'sdk' 
}); 
connection.connect();

class rechargeService{
	constructor() {
	}

	async query(data){

		let {roleid, stime, plaform, channel, servername, page, pagesize, gameid} = data;
		gameid =22222222;
		let srttime = data['srttime[]'];
		let serverid ;
		if(servername){
			 serverid = await dbSequelize.query(`select serverid from gm_server where  servername ='${servername}' `);
			serverid = serverid[0][0].serverid;		
		}
		console.log(channel);
		let where = `where  appid ='${gameid}'`;
		where += !srttime?'':` and a.createdAt between '${srttime[0]}' and '${srttime[1]}'`;
		where += !plaform ?  '' :plaform === '2'?' and type = \'apple\' ':plaform==='1'?' and type in (\'union\',\'alipay\',\'wechat\') ' :'';
		where += !serverid?'':` and serverId = '${serverid}'`;
		// let srttime = data['srttime[]'];
		// let where = ' WHERE isOK IN (\'success\',\'sending\',\'\',\'failare\')';
		// where += srttime?` between ${srttime[0]} and ${srttime[1]}  `:'';
		// where += roleid ? ` roleId = ${roleid} `:'';
		// where += channel ?`channel in (${channel})` :'';
		var sql = `SELECT 
        roleId,roleName,platform,a.uid,pid,channel,deviceid,isOK,isSend,serverId,price,tid,a.createdAt,a.updatedAt ,type
        FROM  pay AS a 
        LEFT JOIN  
        users AS b 
        ON a.uid=b.uid 
       ${where}
       limit ${pagesize}
       offset ${pagesize*(page-1)} 
        `;
		let res = await new Promise((resolve, reject)=>{
			connection.query(sql, async(err, result)=>{
				if(err){
					console.log(err);
					return;
				}
				return resolve(result);
            
			});
		});
		res = JSON.parse(JSON.stringify(res));
		return res;
	}



}

export default new rechargeService();