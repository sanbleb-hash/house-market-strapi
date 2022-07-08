import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';

const Create = () => {
	const { state } = useContext(AuthContext);
	const { user } = state;

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		type: '',
		parking: '',
		bedrooms: '',

		location: '',
		bathrooms: '',
		discount: '',
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = user.jwt;
		const data = await fetch(
			'/api/listings',

			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ data: formData }),
			}
		);
		const response = await data.json();
		setFormData({
			name: '',
			description: '',
			price: '',
			type: '',
			parking: '',
			bedrooms: '',
			location: '',
			bathrooms: '',
			discount: '',
		});
		if (response) {
			navigate('/');
		}
		return response;
	};

	const {
		name,
		description,
		price,
		type,
		parking,
		location,
		bathrooms,
		bedrooms,
		discount,
	} = formData;

	useEffect(() => {
		console.log(user.jwt);
	}, [user]);

	return (
		<section className='p-8 pt-20 min-h-[70vh]'>
			<h1 className='pl-5 text-gray-500 capitalize '>create your listing</h1>
			<Link className='pl-7 text-gray-500' to={-1}>
				<button type='button' className=' hover:text-gray-500 hover:scale-105'>
					<FaArrowLeft style={{ paddingRight: 4, display: 'inline' }} /> go back
				</button>
			</Link>
			<div className=' w-3/4 h-full mx-auto flex  items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='flex  pt-20 items-start flex-col min-h-[50vh] gap-5'
				>
					<div className='flex items-center justify-between flex-col lg:flex-row gap-5'>
						<input
							type='text'
							className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='name'
							value={name}
							placeholder='name'
						/>
						<input
							type='text'
							className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='location'
							value={location}
							placeholder='location'
						/>
						<input
							type='number'
							className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							value={bedrooms}
							name='bedrooms'
							placeholder='bedrooms'
						/>
						<input
							type='number'
							className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='bathrooms'
							value={bathrooms}
							placeholder='bathrooms'
						/>
					</div>
					<div className='flex items-center justify-between flex-col lg:flex-row gap-5'>
						<input
							type='number'
							className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='price'
							value={price}
							placeholder='price'
						/>
						<input
							type='number'
							className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='discount'
							value={discount}
							placeholder='discount price'
						/>
						<select
							className='shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='type'
							value={type}
						>
							<option>sale</option>
							<option>rent</option>
						</select>
						<select
							className='shadow appearance-none border rounded w-[200px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='parking'
							value={parking}
							placeholder='parking'
						>
							<option>no parking</option>
							<option>parking spot</option>
						</select>
					</div>
					<div className='flex w-full items-end justify-between '>
						<textarea
							className='shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='description'
							value={description}
							placeholder='description'
							rows={4}
						/>
						{formData && (
							<button
								className='bg-green-300 px-5 rounded-lg ml-7 py-2 text-gray-400'
								type='submit'
								onSubmit={handleSubmit}
							>
								Submit
							</button>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

export default Create;
