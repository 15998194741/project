import request from '@/utils/request';


export function queryCharacter(params) { 
  return request({
    url: `character/query`,
    method: 'get',
    params
  });
}





export function findServername() { 
  return request({
    url: `character/findServername`,
    method: 'get'
  });
}



export function readfile(data) { 
  return request({
    url: `character/readfile`,
    method: 'post',
    data
  });
}



export function prohibitedMute(data) { 
  return request({
    url: `character/prohibitedMute`,
    method: 'post',
    data
  });
}
