import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';

const Protect = () => {
	const { state } = useContext(AuthContext);
	const { user } = state;

	return <div>{user ? <Outlet /> : <Navigate to='/login' />}</div>;
};

export default Protect;
