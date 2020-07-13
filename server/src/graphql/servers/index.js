class value{
	async hello(ctx, test, ok){
		console.log( ctx, test, ok);
		return JSON.stringify({hello:'helloworld',
			ok:'4546'});
	}
	async super(){
		return 'ojbk';
	}
}





module.exports = new value();