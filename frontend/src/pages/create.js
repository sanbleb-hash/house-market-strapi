import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiLoader5Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../utils/authContext';

const Create = () => {
	const { state } = useContext(AuthContext);
	const { user } = state;
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		price: 0,
		type: 'sale',
		parking: 'no parking',
		bedrooms: 1,
		fotos: [''],
		address: '',
		bathrooms: 1,
		discount: 0,
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let location;
		const res = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAP_TOKEN}`
		);
		const dataAddress = await res.json();

		console.log(dataAddress);

		// if (dataAddress.results.length > 0) {
		// 	location = dataAddress.results[0].geometry.location;
		// 	console.log(location);
		// }

		if (name === '' || description === '' || price === '' || address === '') {
			toast.error('Please fill in all fields');
			return;
		}
		if (discount > price) {
			toast.error('Discount cannot be greater than price');
			return;
		}

		const token = user.jwt;
		setIsLoading(true);
		const data = await fetch(
			'/api/listings',

			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ data: formData, location }),
			}
		);
		const response = await data.json();
		console.log(response);
		if (!response.status === 201 || response.status === 200) {
			toast.error(response.error);
			return;
		}

		setFormData({
			name: '',
			description: '',
			price: 0,
			type: 'sale',
			parking: 'no parking',
			bedrooms: '',
			address: 1,
			bathrooms: 1,
			discount: 0,
			fotos: [''],
		});
		setTimeout(() => {
			setIsLoading(true);
			navigate('/');
		}, 3000);

		toast.success('Listing created successfully');
		return response;
	};

	const {
		name,
		description,
		price,
		type,
		parking,
		address,
		bathrooms,
		fotos,
		bedrooms,
		discount,
	} = formData;

	useEffect(() => {
		document.title = 'Create Listing';
	}, []);

	return (
		<section className='p-8 pt-20 min-h-[70vh]'>
			{isLoading && (
				<div className='flex justify-center items-center  animate-spin h-screen w-screen'>
					<RiLoader5Line className='text-5xl text-blue-300' />
				</div>
			)}

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
							name='address'
							value={address}
							placeholder='address'
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
					<input
						type='file'
						className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						onChange={(e) =>
							setFormData({ ...formData, fotos: e.target.fotos })
						}
						value={fotos}
						name='fotos'
						placeholder='fotos'
					/>
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
