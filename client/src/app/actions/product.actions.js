import axios from "axios";
import {
	GET_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PRODUCTS,
	CREATE_PRODUCT,
	PRODUCT_ERROR,
	PRODUCT_LOADING,
	GET_OWNED_PRODUCTS,
	DELETE_PRODUCT,
} from "../constants/types";

export const createProduct = (data) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post(
			`http://localhost:8000/api/products/`,
			data,
			config
		);

		dispatch({
			type: CREATE_PRODUCT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
export const getOwnedProducts = () => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	try {
		const res = await axios.get(`http://localhost:8000/api/products/me`);

		dispatch({
			type: GET_OWNED_PRODUCTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};

export const getProducts = (limit) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
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
	dispatch({
		type: PRODUCT_LOADING,
	});
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
	dispatch({
		type: PRODUCT_LOADING,
	});
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
export const deleteProduct = (productId) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	try {
		const res = await axios.delete(
			`http://localhost:8000/api/products/${productId}`
		);

		dispatch({
			type: DELETE_PRODUCT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
