import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
const initialState = {};
const middleware = [thunk];
export const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);
