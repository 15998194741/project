
const request = require('request');

class Cp{
	constructor(){	
		this.url= 'http://localhost:30000/api/';
	}
	async get(url, query){
		let res = {
			url:this.url+url,
			method:'GET',
			query
		};
		console.log(query);
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
				if(!error && response.statusCode == 200){
					return resolve(body);
				}else{
					return reject(error);			
				}
			});

		}); 
	}

}

export default new Cp();