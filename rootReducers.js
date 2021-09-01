import { combineReducers } from "redux";
import sessions from "./reducers/sessions";
import message from "./reducers/message";
import menus from "./reducers/menus";

export default combineReducers({
    sessions,
    message,
    menus
})