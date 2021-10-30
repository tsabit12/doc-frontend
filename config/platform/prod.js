const portbalancer = '10880';
const portasset = '10980';

const uri = `http://13.251.133.165`;

export const url = `${uri}:${portasset}/assets/profile`;

export default function request(method, service, data = {}, type=undefined){
    const headerlist = {
        "Accept": "application/json",
        "X-POS-KEY": "897043a5530eb21821a556a93f85bfff",
        "Content-Type": "application/json",
        "Authorization": "Basic ZG9jOmQwYzNudEVyIzE=" 
    }
    let defaulturl = `${uri}:${portbalancer}${service}`;

    if(type === 'upload') {
        headerlist["Content-Type"] = "multipart/form-data";
        defaulturl =`${uri}:${portasset}${service}`;
    }

    if(method === 'GET') defaulturl = `${defaulturl}?${new URLSearchParams(data).toString()}`;

    return {
        url: defaulturl,
        method,
        headers: headerlist,
        data: method === 'GET' ? undefined : data
    }
}