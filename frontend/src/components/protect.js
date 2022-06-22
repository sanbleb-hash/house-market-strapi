import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/login';

const Protect = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return <div>{isLoggedIn ? <Navigate to='/' /> : <Login />}</div>;
};

export default Protect;
