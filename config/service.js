import axios from 'axios';
import dev from './platform/dev';
import prod from './platform/prod';

const platform = 'prod';

let useService = dev;

if(platform === 'prod'){
    useService = prod;
}


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
    }
}