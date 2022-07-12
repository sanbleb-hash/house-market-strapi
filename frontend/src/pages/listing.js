import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiLoader5Line } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa';
import ListingMap from '../components/listingMap';

const Listing = () => {
	const location = useLocation();
	const listingId = location.pathname.split('/')[2];
	const [listing, setListing] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchListing = async () => {
			const response = await fetch(
				`http://localhost:1337/api/listings/${listingId}?pagination[page]=1&pagination[perPage]=3`
			);
			const { data } = await response.json();
			setIsLoading(false);

			setListing(data.attributes);
		};
		fetchListing();
	}, [listingId]);

	return (
		<div className='w-screen min-h-[90vh] bg-slate-100 pt-20 pb-10'>
			{isLoading ? (
				<div className='flex justify-center items-center  animate-spin h-screen'>
					<RiLoader5Line className='text-5xl text-blue-300' />.
				</div>
			) : (
				<div className='container mx-auto min-h-[70vh] w-full px-16 bg-slate-100'>
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
					<div className='flex w-full md:h-[40vh] flex-col md:flex-row items-center justify-between '>
						<div className=' md:h-full  h-3/2 md:w-1/2'>
							<img
								src='https://cdn.pixabay.com/photo/2022/01/29/17/12/chateau-6978102__340.jpg'
								alt=''
								className=' w-full h-full shadow-md object-cover'
							/>
						</div>
						<div className=' rounded-lg bg-slate-200 min-h-full md:mt-16 w-full p-3 md:w-1/2  '>
							<div className='flex justify-between flex-wrap gap-3'>
								<span className='text-gray-600'>
									price {listing.discount ? 'now at' : ''} : R
									{listing.discount
										? listing.price?.toFixed(2) - listing.discount?.toFixed(2)
										: listing.price?.toFixed(2)}{' '}
									{listing.discount && 'save R'}
									<span className=' text-green-600 underline'>
										{listing.discount?.toFixed(2)}
									</span>
									{listing.type === 'rent' && '  /monthly'}
								</span>

								<span className='text-gray-600'>
									{listing.bathrooms}{' '}
									{listing.bathrooms <= 1 ? 'bathroom' : 'bathrooms'}
								</span>
								<span className='text-gray-600'>
									{listing.bedrooms}{' '}
									{listing.bedrooms <= 1 ? 'bedroom' : 'bedrooms'}
								</span>
								<span className='text-gray-600'>
									located in {listing.address}
								</span>

								<span className='text-gray-600'>{listing.parking}</span>
							</div>
							<br />
							<h5 className='text-gray-700 text-2xl '>Description</h5>
							<p className='text-gray-600'>{listing.description}</p>
						</div>
					</div>
				</div>
			)}
			<div className=' container mx-auto h-50vh '>
				<ListingMap map={listing} />
			</div>
		</div>
	);
};

export default Listing;
