import request from '@/utils/request'
 
//签名添加
export const signSave = data => {
    return request({
        url:'/api-ca/seal/addSign',//'/api-ca/seal/addSign',
        method: 'post',
        data,
        loading:true
    })
}
export const addTmpSign = data => {//临时签字添加

    return request({
        url:'/sealTmp/addTmpSign',//'/api-ca/sealTmp/addTmpSign',
        method: 'post',
        data,
        loading:true
    });
};
export const addNameSign = data => {//6.添加合成印章


    return request({
        url:'/seal/addNameSign',//'/api-ca/seal/addNameSign',
        method: 'post',
        data,
        loading:true
    });
};
export const addTmpNameSign = data => {//6.添加合成印章


    return request({
        url:'/sealTmp/addTmpNameSign',//'/api-ca/sealTmp/addTmpNameSign',
        method: 'post',
        data,
        loading:true
    });
};
export const previewSign = data => {
 
    let url = '/seal/preview/'
    return url;
    // return baseApi+url+data+'?t=' +Math.random()+'&mobile_token='+getToken()///api-ca/seal/preview/
    
  };