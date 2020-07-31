import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';

var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
	host     : '117.50.10.34',       
	user     : 'gmfancyguo',              
	password : 'gmfancyguo!',       
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