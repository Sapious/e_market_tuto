import axios from "axios";
import {
	GET_CATEGORIES,
	CATEGORY_ERROR,
	CATEGORY_LOADING,
} from "../constants/types";
export const getCategories = (limit) => async (dispatch) => {
	dispatch({
		type: CATEGORY_LOADING,
	});
	try {
		const res = await axios.get(
			`/api/categories?limit=${limit}`
		);

		dispatch({
			type: GET_CATEGORIES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CATEGORY_ERROR,
			payload: err,
		});
	}
};
