import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";
export default combineReducers({
	authState: authReducers,
	productState: productReducers,
	categoryState: categoryReducers
});
