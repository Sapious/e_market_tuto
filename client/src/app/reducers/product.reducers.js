import {
	GET_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PRODUCTS,
	CREATE_PRODUCT,
	PRODUCT_ERROR,
} from "../constants/types";

const initialState = {
	products: [],
	product: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PRODUCTS:
			return {
				...state,
				products: payload.products,
				loading: false,
			};
		case GET_PRODUCTS_BY_CATEGORY:
			return {
				...state,
				products: payload.products,
				loading: false,
			};
		case GET_PRODUCT:
			return {
				...state,
				product: payload.products,
				loading: false,
			};
		case PRODUCT_ERROR:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
}
