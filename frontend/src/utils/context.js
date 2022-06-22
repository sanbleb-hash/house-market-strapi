import { createContext, useReducer } from 'react';

export const Store = createContext();

const INITIAl_STATE = {
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,

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
		case 'LOGIN_USER':
			return {
				...state,

				user: action.payload,
				isLoading: false,
				error: null,
			};
		case 'LOGOUT_USER':
			return {
				...state,
				user: localStorage.removeItem('user') || null,
				isLoading: false,
				isError: false,
			};
		case 'SET_LISTINGS':
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

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INITIAl_STATE);
	return (
		<Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
	);
}
