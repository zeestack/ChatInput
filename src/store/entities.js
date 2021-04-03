import { combineReducers } from "redux";
import commentReducer from "./comments";
import userReducer from "./users";

const reducer = combineReducers({
  comments: commentReducer,
  users: userReducer,
});

export default reducer;
