import {
	GET_PRODUCT,
	GET_PRODUCTS_BY_CATEGORY,
	GET_PRODUCTS,
	CREATE_PRODUCT,
	PRODUCT_ERROR,
	GET_OWNED_PRODUCTS,
	PRODUCT_LOADING,
	DELETE_PRODUCT,
	FILTER_PRODUCT,
	GET_PRODUCT_SELLER_NUMBER,
	UPDATE_PRODUCT,
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
		case UPDATE_PRODUCT:
			const indexProduct = state.products
				.map((product) => {
					return product._id;
				})
				.indexOf(payload.product._id);
			let updatedProduct = state.products[indexProduct];
			updatedProduct = payload.product;
			return {
				...state,
				products: [
					...state.products.filter(
						(product) => product._id !== payload.product._id
					),
					updatedProduct,
				],
				loading: false,
			};
		case GET_PRODUCT_SELLER_NUMBER:
			return {
				...state,
				product: {
					...state.product,
					seller: {
						...state.product.seller,
						phoneNumber: payload.seller.phoneNumber,
					},
				},
				loading: false,
			};
		case CREATE_PRODUCT:
			return {
				...state,
				products: [...state.products, payload.product],
				loading: false,
			};
		case PRODUCT_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_OWNED_PRODUCTS:
			return {
				...state,
				products: payload.products,
				loading: false,
			};
		case FILTER_PRODUCT:
			return {
				...state,
				products: payload.products,
				loading: false,
			};
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
				product: payload.product,
				loading: false,
			};
		case DELETE_PRODUCT:
			return {
				...state,
				products: state.products.filter(
					(product) => product._id !== payload.product._id
				),
				loading: false,
			};
		case PRODUCT_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
}
