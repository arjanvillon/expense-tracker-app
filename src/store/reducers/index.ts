import { combineReducers } from "redux";
import auth from "./auth.reducer";
import transaction from "./transaction.reducer";

export default combineReducers({
  auth,
  transaction,
});
