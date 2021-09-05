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

//last, 1, day
export const convertToDateFromString = (last={ title: 'last' }, number={ title: 1 }, periode={title: 'day'}) => {
    const d             = new Date();
    let numberValue     = Number(number.title);

    if(last.title.toLowerCase() === 'last'){
        switch (periode.title.toLowerCase()) {
            case 'day':
                d.setDate(d.getDate() - numberValue); break;
            case 'week':
                d.setDate(d.getDate() - (numberValue * 7)); break;
            case 'month':
                d.setMonth(d.getMonth() - numberValue); break;
            case 'year':
                d.setFullYear(d.getFullYear() - numberValue); break;
            default:
                break;
        }
    }else{
        switch (periode.title.toLowerCase()) {
            case 'day':
                d.setDate(d.getDate() + numberValue); break;
            case 'week':
                d.setDate(d.getDate() + (numberValue * 7)); break;
            case 'month':
                d.setMonth(d.getMonth() + numberValue); break;
            case 'year':
                d.setFullYear(d.getFullYear() + numberValue); break;
            default:
                break;
        }
    }
    
    let defaultday     =  ("0" + (d.getDate())).slice(-2);
    let defaultmonth   = ("0" + (d.getMonth() + 1)).slice(-2);
    var defaultyear    = d.getFullYear();

    const currdate  = new Date();
    let currday     =  ("0" + (currdate.getDate())).slice(-2);
    let currmonth   = ("0" + (currdate.getMonth() + 1)).slice(-2);
    var curryear    = currdate.getFullYear();

    if(last.title.toLowerCase() === 'last'){
        return `${defaultyear}-${defaultmonth}-${defaultday}|${curryear}-${currmonth}-${currday}`;
    }else{
        return `${curryear}-${currmonth}-${currday}|${defaultyear}-${defaultmonth}-${defaultday}`;
    }
}