import { combineReducers } from "redux";
import sessions from "./reducers/sessions";
import message from "./reducers/message";
import menus from "./reducers/menus";
import region from "./reducers/region";

export default combineReducers({
    sessions,
    message,
    menus,
    region
})