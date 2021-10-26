import qs from 'qs'
import request from '@/utils/request'
// api

// 文文
export function qrSave(params,baseUrl) {
  let str = ""
  if(params.accessToken){
    str = '/qrSealSave?accessToken='+params.accessToken
  }else{
    str = '/qrSealSave'
  }
  return request({
    url: baseUrl+str,
    method: 'post',
    data: params
  })
}
export function qrSave2(params,baseUrl) {
  let str = ""
  if(params.accessToken){
    str = '/seal-api/tPageSealService/saveQrCode?accessToken='+params.accessToken
  }else{
    str = '/seal-api/tPageSealService/saveQrCode'
  }
  return request({
    url: baseUrl+str,
    method: 'post',
    data: params
  })
}
// 冯路
export function qrSave1(params,baseUrl) {
  return request({
    url: baseUrl+'/api/seal/saveSealQr',
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
// 冯路
export function qrSavewebfront(params,baseUrl) {
  return request({
    url: baseUrl+'/api-sign/http/sealPage/saveQrCode',
    method: 'post',
    data: params
  })
}
