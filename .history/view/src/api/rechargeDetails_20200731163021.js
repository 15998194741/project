import request from '@/utils/request';


export function queryCharacter(params) { 
  return request({
    url: `recharge/query`,
    method: 'get',
    params
  });
}
