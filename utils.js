import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

export const generateColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    let yesterday   = ("0" + (currdate.getDate() - 1)).slice(-2);
    let currmonth   = ("0" + (currdate.getMonth() + 1)).slice(-2);
    var curryear    = currdate.getFullYear();

    if(last.title.toLowerCase() === 'last'){
        return `${defaultyear}-${defaultmonth}-${defaultday}|${curryear}-${currmonth}-${yesterday}`;
    }else{
        return `${curryear}-${currmonth}-${currday}|${defaultyear}-${defaultmonth}-${defaultday}`;
    }
}

export const registerForPushNotificationsAsync = async () => {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
        return Promise.reject({ msg: 'Failed to get push token for push notification!'});
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    
  
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default-doc', {
            name: 'doc default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'mixkit-bell-notification-933.wav'
        });

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
        });

        Notifications.setNotificationCategoryAsync("basic", [
            {
                identifier: 'one',
                buttonTitle: 'View email',
                isDestructive: true,
                isAuthenticationRequired: false,
            },
        ])
    }
  
    return Promise.resolve(token);
  }