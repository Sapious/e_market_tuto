import axios from "axios";
import {
	GET_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PRODUCTS,
	CREATE_PRODUCT,
	PRODUCT_ERROR,
} from "../constants/types";

export const getProducts =
	(limit) =>
	async (dispatch) => {
		try {
			const res = await axios.get(
				`http://localhost:8000/api/products?limit=${limit}`
			);

			dispatch({
				type: GET_PRODUCTS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: PRODUCT_ERROR,
				payload: err,
			});
		}
	};

export const getProductsByCategory = (categoryId) => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:8000/api/products?category=${categoryId}`
		);

		dispatch({
			type: GET_PRODUCTS_BY_CATEGORY,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
export const getProduct = (productId) => async (dispatch) => {
	try {
		const res = await axios.get(
			`http://localhost:8000/api/products/${productId}`
		);

		dispatch({
			type: GET_PRODUCT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
