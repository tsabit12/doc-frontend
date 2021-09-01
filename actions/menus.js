import { SEARCH_MENU } from "../types";

export const searchMenu = (param) => dispatch => dispatch({
    type: SEARCH_MENU,
    param
})