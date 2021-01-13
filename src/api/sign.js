import qs from 'qs'
import request from '@/utils/request'
// api


export function qrSave(params,baseUrl) {
  return request({
    url: baseUrl+'/seal-api/tPageSealService/saveQrCode',
    method: 'post',
    data: params
  })
}
// 用户信息
export function getUserInfo(params) {
  return request({
    url: '/user/userinfo',
    method: 'get',
    data: qs.stringify(params)
  })
}
