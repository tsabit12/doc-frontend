export default function request(method, service, data = undefined){
    return {
        url: `http://192.168.43.184/api${service}`,
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