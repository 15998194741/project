import request from '@/utils/request';


export function rechargeQuery(params) { 
  return request({
    url: `recharge/query`,
    method: 'get',
    params
  });
}
