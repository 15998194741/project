import { dbSequelize } from '../../config';
import Ta from '../../utils/requests';
import Cp from '../../utils/Cp';



class rechargeService{
	constructor() {
	}

	async query(data){
		console.log(data);
		return data;
	}



}

export default new rechargeService();