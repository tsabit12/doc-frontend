import { AsyncStorage } from "react-native";
import service from "../config/service";
import { LOGGED_IN, LOGGED_OUT, SET_IMAGE, UPDATE_SESSIONS } from "../types";

export const login = payload => dispatch =>
    service.login(payload)
        .then(async res => {
            await AsyncStorage.setItem('sessions-v2', JSON.stringify(res.user));
            
            dispatch({
                type: LOGGED_IN,
                user: res.user
            })

            return Promise.resolve(res.user);
        })

export const setImage = image => dispatch => dispatch({
    type: SET_IMAGE,
    image
})

export const logout = () => dispatch => dispatch({
    type: LOGGED_OUT
})

export const updateSessions = (payload) => dispatch => dispatch({
    type: UPDATE_SESSIONS,
    payload
})

export const setLoggedIn = (user) => dispatch => dispatch({
    type: LOGGED_IN,
    user
})