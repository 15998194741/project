import request from '@/utils/request';


export function findComponents(params) { 
  return request({
    url: `character/query`,
    method: 'get',
    params
  })
  ;
}
