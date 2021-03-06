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
	FILTER_PRODUCT,
	UPDATE_PRODUCT,
	GET_PRODUCT_SELLER_NUMBER,
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
			`/api/products/`,
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
export const updateProduct = (data, productId) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.put(
			`/api/products/${productId}`,
			data,
			config
		);

		dispatch({
			type: UPDATE_PRODUCT,
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
		const res = await axios.get(`/api/products/me`);

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
			`/api/products?limit=${limit}`
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
			`/api/products?category=${categoryId}`
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
			`/api/products/${productId}`
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
			`/api/products/${productId}`
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

export const filterProduct = (query) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	let queryString = "?";
	query.forEach((value, key) => {
		queryString += key + "=" + value + "&";
	});

	try {
		const res = await axios.get(
			`/api/products/search${queryString}`
		);
		dispatch({
			type: FILTER_PRODUCT,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};

export const getSellerNumber = (sellerId) => async (dispatch) => {
	dispatch({
		type: PRODUCT_LOADING,
	});
	try {
		const res = await axios.get(
			`/api/products/seller/${sellerId}/number`
		);
		dispatch({
			type: GET_PRODUCT_SELLER_NUMBER,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_ERROR,
			payload: err,
		});
	}
};
