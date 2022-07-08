import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const INITIAl_STATE = {
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: null,
	isLoading: false,
	isError: false,
	error: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'REGISTER_USER':
			return {
				...state,
				user: action.payload,
				isLoading: false,
				isError: false,
				error: null,
			};
		case 'LOGIN_USER':
			return {
				...state,
				user: action.payload,
				isLoading: false,
				isError: false,
				error: null,
			};
		case 'LOGOUT_USER':
			return {
				...state,
				user: localStorage.removeItem('user') || null,
				isLoading: false,
				isError: false,
				error: null,
			};
		case 'SET_ERROR':
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};
		case 'INITIAL_LOAD':
			return {
				...state,
				isLoading: true,
				isError: false,
				error: null,
			};
		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAl_STATE);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
