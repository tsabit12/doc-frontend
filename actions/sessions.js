import service from "../config/service";
import { LOGGED_IN, SET_IMAGE } from "../types";

export const login = payload => dsipatch =>
    service.login(payload)
        .then(res => dsipatch({
            type: LOGGED_IN,
            user: res.user
        }))

export const setImage = image => dsipatch => dsipatch({
    type: SET_IMAGE,
    image
})