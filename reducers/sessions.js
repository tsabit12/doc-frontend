import { LOGGED_IN, LOGGED_OUT, SET_IMAGE, UPDATE_SESSIONS } from "../types";

export default function sessions(state={}, action={}){
    switch(action.type){
        case LOGGED_IN:
            return action.user;
        case SET_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case LOGGED_OUT:
            return {};
        case UPDATE_SESSIONS:
            return { ...state, ...action.payload }
        default: 
            return state;
    }
}