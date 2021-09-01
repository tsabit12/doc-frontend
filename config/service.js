import axios from 'axios';
import dev, { url as urldev } from './platform/dev';
import prod, { url as urlprod } from './platform/prod';
import platform from './platform';

let useService      = dev;
let defaultasseturl = urldev; 

if(platform === 'prod'){
    useService      = prod;
    defaultasseturl = urlprod;
}

export const asseturl = defaultasseturl;

export default {
    login: (payload) =>  axios.request(useService('POST', '/login', payload))
        .then(res => {
            const { status, message } = res.data;
            if(status){
                return Promise.resolve(res.data);
            }else{
                return Promise.reject(message);
            }
        }),
    referensi: {
        kprk: (params) => axios.request(useService('POST', `/referensi/kprk`, params))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data.kprk);
                }else{
                    return Promise.reject(message);
                }
            })
    },
    profile: {
        uploadimage: (formData) => axios.request(useService('POST', '/profile/upload', formData, 'upload'))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data)
                }else{
                    return Promise.reject(message);
                }
            }),
        update: (payload) => axios.request(useService('POST', '/profile/update', payload))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    //response error by default can more than one object
                    //we need to retutn only first object
                    const firstMessageKey = Object.keys(message)[0];
                    //return as object
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            })
    }
}