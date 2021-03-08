import qs from 'qs'
import request from '@/utils/request'
// api

// 文文
export function qrSave(params,baseUrl) {
  return request({
    url: baseUrl+'/seal-api/tPageSealService/saveQrCode',
    method: 'post',
    data: params
  })
}
// 冯路
export function qrSave1(params,baseUrl) {
  return request({
    url: baseUrl+'/manage/seal/saveSealQr',
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
