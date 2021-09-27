import axios from "axios";
import { GET_CATEGORIES, CATEGORY_ERROR } from "../constants/types";
export const getCategories = (limit) => async (dispatch) => {
	try {
		const res = await axios.get(`http://localhost:8000/api/categories?limit=${limit}`);

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