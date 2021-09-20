import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGIN_ERROR,
	REGISTER_ERROR,
	AUTH_ERROR,
} from "../constants/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
	err: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				user: payload.user,
				token: payload.token,
				loading: false,
				isAuthenticated: true,
			};
		case LOGIN_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				isAuthenticated: false,
				token: null,
				loading: false,
				err: payload,
			};
		default:
			return state;
	}
}
