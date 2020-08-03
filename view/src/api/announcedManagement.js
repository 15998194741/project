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
