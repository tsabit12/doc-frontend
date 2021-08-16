import axios from 'axios';
import dev from './platform/dev';

const platform = 'dev';
let useService = dev;

if(platform === 'prod'){

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
        })
}