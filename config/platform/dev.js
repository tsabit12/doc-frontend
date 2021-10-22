import Constants from 'expo-constants';

const uri = `http://${Constants.manifest.debuggerHost.split(':').shift()}/doc`;

//const uri = 'http://localhost/api';

export const url = `${uri}/assets/profile`;

export default function request(method, service, data = {}, type=undefined){
    const headerlist = {
        "Accept": "application/json",
        "X-POS-KEY": "897043a5530eb21821a556a93f85bfff",
        "Content-Type": "application/json",
        "Authorization": "Basic ZG9jOmQwYzNudEVyIzE=" 
    }
    let defaulturl = `${uri}${service}`;

    if(type === 'upload') headerlist["Content-Type"] = "multipart/form-data";
    if(method === 'GET') defaulturl = `${defaulturl}?${new URLSearchParams(data).toString()}`;

    return {
        url: defaulturl,
        method,
        headers: headerlist,
        data: method === 'GET' ? undefined : data
    }
}