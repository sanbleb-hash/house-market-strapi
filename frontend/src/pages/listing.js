import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiLoader5Line } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa';

const Listing = () => {
	const location = useLocation();
	const listingId = location.pathname.split('/')[2];
	const [listing, setListing] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchListing = async () => {
			const response = await fetch(
				`http://localhost:1337/api/listings/${listingId}`
			);
			const { data } = await response.json();
			setIsLoading(false);

			setListing(data.attributes);
		};
		fetchListing();
	}, [listingId]);

	return (
		<div className='w-full min-h-[90vh] bg-slate-100 pt-20 pb-10'>
			{isLoading ? (
				<div className='flex justify-center items-center  animate-spin h-screen'>
					<RiLoader5Line className='text-5xl text-blue-300' />.
				</div>
			) : (
				<div className='container mx-auto h-[60vh] px-16 bg-slate-100'>
					<h1 className=' pt-6 text-gray-600'>{listing.name}</h1>
					<h3 className=' text-gray-600'> for {listing.type}</h3>
					<Link to={-1}>
						<button
							type='button'
							className=' hover:text-gray-500 hover:scale-105'
						>
							<FaArrowLeft style={{ paddingRight: 4, display: 'inline' }} /> go
							back
						</button>
					</Link>
					<div className='  flex items-start justify-between gap-3 p-4 '>
						<img
							src='https://cdn.pixabay.com/photo/2022/01/29/17/12/chateau-6978102__340.jpg'
							alt=''
							className=' w-1/2 h-[50vh] shadow-md  '
						/>
						<div className='w-1/2 min-h-[50vh] shadow-md p-2 rounded-lg bg-slate-200'>
							<div className='flex justify-between flex-wrap gap-3'>
								<span>
									<p className='text-gray-600'>
										price : {listing.price}
										{listing.type === 'rent' && 'monthly'}
									</p>
								</span>

								<span>
									<p className='text-gray-600'>
										{listing.bathrooms}{' '}
										{listing.bathrooms <= 1 ? 'bathroom' : 'bathrooms'}
									</p>
								</span>
								<span>
									<p className='text-gray-600'>
										{listing.bedrooms}{' '}
										{listing.bedrooms <= 1 ? 'bedroom' : 'bedrooms'}
									</p>
								</span>
								<span>
									<p className='text-gray-600'>
										located at :{listing.location}
									</p>
								</span>

								<p className='text-gray-600'>{listing.parking}</p>
							</div>
							<h2 className='text-gray-600'>Description</h2>
							<p className='text-gray-600'>{listing.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Listing;
