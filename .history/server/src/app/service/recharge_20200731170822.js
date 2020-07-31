import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';

var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
	host     : 'localhost',       
	user     : 'root',              
	password : '123456',       
	port: '3306',                   
	database: 'test' 
}); 
connection.connect();

class rechargeService{
	constructor() {
	}

	async query(data){
		console.log(data);
		return data;
	}



}

export default new rechargeService();