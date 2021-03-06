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
            }),
        menu: (params) => axios.request(useService('GET', '/menu', params))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    //return as object
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
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
            }),
        addToken: (payload) => axios.request(useService('POST', '/profile/token', payload))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            }),
    },
    produksikiriman: {
        get: (payload) => axios.request(useService('POST', '/Report_Detail_Transaksi', payload))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    //return as object
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            }),
        jatuhtempo: (payload) => axios.request(useService('GET', '/jatuhtempo', payload))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    //return as object
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            }),
    },
    user: {
        get: (params) => axios.request(useService('GET', '/users', params))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            }),
        add: (payload) => axios.request(useService('POST', '/users', payload))
            .then(res => {
                const { status, message } = res.data;
                if(status){
                    return Promise.resolve(res.data);
                }else{
                    const firstMessageKey = Object.keys(message)[0];
                    return Promise.reject({
                        message: message[firstMessageKey]
                    });
                }
            })
    }
}