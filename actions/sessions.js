import service from "../config/service";
import { LOGGED_IN } from "../types";

export const login = payload => dsipatch =>
    service.login(payload)
        .then(res => dsipatch({
            type: LOGGED_IN,
            user: res.user
        }))