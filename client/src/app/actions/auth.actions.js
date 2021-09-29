import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGIN_ERROR,
	REGISTER_ERROR,
	AUTH_ERROR,
	USER_LOADED,
	LOGOUT,
	AUTH_LOADING,
} from "../constants/types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	if (localStorage.token) {
		setAuthToken(localStorage.getItem("token"));
	}
	try {
		const res = await axios.get("http://localhost:8000/api/auth/authcheck");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
			payload: err,
		});
	}
};

export const login = (data) => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(
			"http://localhost:8000/api/auth/login",
			data,
			config
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: LOGIN_ERROR,
			payload: err,
		});
	}
};
export const register = (data) => async (dispatch) => {
	dispatch({
		type: AUTH_LOADING,
	});
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(
			"http://localhost:8000/api/auth/register",
			data,
			config
		);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: REGISTER_ERROR,
			payload: err,
		});
	}
};
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
