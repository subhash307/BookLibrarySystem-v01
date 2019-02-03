import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import bookReducer from "./bookReducer";

export default combineReducers({
  //
  errors: errorsReducer,
  book: bookReducer
});
