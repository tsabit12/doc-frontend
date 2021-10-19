import service from "../config/service";
import { GET_JUMLAH_USER, GET_USER } from "../types";

export const getuser = (params, activePage) => dispatch =>
     service.user.get(params)
          .then(({ data }) => dispatch({
               type: params.type === 'count' ? GET_JUMLAH_USER : GET_USER,
               data,
               page: `page${activePage}`
          }))