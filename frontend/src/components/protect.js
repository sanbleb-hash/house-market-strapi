import { Navigate, Outlet } from 'react-router-dom';

const Protect = () => {
	const isLoggedIn = false;
	return <div>{isLoggedIn ? <Outlet /> : <Navigate to='/login' />}</div>;
};

export default Protect;
