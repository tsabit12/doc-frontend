import service from "../config/service";
import { GET_JUMLAH_USER, GET_USER, LOAD_MORE_USER } from "../types";

export const getuser = (params, jenis=undefined) => dispatch =>
     service.user.get(params)
          .then(({ data }) => dispatch({
               type: 
                    params.type === 'count' ? 
                         GET_JUMLAH_USER : 
                              jenis === 'loadmore' ? LOAD_MORE_USER : GET_USER,
               data
          }))