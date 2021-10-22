import { ADD_USER, GET_JUMLAH_USER, GET_USER, LOAD_MORE_USER } from "../types";

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
          case ADD_USER:
               return { 
                    ...state,
                    total: Number(state.total) + 1,
                    data: [ { ...action.user }, ...state.data ]
               }
          default:
               return state;
     }
}