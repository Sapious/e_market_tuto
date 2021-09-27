import { GET_CATEGORIES, CATEGORY_ERROR } from "../constants/types";

const initialState = {
	categories: [],
	category: null,
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: payload.categories,
				loading: false,
			};
		case CATEGORY_ERROR:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
}
