import { combineReducers } from "redux";
import sessions from "./reducers/sessions";
import message from "./reducers/message";
import menus from "./reducers/menus";
import region from "./reducers/region";
import users from "./reducers/users";

export default combineReducers({
    sessions,
    message,
    menus,
    region,
    users
})