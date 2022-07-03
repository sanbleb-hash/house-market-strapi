import axios from 'axios';
import cookie from 'js-cookie';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../utils/authContext';

const Create = () => {
	const { state } = useContext(AuthContext);
	const { user } = state;

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: '',
		type: '',
		parking: '',
		bedrooms: '',
		location: '',
		bathrooms: '',
		offer: '',
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = user.jwt;
		const data = await fetch(
			'http://localhost:1337/api/listings',

			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Token ' + token,
				},
				body: JSON.stringify({ data: formData }),
			}
		);
		console.log(data);
		return data;
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
		offer,
	} = formData;

	return (
		<section className='p-8 min-h-[70vh]'>
			<h1 className='pl-5 text-gray-500 capitalize '>create your listing</h1>
			<div className=' w-3/4 h-full mx-auto flex items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='flex  pt-20 items-start flex-col min-h-[50vh] gap-5'
				>
					<div className='flex items-center justify-between flex-col md:flex-row gap-5'>
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
					<div className='flex items-center justify-between flex-col md:flex-row gap-5'>
						<input
							type='number'
							className='shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='price'
							value={price}
							placeholder='price'
						/>
						<input
							type='text'
							className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							onChange={handleChange}
							name='offer'
							value={offer}
							placeholder='offer price'
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
							<option>parking</option>
							<option>no parking</option>
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
								className='bg-green-300 px-5 rounded-lg py-2 text-gray-400'
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
