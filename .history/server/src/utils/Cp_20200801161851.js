
const request = require('request');

class Cp{
	constructor(){	
		this.url= 'http://localhost:30000/api/';
	}
	async post(gameid, url, data){
		let res = {
			url:this.url+url,
			method:'GET',
			data
		};
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
				// if(!error && response.statusCode == 200){
				return resolve(body);
				
			});

		}); 
	}

	async get(url, query){
		let res = {
			url:this.url+url,
			method:'GET',
			query
		};
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
				// if(!error && response.statusCode == 200){
				return resolve(body);
				
			});

		}); 
	}
	async put(url, data){
		let res = {
			url:this.url+url,
			method:'PUT',
			data
		};
	
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
				
				return resolve(body);
				
			});

		}); 
	}

}

export default new Cp();