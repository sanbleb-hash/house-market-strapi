import { createContext, useReducer } from 'react';

export const searchContext = createContext();

const INITIAl_STATE = {
	listings: localStorage.getItem('listings')
		? JSON.parse(localStorage.getItem('listings'))
		: [],
	isLoading: false,
	error: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'INITIAL_LOAD':
			return {
				...state,
				isLoading: true,
				error: null,
			};

		case 'SEARCH_SUCCESS':
			return {
				...state,
				listings: action.payload,
				isLoading: false,
				error: null,
			};

		case 'SET_ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export function SearchProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INITIAl_STATE);
	return (
		<searchContext.Provider value={{ state, dispatch }}>
			{children}
		</searchContext.Provider>
	);
}
