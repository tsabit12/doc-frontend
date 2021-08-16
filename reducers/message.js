import { SET_MESSAGE } from "../types";

const initialState = {
    open: false,
    message: ''
}

export default function message(state=initialState, action={}){
    switch(action.type){
        case SET_MESSAGE:
            return { open: action.open, message: action.message }
        default:
            return state;
    }
}