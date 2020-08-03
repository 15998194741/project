import request from '@/utils/request';

let headers = {
  'Content-Type': 'multipart/form-data'
};
export function postcreateAnnouncement(data) { 
  return request({
    url: `announcement/create`,
    method: 'POST',
    data,
    headers
  });
}


export function getqueryAnnouncement(data) { 
  return request({
    url: `announcement/query`,
    method: 'GET',
    data,
    headers
  });
}
