



const request = require('request');

class Cp{
	constructor(){
		this.form = {
			'sql':'',
			'token':'YErNGkQ0L94iVtuWV8MusVmckw1C3k3cS08yTw5U02BilgzNKF71AtiGeMUenMDn',
			'format':'csv'
		};
		this.headers={
			'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryT24eFfuVgUmT7SsO',
			'Accept':'application/json, text/javascript, */*; q=0.01',
			'Accept-Encoding':'gzip, deflate'
		};
		this.url= 'http://103.210.21.117:8992/querySql';
		this.method = 'POST';
		this.res='';
	}
    

}

export default new Cp();