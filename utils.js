export const toQueryString = (obj) => {
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
}
  
export const rupiahNumber = (number) => {
    if(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }else{
        return '0';
    }
}

export const generateColor = (index) => {
    switch (index) {
        case 1:
            return '#ff7700';
        case 2:
            return '#db6802';
        case 3:
            return '#faa65c';
        case 4: 
            return '#e66b3e';
        case 5:
            return '#bf6a4b';
        case 6:
            return '#b53824';
        case 7:
            return '#edae00';
        case 8:
            return '#b58500';
        case 9:
            return '#ff0000';
        default:
            return 'black';
    }
}