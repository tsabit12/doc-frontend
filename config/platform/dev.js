import Constants from 'expo-constants';

const uri = `http://${Constants.manifest.debuggerHost.split(':').shift()}/api`;

//const uri = 'http://localhost/api';

export const url = `${uri}/assets/profile`;

export default function request(method, service, data = {}, type=undefined){
    const headerlist = {
        "Accept": "application/json",
        "X-POS-KEY": "897043a5530eb21821a556a93f85bfff",
        "Content-Type": "application/json",
        "Authorization": "Basic ZG9jOmQwYzNudEVyIzE=" 
    }

    if(type === 'upload'){
        headerlist["Content-Type"] = "multipart/form-data";
    }
    
    return {
        url: `${uri}${service}`,
        method,
        headers: headerlist,
        data
    }
}