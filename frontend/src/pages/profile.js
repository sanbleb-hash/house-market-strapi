import { useContext, useEffect, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';

const Profile = () => {
	const [edit, setEdit] = useState(false);
	const [username, setUsername] = useState('');
	const { state } = useContext(AuthContext);
	const { user } = state;

	useEffect(() => {
		!user && <Navigate to='/login' />;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleEdit = async () => {
		const data = await fetch(
			'/api/users/edit',
			{ username },
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.jwt}`,
				},
			}
		);
		const json = await data.json();
		console.log(json);
	};
	return (
		<div className='container mx-auto w-full px-6 bg-inherit py-14 '>
			<h1 className=' text-gray-600  capitalize text-2xl md:text-5xl  py-6'>
				hie {user.user.username}
			</h1>
			<div className='flex flex-col md:flex-row items-end justify-between mx-auto w-3/4 gap-5'>
				<form className='w-full  md:w-1/2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='username'
					>
						Username
					</label>
					<input
						type='text'
						disabled={!edit}
						value={username || user.user.username}
						onChange={(e) => setUsername(e.target.value)}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='username'
						placeholder='Username'
					/>
					<br />
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='username'
					>
						email
					</label>
					<input
						type='text'
						disabled={!edit}
						value={user.user.email}
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='username'
						placeholder='email'
					/>
					<br />
				</form>
				<div>
					{edit && (
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							onClick={handleEdit}
						>
							edit your credentials
						</button>
					)}
				</div>
			</div>
			<hr />
			<div className='flex items-end justify-between gap-3 flex-col md:flex-row mx-auto w-full md:w-3/4'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
					onClick={() => setEdit(true)}
				>
					click to edit your credentials
				</button>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'>
					<Link to='/create'>create new listing</Link>
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
					onClick={() => setEdit(true)}
				>
					my listings
				</button>
			</div>
		</div>
	);
};

export default Profile;
