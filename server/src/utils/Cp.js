import { dbSequelize } from '../config';

const request = require('request');

class Cp{
	constructor(){	
		this.url= 'http://localhost:30000/api/';
	}
	async post(gameid, url, data){
		let urls =await dbSequelize.query(`select url from gm_game_token where gameid=${gameid} and type = 'cp'`);
		urls = urls[0][0].url;
		let res = {
			url:urls+'/api/'+url,
			method:'POST',
			data
		};
		return new Promise((resolve, reject)=>{
			request(res, (error, response, body)=>{
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
	async put(gameid, url, data){
		let urls =await dbSequelize.query(`select url from gm_game_token where gameid=${gameid} and type = 'cp'`);
		urls = urls[0][0].url;
		let res = {
			url:urls+'/api/'+url,
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