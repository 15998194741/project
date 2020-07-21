import request from '@/utils/request';


export function queryCharacter(params) { 
  return request({
    url: `character/query`,
    method: 'get',
    params
  });
}
