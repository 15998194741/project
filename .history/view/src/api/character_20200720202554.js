import request from '@/utils/request';


export function findComponents(params) { 
  return request({
    url: `server/selectComponent`,
    method: 'get',
    params
  })
  ;
}
