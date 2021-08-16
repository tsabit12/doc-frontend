import { combineReducers } from "redux";
import sessions from "./reducers/sessions";
import message from "./reducers/message";

export default combineReducers({
    sessions,
    message
})