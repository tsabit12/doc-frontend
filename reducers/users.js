import { GET_JUMLAH_USER, GET_USER, LOAD_MORE_USER } from "../types";

const initialState = {
     total: 0,
     data: []
}

export default function users(state=initialState, action={}){
     switch(action.type){
          case GET_JUMLAH_USER:
               return { ...state, total: action.data }
          case GET_USER:
               return {
                    ...state,
                    data: action.data
               }
          case LOAD_MORE_USER:
               return { ...state, data: [ ...state.data, ...action.data ] }
          default:
               return state;
     }
}