import { LOGGED_IN } from "../types";

export default function sessions(state={}, action={}){
    switch(action.type){
        case LOGGED_IN:
            return action.user;
        default: 
            return state;
    }
}