import { SET_MESSAGE } from "../types";

export const setMessage = (parameter) => dispatch =>
    dispatch({
        type: SET_MESSAGE,
        open: parameter.open,
        message: parameter.message
    })