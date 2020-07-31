import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';

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
		var sql = 'select * from pay';
		connection.query(sql, (err, result)=>{
			if(err){
				console.log(err);
				return;
			}
			console.log(result);
		});
		
		return data;
	}



}

export default new rechargeService();