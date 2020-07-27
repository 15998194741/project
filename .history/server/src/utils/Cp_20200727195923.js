
const request = require('request');

class Cp{
	constructor(){	
		this.url= 'http://103.210.21.117:8992/querySql';
	}
	async get(query){
		let res = {
			url:this.url
		};
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
				if(!error && response.statusCode == 200){
					return resolve(body);
				}else{
					return ;			
				}
			});

		}); 
	}

}

export default new Cp();