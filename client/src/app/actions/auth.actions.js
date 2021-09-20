import {
	LOGIN_SUCCESS,
	REGISTER_SUCCESS,
	LOGIN_ERROR,
	REGISTER_ERROR,
	AUTH_ERROR,
} from "../constants/types";

import axios from "axios";

export const login = (data) => async (dispatch) => {
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
