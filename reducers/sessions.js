import { LOGGED_IN, SET_IMAGE } from "../types";

export default function sessions(state={}, action={}){
    switch(action.type){
        case LOGGED_IN:
            return action.user;
        case SET_IMAGE:
            return {
                ...state,
                image: action.image
            }
        default: 
            return state;
    }
}