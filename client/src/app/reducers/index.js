import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import productReducers from "./product.reducers";
export default combineReducers({
	authState: authReducers,
	productState: productReducers
});
