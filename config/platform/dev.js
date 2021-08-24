import Constants from 'expo-constants';

export default function request(method, service, data = {}){
    const uri = `http://${Constants.manifest.debuggerHost.split(':').shift()}/api`;
    
    return {
        url: `${uri}${service}`,
        method,
        headers: {
            "Accept": "application/json",
            "X-POS-KEY": "897043a5530eb21821a556a93f85bfff",
            "Content-Type": "application/json",
            "Authorization": "Basic ZG9jOmQwYzNudEVyIzE=" 
        },
        data
    }
}