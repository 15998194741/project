import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';
import { reject } from 'ramda';

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
		let srttime = data['srttime[]'];
		console.log(srttime);
		var sql = `SELECT 
        roleId,roleName,platform,a.uid,pid,channel,deviceid,isOK,isSend,serverId,price,tid,a.createdAt,a.updatedAt 
        FROM  pay AS a 
        LEFT JOIN  
        users AS b 
       
        ON a.uid=b.uid 
        WHERE isOK IN ('success','sending','','failare')
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