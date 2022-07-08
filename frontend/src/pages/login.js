import React, { useContext, useEffect, useState } from 'react';
import cookie from 'cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';

const Login = () => {
	const navigate = useNavigate();

	const { state, dispatch } = useContext(AuthContext);
	const { isLoading, isError, error, user } = state;
	const [isLogin, setIsLogin] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		email: '',
		conformPassword: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const { username, password, email, conformPassword } = formData;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!isLogin && password !== conformPassword) {
				toast.error('Passwords do not match');
				return;
			} else if (
				!isLogin &&
				(!username || !email || !password || !conformPassword)
			) {
				toast.error('Please fill all the fields');
				return;
			} else {
				if (!isLogin) {
					dispatch({ type: 'INITIAL_LOAD' });
					const { data } = await axios.post(
						process.env.REACT_APP_STRAPI_URL + 'register',

						{
							username,
							email,
							password,
						}
					);
					dispatch({
						type: 'LOGIN_USER',
						payload: data,
					});
					localStorage.setItem('user', JSON.stringify(data));

					toast.success('registered Successfully');
				}

				if (isLogin && (!password || !email)) {
					toast.error('Please fill all the fields');
					return;
				} else {
					dispatch({ type: 'INITIAL_LOAD' });
					const { data } = await axios.post(process.env.REACT_APP_STRAPI_URL, {
						identifier: email,
						password,
					});
					dispatch({ type: 'LOGIN_USER', payload: data });

					localStorage.setItem('user', JSON.stringify(data));
				}
				setFormData({
					username: '',
					password: '',
					email: '',
					conformPassword: '',
				});
			}
		} catch (error) {
			dispatch({ type: 'SET_ERROR', payload: error.message[0].message[0] });
			toast.error(error);
		}
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [navigate, user]);

	return (
		<div className=' w-screen min-h-[70vh]  grid place-items-center mb-4 '>
			<h1 className='text-center text-3xl md:text-5xl pt-20 py-8'>
				{!isLogin ? 'register' : 'login'}
			</h1>
			<form
				onSubmit={handleSubmit}
				className=' w-[60vw]  flex items-center justify-center flex-col gap-5   '
			>
				{!isLogin && (
					<div className='flex flex-col w-3/4'>
						<label htmlFor='username'>username</label>
						<input
							type='text'
							name='username'
							value={username}
							onChange={handleChange}
							placeholder='username'
							className=''
						/>
					</div>
				)}
				<div className='flex flex-col w-3/4 '>
					<label htmlFor='email'>email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={handleChange}
						placeholder='enter email'
						className='w-full'
					/>
				</div>
				<div className='flex flex-col w-3/4'>
					<label htmlFor='password'>password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
						placeholder='password'
						className=''
					/>
				</div>
				{!isLogin && (
					<div className='flex flex-col w-3/4'>
						<label htmlFor='password'>confirm password</label>
						<input
							type='password'
							name='conformPassword'
							value={conformPassword}
							onChange={handleChange}
							placeholder='confirm password'
							className=''
						/>
					</div>
				)}
				<button
					type='submit'
					className={`bg-green-300 w-3/5 py-2 active:scale-110 mb-3 rounded-full ${
						isLoading && 'opacity-50 cursor-not-allowed'
					}`}
				>
					{isLoading ? 'getting ready...' : !isLogin ? 'register' : 'login'}
				</button>
			</form>
			{isError && <div className='text-red-500'>{error}</div>}

			<span className='pt-3 flex items-center gap-2'>
				already have account{' '}
				<p
					onClick={() => setIsLogin(!isLogin)}
					className=' underline text-blue-700 cursor-pointer hover:text-blue-500  transition-all delay-75 ease-linear  '
				>
					{!isLogin ? 'login' : 'register'}
				</p>
			</span>
		</div>
	);
};

export default Login;
